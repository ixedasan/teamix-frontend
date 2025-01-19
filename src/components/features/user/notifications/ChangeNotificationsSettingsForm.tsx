'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ToggleCard, ToggleCardSkeleton } from '@/components/common/ToggleCard'
import { Form, FormField } from '@/components/ui/Form'
import { useChangeNotificationsSettingsMutation } from '@/graphql/generated/output'
import { useCurrentUser } from '@/hooks/use-current-user'
import {
	ChangeNotificationsSettingsSchema,
	TypeChangeNotificationsSchema
} from '@/schemas/user/change-notifications-settings'
import { TELEGRAM_BOT_URL } from '@/constants/url.constants'

export function ChangeNotificationsSettingsForm() {
	const t = useTranslations('settings.notifications')

	const { profile: user, loading, refetch } = useCurrentUser()

	const form = useForm<TypeChangeNotificationsSchema>({
		resolver: zodResolver(ChangeNotificationsSettingsSchema),
		values: {
			siteNotification: user?.notificationSettings.siteNotification ?? false,
			telegramNotification:
				user?.notificationSettings.telegramNotification ?? false
		}
	})

	const [update, { loading: isLoadingUpdate }] =
		useChangeNotificationsSettingsMutation({
			onCompleted(data) {
				refetch()
				toast.success(t('successMessage'))

				if (data.changeNotificationsSettings.telegramAuthToken) {
					window.open(
						`${TELEGRAM_BOT_URL}?start=${data.changeNotificationsSettings.telegramAuthToken}`,
						'_blank'
					)
				}
			},
			onError() {
				toast.error(t('errorMessage'))
			}
		})

	const onChange = (
		field: keyof TypeChangeNotificationsSchema,
		value: boolean
	) => {
		form.setValue(field, value)

		update({
			variables: {
				data: { ...form.getValues(), [field]: value }
			}
		})
	}

	if (loading) {
		return Array.from({ length: 2 }).map((_, index) => (
			<ToggleCardSkeleton key={index} />
		))
	}

	return (
		<Form {...form}>
			<FormField
				control={form.control}
				name="siteNotification"
				render={({ field }) => (
					<ToggleCard
						heading={t('siteNotifications.heading')}
						description={t('siteNotifications.description')}
						isDisabled={isLoadingUpdate}
						value={field.value}
						onChange={value => onChange('siteNotification', value)}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name="telegramNotification"
				render={({ field }) => (
					<ToggleCard
						heading={t('telegramNotifications.heading')}
						description={t('telegramNotifications.description')}
						isDisabled={isLoadingUpdate}
						value={field.value}
						onChange={value => onChange('telegramNotification', value)}
					/>
				)}
			/>
		</Form>
	)
}
