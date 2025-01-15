import { FolderKanban, Home, Inbox } from 'lucide-react'
import { usePathname } from 'next/navigation'
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/Sidebar'

export function NavMain() {
	const pahthName = usePathname()

	const items = [
		{
			title: 'Home',
			url: '/dashboard',
			icon: Home
		},
		{
			title: 'Notifications',
			url: '/notifications',
			icon: Inbox
		},
		{
			title: 'Projects',
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
