'use client'

import type { CSSProperties } from 'react'
import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { CardContainer } from '@/components/common/CardContainer'
import { useConfig } from '@/hooks/use-config'
import { BASE_COLORS } from '@/constants/colors.constants'

export function ChangeColorForm() {
	const t = useTranslations('settings.appearance.color')

	const config = useConfig()

	return (
		<CardContainer
			heading={t('heading')}
			description={t('description')}
			rightContent={
				<div className="grid grid-cols-4 gap-2 md:grid-cols-6">
					{BASE_COLORS.map((theme, index) => {
						const isActive = config.theme == theme.name

						return (
							<button
								key={index}
								onClick={() => config.setTheme(theme.name)}
								style={
									{
										'--theme-primary': `hsl(${theme.color})`
									} as CSSProperties
								}
							>
								<span className="flex size-9 shrink-0 -translate-x-1 items-center justify-center rounded-lg bg-[--theme-primary] hover:border-2 hover:border-foreground">
									{isActive && <Check className="size-5 text-white" />}
								</span>
							</button>
						)
					})}
				</div>
			}
		/>
	)
}
