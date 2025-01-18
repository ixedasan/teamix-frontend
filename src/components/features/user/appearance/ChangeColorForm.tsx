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
				<div className="grid grid-cols-4 gap-3 md:grid-cols-4">
					{BASE_COLORS.map((theme, index) => {
						const isActive = config.theme === theme.name

						return (
							<button
								key={index}
								onClick={() => config.setTheme(theme.name)}
								className="group relative"
								style={
									{
										'--theme-primary': `hsl(${theme.color})`
									} as CSSProperties
								}
							>
								<div
									className={`size-10 rounded-lg bg-[--theme-primary] ring-1 ring-border transition-all duration-200 ${isActive ? 'ring-2 ring-[--theme-primary] ring-offset-2' : ''} group-hover:ring-[--theme-primary]/50 group-hover:scale-105 group-hover:shadow-lg group-active:scale-95`}
								>
									{isActive && (
										<div className="absolute inset-0 flex items-center justify-center">
											<Check className="size-5 text-white" />
										</div>
									)}
								</div>
							</button>
						)
					})}
				</div>
			}
		/>
	)
}
