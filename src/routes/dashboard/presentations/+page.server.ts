import { redirect, type Actions } from '@sveltejs/kit';
import Groq from 'groq-sdk';
import { GROQ_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

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

		const groq = new Groq({ apiKey: GROQ_KEY });

		const formData = await request.formData();
		const topic = formData.get('topic');
		const description = formData.get('description')?.toString() || '';

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
                    "image_url": string | null,
                    "alt_text": string | null
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
        "explanation": string (500 words max overview of the topic)
        }

        Requirements:
        - If no topic provided, choose an educational topic and set it in the topic field
        - Use description "${description}" for styling guidance
        - Include theme-appropriate colors
        - Each slide should have at least one text and one image element
        - Position elements without overlap
        - Use hierarchical font sizes
        - Write a clear, concise overview of relevant background information a presenter would need to know in the explanation field
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

		const slidesAndExplanation = JSON.parse(
			chatCompletion.choices[0]?.message?.content?.slice(4, -4) || ''
		);

		const presentation = {
			id: crypto.randomUUID(),
			user_id: user.id,
			description,
			topic: slidesAndExplanation.topic,
			slides: slidesAndExplanation.slides,
			explanation: slidesAndExplanation.explanation
		};

		await supabase.from('presentation').insert(presentation);

		redirect(307, `/dashboard/presentations/${presentation.id}`);
	}
};
