import { z } from 'zod'

const MAX_FILE_SIZE = 10 * 1024 * 1024

export const UploadImageSchema = z.object({
	file: z
		.union([
			z.instanceof(File).refine(file => file.size <= MAX_FILE_SIZE),
			z.string().transform(value => (value === '' ? undefined : value))
		])
		.optional()
})

export type TypeUploadImageSchema = z.infer<typeof UploadImageSchema>
