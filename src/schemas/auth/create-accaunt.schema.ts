import { z } from 'zod'

export const CreateAccountSchema = z.object({
	username: z
		.string()
		.min(1)
		.regex(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/),
	email: z.string().email(),
	password: z.string().min(8)
})

export type TypeCreateAccountSchema = z.infer<typeof CreateAccountSchema>
