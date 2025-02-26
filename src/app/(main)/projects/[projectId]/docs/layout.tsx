import type { PropsWithChildren } from 'react'

import { DocsHeader } from '@/components/layout/header/DocsHeader'
import SidebarWrapper from '@/components/layout/Sidebar/SidebarWrapper'

export default async function Layout({ children }: PropsWithChildren<unknown>) {
	return <SidebarWrapper header={<DocsHeader />}>{children}</SidebarWrapper>
}
