'use client'

import { Separator } from '@radix-ui/react-separator'
import { type ComponentProps } from 'react'
import { Logo } from '@/components/common/Logo'
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

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<Logo iconSize={12} showText={state === 'expanded'} className="mt-2" />
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
