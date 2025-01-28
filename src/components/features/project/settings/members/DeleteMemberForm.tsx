'use client'

import { MoreHorizontal, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { ConfirmModal } from '@/components/common/ConfirmModal'
import { Button } from '@/components/ui/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import {
	useFindProjectByIdQuery,
	useRemoveProjectMemberMutation
} from '@/graphql/generated/output'

interface IDeleteMemberForm {
	userId: string
}

export function DeleteMemberForm({ userId }: IDeleteMemberForm) {
	const t = useTranslations('projects.settings.member.delete')

	const { refetch } = useFindProjectByIdQuery()

	const [remove] = useRemoveProjectMemberMutation({
		onCompleted: () => {
			toast.success(t('successMessage'))
			refetch()
		},
		onError: error => {
			toast.error(t('errorMessage'), { description: error.message })
		}
	})

	return (
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
						onConfirm={() => remove({ variables: { userId } })}
					>
						<span className="flex items-center gap-2">
							{t('removeButton')} <Trash2 className="h-4 w-4" />
						</span>
					</ConfirmModal>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
