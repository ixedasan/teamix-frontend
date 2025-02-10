import type { PropsWithChildren } from 'react'

import { DashboardHeader } from '@/components/layout/header/DashboardHeader'
import SidebarWrapper from '@/components/layout/Sidebar/SidebarWrapper'

export default async function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<SidebarWrapper header={<DashboardHeader />}>{children}</SidebarWrapper>
	)
}
