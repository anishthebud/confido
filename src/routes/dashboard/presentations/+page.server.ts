import { redirect, type Actions } from '@sveltejs/kit';
import { FAL_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { groq } from '$lib/server/groq';
import { fal } from '@fal-ai/client';
import { z } from 'zod';

fal.config({
	credentials: FAL_KEY
});

export const load: PageServerLoad = async ({ locals: { supabase, user } }) => {
	if (user == null) {
		error(401, 'Unauthorized');
	}

	const { data: presentationData, error: dbError } = await supabase
		.from('presentation')
		.select('*, recording(*)')
		.eq('user_id', user.id)
		.order('created_at', { ascending: false })
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
		const providedTopic = formData.get('topic')?.toString() || '';
		const providedDescription = formData.get('description')?.toString() || '';

		const schema = z.object({
			slides: z.array(
				z.object({
					title: z.string(),
					bullets: z.array(z.string()).min(1).max(3),
					bgcolor: z.string(),
					textcolor: z.string(),
					image_description: z.string()
				})
			),
			talkingPoints: z.string(),
			topic: z.string()
		});

		const prompt = `You are a presentation slide generator. Generate slide content for ${providedTopic || 'a completely random topic'} and 2000 character long talking points.

Each slide will have 1-3 bullet points, and an AI Generated Image. There should be 4 slides in each slideshow.

Return data according to this zod schema.

const schema = z.object({
  slides: z.array(
    z.object({
      title: z.string(),
      bullets: z.array(z.string()).min(1).max(3),
      bgcolor: z.string(), // hex
      textcolor: z.string(), // hex
      image_description: z.string() // make this very descriptive as it will be fed directly to stable diffusion.
    })
  ),
  talkingPoints: z.string(),
  topic: z.string(),
});

Requirements:
- If no topic provided, choose an educational topic and set it in the topic field, otherwhise, use the topic that was provided.
- Use description "${providedDescription}" for styling guidance
- Include theme-appropriate colors and keep the amount of total colors low. Also make sure the text color is readable on the background.
- Write a clear overview of relevant background information about the topic in the explanation field. Include talking points and facts that go beyond what is included in the slides.
- The explanation field should be at least 2000 characters long.
- Ensure topic field matches the actual topic being presented
- Make the background color the same for all slides unless the user specifies otherwise

Return only the JSON object with no additional text.
`;

		const chatCompletion = await groq.chat.completions.create({
			messages: [
				{
					role: 'system',
					content: prompt
				}
			],
			model: 'llama-3.3-70b-specdec'
		});

		const response = chatCompletion.choices[0].message
			.content!.replaceAll('```json', '')
			.replaceAll('```', '')
			.trim();

		const result = schema.safeParse(response);

		if (!result.success) {
			console.error('LLM response validation failed:', result.error);
			error(500, 'Invalid presentation format received from LLM');
		}

		const { slides, talkingPoints, topic } = result.data;

		const slidesWithImages = await Promise.all(
			slides.map(async (slide) => {
				const image = await fal.run('fal-ai/fast-lightning-sdxl', {
					input: {
						prompt: slide.image_description || 'an image of your choosing'
					}
				});

				return { ...slide, image_url: image.data.images[0].url };
			})
		);

		const oldslides = slidesWithImages.map((slide, slideIndex) => ({
			order: slideIndex + 1,
			background: {
				color: slide.bgcolor
			},
			content: {
				title: {
					text: slide.title,
					font_size: 42,
					color: slide.textcolor,
					position: {
						x: 6,
						y: 4
					}
				},
				elements: [
					{
						order: 1,
						type: 'image',
						content: {
							title: null,
							alt_text: slide.image_description,
							image_url: slide.image_url
						},
						style: {
							font_size: null,
							color: null,
							width: 40,
							height: 40
						},
						position: {
							x: 30,
							y: 23
						}
					},
					...slide.bullets.map((bullet, index) => ({
						order: index + 2, // Start from 2 since image is 1
						type: 'text' as const,
						content: {
							title: bullet,
							alt_text: null,
							image_url: null
						},
						style: {
							font_size: 16,
							color: slide.textcolor,
							width: 100,
							height: 5
						},
						position: {
							x: 6,
							y: 65 + index * 12
						}
					}))
				]
			}
		}));

		const id = crypto.randomUUID();
		await supabase.from('presentation').insert({
			id,
			user_id: user.id,
			description: providedDescription,
			topic,
			slides: oldslides,
			slides_simplified: slides,
			explanation: talkingPoints
		});

		redirect(303, `/dashboard/presentations/${id}`);
	}
};
