import { z } from 'zod'

export const UpdateTaskHeaderSchema = z.object({
	title: z.string().min(1).max(200),
	description: z.string()
})

export type TypeUpdateTaskHeaderSchema = z.infer<typeof UpdateTaskHeaderSchema>
