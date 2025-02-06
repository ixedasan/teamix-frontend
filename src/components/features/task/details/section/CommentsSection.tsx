'use client'

import { useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { UserAvatar } from '@/components/common/UserAvatar'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Textarea } from '@/components/ui/Textarea'
import { useSendCommentMutation } from '@/graphql/generated/output'
import { useComments } from '@/hooks/use-comments'
import { useCurrentUser } from '@/hooks/use-current-user'
import {
	CommentSchema,
	type TypeCommentSchema
} from '@/schemas/task/comment.schema'
import { CommentItem } from './CommentItem'

export function CommentsSection({ taskId }: { taskId: string }) {
	const { profile } = useCurrentUser()
	const { comments } = useComments(taskId)

	const [sendComment, { loading }] = useSendCommentMutation()
	const [rows, setRows] = useState(1)

	const form = useForm<TypeCommentSchema>({
		resolver: zodResolver(CommentSchema),
		defaultValues: {
			content: ''
		}
	})

	const handleSubmit = async (data: TypeCommentSchema) => {
		try {
			await sendComment({
				variables: {
					data: {
						taskId,
						content: data.content
					}
				}
			})
			form.reset()
			setRows(1)
		} catch {}
	}

	const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const lines = e.target.value.split('\n').length
		setRows(Math.min(Math.max(lines, 1), 5))
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()

			const content = form.getValues('content')
			if (!content?.trim()) return

			form.handleSubmit(handleSubmit)()
		}
	}

	if (!profile) return null

	return (
		<div className="space-y-6 pr-4 pt-12">
			{comments.map(comment => (
				<CommentItem
					key={comment.id}
					comment={comment}
					userId={profile?.id}
					taskId={taskId}
					onError={message =>
						toast('Error', {
							description: message
						})
					}
				/>
			))}
			<Card className="p-4">
				<CardContent className="p-0">
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="relative flex items-center gap-4"
					>
						<UserAvatar user={profile} size="sm" />

						<div className="flex-1 space-y-4">
							<div className="relative flex items-center justify-between">
								<Textarea
									{...form.register('content', {
										onChange: handleTextareaChange
									})}
									placeholder="Write a comment..."
									className="min-h-0 resize-none overflow-hidden pr-12"
									rows={rows}
									onKeyDown={handleKeyDown}
									disabled={loading}
								/>

								<Button
									size="icon"
									variant="link"
									disabled={loading || !form.formState.isDirty}
								>
									<Send className="size-4" />
									<span className="sr-only">Отправить</span>
								</Button>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
