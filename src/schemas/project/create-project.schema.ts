import { z } from 'zod'

export const CreateProjectSchema = z.object({
	name: z.string().min(3).max(60),
	icon: z.string(),
	description: z.string().max(300)
})

export type TypeCreateProjectSchema = z.infer<typeof CreateProjectSchema>
