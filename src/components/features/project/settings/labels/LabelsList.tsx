'use client'

import { MoreHorizontal, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { ConfirmModal } from '@/components/common/ConfirmModal'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import { Skeleton } from '@/components/ui/Skeleton'
import {
	useFindProjectByIdQuery,
	useRemoveLabelMutation
} from '@/graphql/generated/output'

export function LabelsList() {
	const t = useTranslations('projects.settings.labels.remove')

	const { data, loading, refetch } = useFindProjectByIdQuery()
	const labels = data?.findProjectById?.labels

	const [remove] = useRemoveLabelMutation({
		onCompleted: () => {
			toast.success(t('successMessage'))
			refetch()
		},
		onError: error => {
			toast.error(t('errorMessage'), { description: error.message })
		}
	})

	if (loading) {
		return (
			<div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{[...Array(6)].map((_, i) => (
					<Skeleton key={i} className="h-[100px]" />
				))}
			</div>
		)
	}

	return (
		<div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{labels?.map(label => (
				<Card key={label.id} className="overflow-hidden">
					<CardContent className="p-0">
						<div className="flex h-full flex-col justify-between">
							<div className="h-2" style={{ backgroundColor: label.color }} />
							<div className="flex items-center justify-between p-4">
								<Badge
									variant="outline"
									style={{ borderColor: label.color, color: label.color }}
								>
									{label.name}
								</Badge>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" className="h-8 w-8 p-0">
											<MoreHorizontal />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuLabel>{t('select')}</DropdownMenuLabel>
										<DropdownMenuItem onSelect={e => e.preventDefault()}>
											<ConfirmModal
												heading={t('heading')}
												message={t('message')}
												onConfirm={() =>
													remove({ variables: { id: label.id } })
												}
											>
												<span className="flex items-center gap-2">
													<Trash2 className="h-4 w-4" />
													{t('removeItem')}
												</span>
											</ConfirmModal>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
