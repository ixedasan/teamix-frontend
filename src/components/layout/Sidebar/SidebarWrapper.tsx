import type { PropsWithChildren, ReactNode } from 'react'
import { cookies } from 'next/headers'

import { AppSidebar } from '@/components/layout/Sidebar/DashboardSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/Sidebar'

interface ISidebarWrapper {
	header?: ReactNode
}

export default async function SidebarWrapper({
	children,
	header
}: PropsWithChildren<ISidebarWrapper>) {
	const cookieStore = await cookies()
	const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar />
			<SidebarInset>
				{header}
				<div className="flex flex-1 overflow-hidden">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
