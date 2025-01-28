'use client'

import { LayoutGrid, List } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import { useProjectList } from '@/hooks/use-project-list'

export function ProjectViewToggler() {
	const t = useTranslations('projects.toggler')

	const { viewType, setViewType } = useProjectList()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm">
					{viewType === 'grid' ? (
						<LayoutGrid className="mr-2 h-4 w-4" />
					) : (
						<List className="mr-2 h-4 w-4" />
					)}
					{viewType === 'grid' ? t('gridView') : t('listView')}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setViewType('grid')}>
					<LayoutGrid className="mr-2 h-4 w-4" /> {t('gridView')}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setViewType('list')}>
					<List className="mr-2 h-4 w-4" /> {t('listView')}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
