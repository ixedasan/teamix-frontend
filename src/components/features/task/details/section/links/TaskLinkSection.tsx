import { useCallback, useState } from 'react'
import { CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { ChevronRight, Plus } from 'lucide-react'
import { toast } from 'sonner'

import { SkeletonWrapper } from '@/components/common/SkeletonWrapper'
import { Collapsible, CollapsibleContent } from '@/components/ui/Collapsible'
import { Separator } from '@/components/ui/Separator'
import { useTaskLinks } from '@/hooks/use-task-links'
import { TaskLinkForm } from './TaskLinkForm'
import { LinkItem } from './TaskLinkItem'
import { cn } from '@/lib/utils'

interface ITaskLinkSection {
	taskId: string
}

export function TaskLinkSection({ taskId }: ITaskLinkSection) {
	const [open, setOpen] = useState(false)

	const { links, isLoading, createLink, updateLink, deleteLink } =
		useTaskLinks(taskId)

	const handleCopy = useCallback((url: string) => {
		try {
			navigator.clipboard.writeText(url)
			toast.success('Link copied to clipboard')
		} catch {
			toast.error('Failed to copy link')
		}
	}, [])

	if (!links?.length) return null

	return (
		<SkeletonWrapper isLoading={isLoading}>
			<Collapsible
				defaultOpen={true}
				open={open}
				onOpenChange={setOpen}
				className="w-full space-y-2 pt-2"
			>
				<div className="flex items-center justify-between">
					<CollapsibleTrigger className="flex w-full items-center gap-2 text-sm font-medium">
						<ChevronRight
							className={cn(
								'size-4 transform transition-transform',
								open ? 'rotate-90' : 'rotate-0'
							)}
						/>
						<span>Links</span>
						<span className="rounded bg-muted px-1.5 py-0.5 text-xs">
							{links.length}
						</span>
					</CollapsibleTrigger>
					{open && (
						<TaskLinkForm
							title="Add link"
							submitLabel="Add"
							onSubmit={createLink}
							trigger={<Plus className="mr-2 size-4 cursor-pointer" />}
						/>
					)}
				</div>
				<Separator />
				<CollapsibleContent>
					{links.map(link => (
						<LinkItem
							key={link.id}
							link={link}
							onCopy={handleCopy}
							onUpdate={data => updateLink(link.id, data)}
							onDelete={deleteLink}
						/>
					))}
				</CollapsibleContent>
			</Collapsible>
		</SkeletonWrapper>
	)
}
