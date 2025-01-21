import { z } from 'zod'

export const ChangeProjectInfoSchema = z.object({
	name: z.string().min(1).max(60),
	icon: z.string(),
	description: z.string().max(300)
})

export type TypeChangeProjectInfoSchema = z.infer<
	typeof ChangeProjectInfoSchema
>
