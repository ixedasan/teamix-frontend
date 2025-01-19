import { z } from 'zod'

import { languages } from '@/lib/i18n/config'

export const ChangeLanguageSchema = z.object({
	language: z.enum(languages)
})

export type TypeChangeLanguageSchema = z.infer<typeof ChangeLanguageSchema>
