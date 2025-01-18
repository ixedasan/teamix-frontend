'use client'

import { useEffect, useState } from 'react'
import { CheckIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import { CardContainer } from '@/components/common/CardContainer'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

function ThemeCard({
	themeName,
	icon: Icon,
	isActive,
	onClick,
	activeLabel
}: {
	themeName: string
	icon: React.ComponentType<{ className?: string }>
	isActive: boolean
	onClick: () => void
	activeLabel: string
}) {
	return (
		<Card
			onClick={onClick}
			className={cn(
				'relative cursor-pointer p-4 transition-all duration-300 hover:bg-accent',
				'flex min-w-[100px] select-none flex-col items-center gap-2',
				isActive && 'ring-2 ring-primary ring-offset-2'
			)}
		>
			{isActive && (
				<Badge variant="default" className="absolute -right-2 -top-3 px-2 py-1">
					<CheckIcon className="mr-1 h-3 w-3" />
					{activeLabel}
				</Badge>
			)}
			<Icon
				className={cn(
					'h-6 w-6',
					isActive ? 'text-primary' : 'text-muted-foreground'
				)}
			/>
			<span
				className={cn(
					'text-sm font-medium',
					isActive ? 'text-primary' : 'text-muted-foreground'
				)}
			>
				{themeName}
			</span>
		</Card>
	)
}

export function ChangeThemeForm() {
	const t = useTranslations('settings.appearance.theme')
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	return (
		<CardContainer
			heading={t('heading')}
			description={t('description')}
			rightContent={
				<div className="flex gap-2">
					<ThemeCard
						themeName="Светлая"
						icon={SunIcon}
						isActive={theme === 'light'}
						onClick={() => setTheme('light')}
						activeLabel={t('activeLabel')}
					/>
					<ThemeCard
						themeName="Темная"
						icon={MoonIcon}
						isActive={theme === 'dark'}
						onClick={() => setTheme('dark')}
						activeLabel={t('activeLabel')}
					/>
				</div>
			}
		/>
	)
}
