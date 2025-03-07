'use client'

import { type ComponentProps } from 'react'
import { Separator } from '@radix-ui/react-separator'

import { Logo } from '@/components/common/Logo'
import { Notifications } from '@/components/features/notifications/Notifications'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
	useSidebar
} from '@/components/ui/Sidebar'
import { NavMain } from './nav/NavMain'
import { NavProjects } from './nav/NavProjects'
import { NavUser } from './nav/NavUser'

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	const { state } = useSidebar()
	const isCollapsed = state === 'collapsed'

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<div className="flex items-center justify-between">
					<Logo
						iconSize={12}
						showText={state === 'expanded'}
						className="mt-2"
					/>
					{!isCollapsed && <Notifications />}
				</div>
				{isCollapsed && (
					<div className="mt-2 flex justify-center">
						<Notifications />
					</div>
				)}
				<Separator />
				<NavMain />
			</SidebarHeader>
			<SidebarContent>
				<NavProjects />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
