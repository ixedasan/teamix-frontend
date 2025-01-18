import { TabsContent } from '@radix-ui/react-tabs'
import { useTranslations } from 'next-intl'

import { Heading } from '@/components/common/Heading'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { ChangeEmailForm } from './account/ChangeEmailForm'
import { ChangePasswordForm } from './account/ChangePasswordForm'
import { WrapperTotp } from './account/totp/WrapperTotp'
import { ChangeColorForm } from './appearance/ChangeColorForm'
import { ChangeLanguageForm } from './appearance/ChangeLanguageForm'
import { ChangeThemeForm } from './appearance/ChangeThemeForm'
import { ChangeNotificationsSettingsForm } from './notifications/ChangeNotificationsSettingsForm'
import { ChangeAvatarForm } from './profile/ChangeAvatarForm'
import { ChangeInfoForm } from './profile/ChangeInfoForm'
import { SocilLinksForm } from './profile/socils-links/SocilLinksForm'

const TAB_ITEMS = [
	'profile',
	'account',
	'appearance',
	'notifications',
	'sessions'
] as const

export function UserSettings() {
	const t = useTranslations('settings')

	return (
		<div className="mx-auto w-full max-w-5xl">
			<Heading
				title={t('header.heading')}
				description={t('header.description')}
				size="lg"
			/>
			<Tabs defaultValue="profile">
				<div className="relative mb-4 mt-2 rounded-md bg-muted">
					<TabsList className="scrollbar-hide flex min-w-full gap-1">
						{TAB_ITEMS.map(tab => (
							<TabsTrigger
								key={tab}
								value={tab}
								className="flex-1 whitespace-nowrap px-4 py-2"
							>
								{t(`header.${tab}`)}
							</TabsTrigger>
						))}
					</TabsList>
				</div>
				<TabsContent value="profile" className="space-y-6">
					<Heading
						title={t('profile.header.heading')}
						description={t('profile.header.description')}
					/>
					<ChangeAvatarForm />
					<ChangeInfoForm />
					<SocilLinksForm />
				</TabsContent>
				<TabsContent value="account" className="space-y-6">
					<Heading
						title={t('account.header.heading')}
						description={t('account.header.description')}
					/>
					<ChangeEmailForm />
					<ChangePasswordForm />
					<Heading
						title={t('account.header.securityHeading')}
						description={t('account.header.securityDescription')}
					/>
					<WrapperTotp />
				</TabsContent>
				<TabsContent value="appearance" className="space-y-6">
					<Heading
						title={t('appearance.header.heading')}
						description={t('appearance.header.description')}
					/>
					<ChangeThemeForm />
					<ChangeLanguageForm />
					<ChangeColorForm />
				</TabsContent>
				<TabsContent value="notifications" className="space-y-6">
					<Heading
						title={t('notifications.header.heading')}
						description={t('notifications.header.description')}
					/>
					<ChangeNotificationsSettingsForm />
				</TabsContent>
				<TabsContent value="sessions">sessions</TabsContent>
			</Tabs>
		</div>
	)
}
