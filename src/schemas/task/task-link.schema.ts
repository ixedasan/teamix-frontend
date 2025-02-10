import { z } from 'zod'

export const TaskLinkSchema = z.object({
	url: z.string().url(),
	title: z.string()
})

export type TypeTaskLinkSchema = z.infer<typeof TaskLinkSchema>
