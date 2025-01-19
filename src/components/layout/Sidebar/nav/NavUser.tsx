'use client'

import { useRouter } from 'next/navigation'
import { ChevronsUpDown, LogOut, Settings } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { SkeletonWrapper } from '@/components/common/SkeletonWrapper'
import { UserAvatar } from '@/components/common/UserAvatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar
} from '@/components/ui/Sidebar'
import {
	FindProfileQuery,
	useLogoutUserMutation
} from '@/graphql/generated/output'
import { useCurrentUser } from '@/hooks/use-current-user'

type Profile = FindProfileQuery['findProfile']

interface UserDropdownTriggerProps {
	profile: Profile | null | undefined
	loading: boolean
}

const UserDropdownTrigger = ({
	profile,
	loading
}: UserDropdownTriggerProps) => (
	<SkeletonWrapper isLoading={loading} fullWidth>
		<DropdownMenuTrigger asChild>
			<SidebarMenuButton
				size="lg"
				className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
			>
				{profile && (
					<UserAvatar
						user={{
							username: profile.username,
							avatar: profile.avatar
						}}
					/>
				)}
				<div className="grid flex-1 text-left text-sm leading-tight">
					<span className="truncate font-semibold">{profile?.displayName}</span>
				</div>
				<ChevronsUpDown className="ml-auto size-4" />
			</SidebarMenuButton>
		</DropdownMenuTrigger>
	</SkeletonWrapper>
)

export function NavUser() {
	const t = useTranslations('sidebar.user')
	const router = useRouter()
	const { isMobile } = useSidebar()
	const { profile, loading } = useCurrentUser()

	const [logout] = useLogoutUserMutation({
		onCompleted() {
			router.push('/')
		},
		onError(error) {
			toast.error(error.message)
		}
	})

	const handleSettingsClick = () => {
		router.push('/settings')
	}

	const handleLogoutClick = () => {
		logout()
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<UserDropdownTrigger profile={profile} loading={loading} />
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? 'bottom' : 'right'}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								{profile && (
									<UserAvatar
										user={{
											username: profile.username,
											avatar: profile.avatar
										}}
									/>
								)}
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										{profile?.displayName}
									</span>
									<span className="truncate text-xs">{profile?.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleSettingsClick}>
							<Settings className="mr-2 size-4" />
							{t('settings')}
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleLogoutClick}>
							<LogOut className="mr-2 size-4" />
							{t('logout')}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
