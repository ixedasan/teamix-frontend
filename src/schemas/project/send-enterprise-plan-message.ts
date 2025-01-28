import { z } from 'zod'

export const SendEnterprisePlanMessageSchema = z.object({
	name: z.string().min(3).max(60),
	email: z.string().email(),
	company: z.string().min(1),
	message: z.string().min(1)
})

export type TypeSendEnterprisePlanMessageSchema = z.infer<
	typeof SendEnterprisePlanMessageSchema
>
