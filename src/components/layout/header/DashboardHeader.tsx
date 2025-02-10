import { SidebarTrigger } from '@/components/ui/Sidebar'

export function DashboardHeader() {
	return (
		<header className="flex h-16 shrink-0 items-center gap-2">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
			</div>
		</header>
	)
}
