import { z } from 'zod'

export const ChangeNotificationsSettingsSchema = z.object({
	siteNotification: z.boolean(),
	telegramNotification: z.boolean()
})

export type TypeChangeNotificationsSchema = z.infer<
	typeof ChangeNotificationsSettingsSchema
>
