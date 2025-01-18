import { z } from 'zod'

export const EnableTotpSchema = z.object({
	pin: z.string().length(6)
})

export type TypeEnableTotpSchema = z.infer<typeof EnableTotpSchema>
