import { z } from 'zod'

export const CreateDocumentSchema = z.object({
	title: z.string().min(1).max(150)
})

export type TypeCreateDocumentSchema = z.infer<typeof CreateDocumentSchema>
