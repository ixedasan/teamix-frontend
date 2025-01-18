import type { PropsWithChildren } from 'react'
import { cookies } from 'next/headers'
import { Separator } from '@radix-ui/react-separator'

import { AppSidebar } from '@/components/layout/Sidebar/DashboardSidebar'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger
} from '@/components/ui/Sidebar'

export default async function Layout({ children }: PropsWithChildren<unknown>) {
	const cookieStore = await cookies()
	const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
