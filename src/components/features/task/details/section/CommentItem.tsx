'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatDistanceToNow } from 'date-fns'
import { Check, Edit, MoreVertical, X } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { ConfirmModal } from '@/components/common/ConfirmModal'
import { UserAvatar } from '@/components/common/UserAvatar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import { Textarea } from '@/components/ui/Textarea'
import {
	useDeleteCommentMutation,
	useUpdateCommentMutation,
	type CommentFragment
} from '@/graphql/generated/output'
import { CommentSchema, TypeCommentSchema } from '@/schemas/task/comment.schema'

interface ICommentItem {
	comment: CommentFragment
	userId?: string
	taskId: string
	onError: (message: string) => void
}

export function CommentItem({
	comment,
	userId,
	taskId,
	onError
}: ICommentItem) {
	const [isEditing, setIsEditing] = useState(false)
	const [updateComment, { loading: isUpdating }] = useUpdateCommentMutation()
	const [deleteComment, { loading: isDeleting }] = useDeleteCommentMutation()

	const form = useForm<TypeCommentSchema>({
		resolver: zodResolver(CommentSchema),
		defaultValues: {
			content: comment.content
		}
	})

	const isAuthor = userId === comment.author.id
	const isLoading = isUpdating || isDeleting

	const handleEdit = async (values: TypeCommentSchema) => {
		try {
			await updateComment({
				variables: {
					data: {
						commentId: comment.id,
						content: values.content
					}
				},
				optimisticResponse: {
					__typename: 'Mutation',
					updateComment: {
						...comment,
						content: values.content,
						updatedAt: new Date().toISOString()
					}
				}
			})
			setIsEditing(false)
		} catch {
			onError('Failed to update the comment')
		}
	}

	const handleDelete = async () => {
		try {
			await deleteComment({
				variables: { id: comment.id }
			})
		} catch {
			onError('Failed to delete comment')
		}
	}

	return (
		<div className="group relative space-y-4">
			<div className="flex gap-4">
				<UserAvatar user={comment.author} size="sm" />

				<div className="flex-1">
					<div className="flex items-center gap-2">
						<h4 className="text-base font-medium">
							{comment.author.displayName}
						</h4>
						<span className="text-xs text-muted-foreground">
							{formatDistanceToNow(new Date(comment.createdAt), {
								addSuffix: true
							})}
						</span>
					</div>

					{isEditing ? (
						<form onSubmit={form.handleSubmit(handleEdit)}>
							<Textarea
								{...form.register('content')}
								className="mt-2 min-h-[100px]"
								disabled={isLoading}
							/>
							<div className="mt-2 flex gap-2">
								<Button
									type="submit"
									size="sm"
									disabled={!form.formState.isDirty || isLoading}
								>
									<Check className="mr-2 h-4 w-4" />
									Save
								</Button>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => {
										setIsEditing(false)
										form.reset()
									}}
								>
									<X className="mr-2 h-4 w-4" />
									Cancel
								</Button>
							</div>
						</form>
					) : (
						<>
							<Card className="mt-2 bg-muted/50 p-4">
								<div className="flex">
									<p className="flex-1 whitespace-pre-wrap text-sm">
										{comment.content}
									</p>

									{isAuthor && (
										<div className="ml-4 flex-shrink-0">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant="ghost"
														size="icon"
														className="h-6 w-6"
													>
														<MoreVertical className="size-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent className="flex flex-col items-center gap-2 p-0">
													<Button
														variant="ghost"
														size="sm"
														onClick={() => setIsEditing(true)}
														disabled={isLoading}
														className="w-full"
													>
														<span>Edit</span>
														<Edit className="size-4" />
													</Button>
													<ConfirmModal
														heading="Delete comment"
														message="Are you sure you want to delete the comment?"
														onConfirm={handleDelete}
													>
														<Button
															variant="ghost"
															size="sm"
															disabled={isLoading}
															className="w-full"
														>
															<span>Delete</span>
															<X className="size-4" />
														</Button>
													</ConfirmModal>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									)}
								</div>
							</Card>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
