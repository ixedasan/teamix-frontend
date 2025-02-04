import type { PropsWithChildren } from 'react'

import { TaskSheet } from '@/components/features/task/details/TaskSheet'
import { TaskHeader } from '@/components/layout/header/TaskHeader'
import SidebarWrapper from '@/components/layout/Sidebar/SidebarWrapper'

export default async function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<SidebarWrapper header={<TaskHeader />}>
			{children}
			<TaskSheet />
		</SidebarWrapper>
	)
}
