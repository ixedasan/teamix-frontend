import { type LucideIcon } from 'lucide-react'
import { type ComponentPropsWithoutRef } from 'react'
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/Sidebar'

export function NavMain({
	items
}: {
	items: {
		title: string
		url: string
		icon: LucideIcon
		isActive?: boolean
	}[]
} & ComponentPropsWithoutRef<typeof SidebarGroup>) {
	return (
		<SidebarMenu>
			{items.map(item => (
				<SidebarMenuItem key={item.title}>
					<SidebarMenuButton asChild isActive={item.isActive}>
						<a href={item.url}>
							<item.icon />
							<span>{item.title}</span>
						</a>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	)
}
