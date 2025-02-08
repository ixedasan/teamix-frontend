import { z } from 'zod'

const MAX_FILE_SIZE = 500 * 1024 * 1024

export const UploadFileSchema = z.object({
	file: z.union([
		z
			.instanceof(File)
			.refine(
				file => file.size <= MAX_FILE_SIZE,
				`File size should be less than ${MAX_FILE_SIZE} bytes`
			),
		z.null()
	])
})

export type TypeUploadFileSchema = z.infer<typeof UploadFileSchema>
