import { z } from 'zod'

export const LoginSchema = z.object({
	login: z.string().min(1),
	password: z.string().min(8),
	pin: z.string().optional()
})

export type TypeLoginSchema = z.infer<typeof LoginSchema>
