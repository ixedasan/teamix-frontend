import { z } from 'zod'

export const CreateLabelSchema = z.object({
	name: z.string().min(3).max(60),
	color: z.string()
})

export type TypeCreateLabelSchema = z.infer<typeof CreateLabelSchema>
