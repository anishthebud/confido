import { redirect, type Actions } from '@sveltejs/kit';
import { FAL_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { groq } from '$lib/server/groq';
import { presentationSchema } from './schema';
import { fal } from '@fal-ai/client';

fal.config({
	credentials: FAL_KEY
});

export const load: PageServerLoad = async ({ locals: { supabase, user } }) => {
	if (user == null) {
		error(401, 'Unauthorized');
	}

	const { data: presentationData, error: dbError } = await supabase
		.from('presentation')
		.select()
		.eq('user_id', user.id)
		.limit(10);

	if (dbError) {
		error(500);
	}

	return { presentations: presentationData };
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase, user } }) => {
		if (user == null) {
			error(401, 'Unauthorized');
		}

		const formData = await request.formData();
		const topic = formData.get('topic')?.toString() || '';
		const description = formData.get('description')?.toString() || '';

		console.log(formData.get('description'), formData);

		const prompt = `You are a presentation slide generator. Generate content for ${topic || 'a topic of your choice'}.

        Return a JSON object with exactly this structure:
        {
        "topic": string (the topic you're presenting about),
        "slides": [
            {
            "order": number,
            "background": {
                "color": string (hex color)
            },
            "content": {
                "title": {
                "text": string,
                "font_size": number,
                "color": string (hex color),
                "position": { "x": 0-100, "y": 0-100 }
                },
                "elements": [
                {
                    "order": number,
                    "type": "text" | "image",
                    "content": {
                    "title": string | null,
                    "alt_text": string | null, (will be used to generate an image using flux image generator, so make it very descriptive.)
                    },
                    "style": {
                    "font_size": number | null,
                    "color": string | null,
                    "width": number,
                    "height": number
                    },
                    "position": { "x": 0-100, "y": 0-100 }
                }
                ]
            }
            }
        ],
        "explanation": string (800 words max overview of the topic)
        }

        Requirements:
        - If no topic provided, choose an educational topic and set it in the topic field
        - Use description "${description}" for styling guidance
        - Include theme-appropriate colors, and reuse colors whenever possible
        - Each slide should have multiple text elements and one image element
        - Position elements without overlap
        - Use hierarchical font sizes
        - Write a clear overview of relevant background information about the topic in the explanation field. Include talking points and facts that go beyond what is included in the slides.
        - Ensure topic field matches the actual topic being presented

        Return only the JSON object with no additional text.`;

		const chatCompletion = await groq.chat.completions.create({
			messages: [
				{
					role: 'system',
					content: prompt
				}
			],
			model: 'llama-3.3-70b-versatile'
		});

		const response = chatCompletion.choices[0].message
		.content!.replaceAll('```json', '')
		.replaceAll('```', '')
		.trim();

		const result = presentationSchema.safeParse(response);

		if (!result.success) {
			console.error('LLM response validation failed:', result.error);
			error(500, 'Invalid presentation format received from LLM');
		}

		const slidesAndExplanation = result.data;

		const slides = await Promise.all(
			slidesAndExplanation.slides.map(async (slide) => ({
				...slide,
				content: {
					...slide.content,

					elements: await Promise.all(
						slide.content.elements.map(async (element) => {
							if (element.type === 'text') return element;
							const image = await fal.run('fal-ai/fast-lightning-sdxl', {
								input: {
									prompt: element.content.alt_text || 'an image of your choosing'
								}
							});
							element.content.image_url = image.data.images[0].url;

							return element;
						})
					)
				}
			}))
		);

		const presentation = {
			id: crypto.randomUUID(),
			user_id: user.id,
			description,
			topic: slidesAndExplanation.topic,
			slides,
			explanation: slidesAndExplanation.explanation
		};

		await supabase.from('presentation').insert(presentation);

		redirect(303, `/dashboard/presentations/${presentation.id}`);
	}
};
