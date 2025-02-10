import { formatDistance } from 'date-fns'
import { Copy, Edit, Link2, MoreHorizontal, Trash } from 'lucide-react'

import { ConfirmModal } from '@/components/common/ConfirmModal'
import { Button } from '@/components/ui/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import { FindTaskLinksQuery } from '@/graphql/generated/output'
import { TaskLinkForm } from './TaskLinkForm'

interface ILinkItem {
	link: FindTaskLinksQuery['findTaskLinks'][0]
	onCopy: (url: string) => void
	onUpdate: (data: { title: string; url: string }) => void
	onDelete: (id: string) => void
}

export function LinkItem({ link, onCopy, onUpdate, onDelete }: ILinkItem) {
	return (
		<a href={link.url} target="_blank" rel="noopener noreferrer">
			<div className="mt-2 flex items-center justify-between rounded-md bg-muted/50 px-4 py-2 hover:bg-muted/80">
				<div className="flex items-center gap-2">
					<Link2 className="size-4 text-muted-foreground" />
					{link.title}
					<span className="text-xs text-muted-foreground">
						{formatDistance(new Date(link.createdAt), new Date(), {
							addSuffix: true
						})}
					</span>
				</div>
				<div className="flex items-center gap-1">
					<Button
						variant="ghost"
						size="icon"
						className="size-8"
						onClick={e => {
							e.preventDefault()
							onCopy(link.url)
						}}
						title="Copy link"
					>
						<Copy className="size-4" />
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
							<Button variant="ghost" size="icon" className="size-8">
								<MoreHorizontal className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="gap-1">
							<TaskLinkForm
								initialData={{ title: link.title ?? '', url: link.url }}
								title="Edit link"
								submitLabel="Save"
								onSubmit={data => onUpdate(data)}
								trigger={
									<Button variant="ghost" size="sm" className="w-full">
										Edit
										<Edit className="ml-1 size-4" />
									</Button>
								}
							/>
							<ConfirmModal
								heading="Delete link"
								message="Are you sure you want to delete this link?"
								onConfirm={() => onDelete(link.id)}
							>
								<Button
									variant="ghost"
									size="sm"
									className="w-full text-destructive"
								>
									Delete
									<Trash className="ml-1 size-4" />
								</Button>
							</ConfirmModal>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</a>
	)
}
