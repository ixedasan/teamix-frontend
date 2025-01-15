'use client'

import {
	ChartColumn,
	FileText,
	FolderKanban,
	Frame,
	Home,
	Inbox,
	KanbanSquare
} from 'lucide-react'
import { type ComponentProps } from 'react'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail
} from '@/components/ui/Sidebar'
import { NavMain } from './nav/NavMain'
import { NavProjects } from './nav/NavProjects'
import { NavUser } from './nav/NavUser'

// This is sample data.
const data = {
	user: {
		name: 'testacc',
		email: 'jodh.doe@example.com',
		avatar: '/avatars/shadcn.jpg'
	},
	navMain: [
		{
			title: 'Home',
			url: '#',
			icon: Home
		},
		{
			title: 'Notifications',
			url: '#',
			icon: Inbox
		},
		{
			title: 'Projects',
			url: '#',
			icon: FolderKanban
		}
	],
	projects: [
		{
			title: 'Design Engineering',
			url: '#',
			icon: Frame,
			items: [
				{
					title: 'Issues',
					url: '#',
					icon: KanbanSquare
				},
				{
					title: 'Statistics',
					url: '#',
					icon: ChartColumn
				},
				{
					title: 'Docs',
					url: '#',
					icon: FileText
				}
			]
		}
	]
}

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<NavUser user={data.user} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter></SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
