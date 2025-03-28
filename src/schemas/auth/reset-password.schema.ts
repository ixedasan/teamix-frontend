import { z } from 'zod'

export const ResetPasswordSchema = z.object({
	email: z.string().email()
})

export type TypeResetPasswordSchema = z.infer<typeof ResetPasswordSchema>
