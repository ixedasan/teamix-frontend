import { usePathname } from 'next/navigation'
import { FolderKanban, Home } from 'lucide-react'
import { useTranslations } from 'next-intl'

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/Sidebar'

export function NavMain() {
	const t = useTranslations('sidebar.main')

	const pahthName = usePathname()

	const items = [
		{
			title: t('dashboard'),
			url: '/dashboard',
			icon: Home
		},
		{
			title: t('projects'),
			url: '/projects',
			icon: FolderKanban
		}
	]

	return (
		<SidebarMenu>
			{items.map(item => {
				const isActive = pahthName === item.url

				return (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton asChild isActive={isActive}>
							<a href={item.url}>
								<item.icon />
								<span>{item.title}</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				)
			})}
		</SidebarMenu>
	)
}
