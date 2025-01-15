'use client'

import {
	BarChart2,
	ChevronRight,
	ClipboardList,
	FileText,
	Sheet
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from '@/components/ui/Collapsible'
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem
} from '@/components/ui/Sidebar'
import { useFindUserProjectsQuery } from '@/graphql/generated/output'
import { cn } from '@/lib/utils'

export function NavProjects() {
	const pathName = usePathname()

	const { data } = useFindUserProjectsQuery()
	const projects = data?.getAllUserProjects || []

	const subMenuItems = [
		{ title: 'Tasks', icon: ClipboardList, path: 'tasks' },
		{ title: 'Analytics', icon: BarChart2, path: 'analytics' },
		{ title: 'Docs', icon: FileText, path: 'docs' }
	]

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Projects</SidebarGroupLabel>
			<SidebarMenu key={projects.length}>
				{projects.map(item => {
					const isActive = pathName?.includes(`/projects/${item.id}`)

					return (
						<Collapsible
							key={item.name}
							asChild
							defaultOpen={isActive}
							className="group/collapsible"
						>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton tooltip={item.name}>
										<Sheet />
										<span>{item.name}</span>
										<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
									</SidebarMenuButton>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<SidebarMenuSub>
										{subMenuItems.map(subItem => {
											const subItemPath = `/projects/${item.id}/${subItem.path}`
											const isSubItemActive = pathName === subItemPath

											return (
												<SidebarMenuSubItem key={subItem.title}>
													<SidebarMenuSubButton asChild>
														<Link href={subItemPath}>
															<subItem.icon
																className={cn(
																	'h-5 w-5',
																	isSubItemActive && 'stroke-primary'
																)}
															/>
															<span>{subItem.title}</span>
														</Link>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											)
										})}
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					)
				})}
			</SidebarMenu>
		</SidebarGroup>
	)
}
