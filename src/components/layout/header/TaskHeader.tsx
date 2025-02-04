'use client'

import { TaskViewToggle } from '@/components/common/TaskViewToggle'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { SidebarTrigger } from '@/components/ui/Sidebar'
import { useFindProjectByIdQuery } from '@/graphql/generated/output'

export function TaskHeader() {
	const { data } = useFindProjectByIdQuery()
	const project = data?.findProjectById

	return (
		<header className="flex h-16 items-center justify-between">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 h-4" />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbPage className="flex items-center gap-2">
								<span>{project?.icon}</span>
								<span>{project?.name || 'Project Name'}</span>
							</BreadcrumbPage>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Tasks</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div className="flex items-center gap-2 px-4">
				<TaskViewToggle />
				<Button className="h-8 rounded-md px-4 text-xs">Add Task</Button>
			</div>
		</header>
	)
}
