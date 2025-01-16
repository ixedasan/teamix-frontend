import { TabsContent } from '@radix-ui/react-tabs'
import { useTranslations } from 'next-intl'
import { Heading } from '@/components/common/Heading'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'

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
		<>
			<Heading
				title={t('header.heading')}
				description={t('header.description')}
				size="lg"
			/>
			<Tabs defaultValue="profile">
				<div className="relative my-3 rounded-lg bg-muted">
					<TabsList className="scrollbar-hide m flex min-w-full gap-1">
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
				<TabsContent value="profile">profile</TabsContent>
				<TabsContent value="account">account</TabsContent>
				<TabsContent value="appearance">appearance</TabsContent>
				<TabsContent value="notifications">notifications</TabsContent>
				<TabsContent value="sessions">sessions</TabsContent>
			</Tabs>
		</>
	)
}
