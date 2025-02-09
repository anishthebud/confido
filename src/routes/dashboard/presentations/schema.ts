import { z } from 'zod';

const positionSchema = z.object({
	x: z.number().min(0).max(100),
	y: z.number().min(0).max(100)
});

const elementSchema = z.object({
	order: z.number(),
	type: z.enum(['text', 'image']),
	content: z.object({
		title: z.string().nullable(),
		alt_text: z.string().nullable(),
		image_url: z.string().url().optional().nullable()
	}),
	style: z.object({
		font_size: z.number().nullable(),
		color: z.string().nullable(),
		width: z.number(),
		height: z.number()
	}),
	position: positionSchema
});

const slideSchema = z.object({
	order: z.number(),
	background: z.object({
		color: z.string()
	}),
	content: z.object({
		title: z.object({
			text: z.string(),
			font_size: z.number(),
			color: z.string(),
			position: positionSchema
		}),
		elements: z.array(elementSchema)
	})
});

export const presentationSchema = z.object({
	topic: z.string(),
	slides: z.array(slideSchema),
	explanation: z.string()
});

export type PresentationSchema = z.infer<typeof presentationSchema>;
