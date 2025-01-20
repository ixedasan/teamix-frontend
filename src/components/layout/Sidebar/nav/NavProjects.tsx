'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
	BarChart2,
	ChevronRight,
	ClipboardList,
	FileText,
	Hash
} from 'lucide-react'
import { useTranslations } from 'next-intl'

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
	SidebarMenuSkeleton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem
} from '@/components/ui/Sidebar'
import { useFindUserProjectsQuery } from '@/graphql/generated/output'
import { cn } from '@/lib/utils'

export function NavProjects() {
	const t = useTranslations('sidebar.projects')
	const pathName = usePathname()

	const { data, loading } = useFindUserProjectsQuery()
	const projects = data?.getAllUserProjects || []

	const subMenuItems = [
		{ title: t('task'), icon: ClipboardList, path: 'tasks' },
		{ title: t('analytics'), icon: BarChart2, path: 'analytics' },
		{ title: t('docs'), icon: FileText, path: 'docs' }
	]

	return (
		<SidebarGroup>
			<SidebarGroupLabel>{t('heading')}</SidebarGroupLabel>
			{loading && (
				<SidebarMenu>
					{Array.from({ length: 3 }).map((_, index) => (
						<SidebarMenuItem key={index}>
							<SidebarMenuSkeleton showIcon />
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			)}
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
										{item.icon ? <span>{item.icon}</span> : <Hash />}
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
