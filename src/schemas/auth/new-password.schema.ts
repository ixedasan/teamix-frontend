import { z } from 'zod'

export const NewPasswordSchema = z
	.object({
		password: z.string().min(8),
		passwordConfirmation: z.string().min(8)
	})
	.refine(data => data.password === data.passwordConfirmation, {
		path: ['passwordConfirmation']
	})

export type TypeNewPasswordSchema = z.infer<typeof NewPasswordSchema>
