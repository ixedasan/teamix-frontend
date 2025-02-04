'use client'

import { useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import debounce from 'lodash/debounce'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { toast } from 'sonner'

import { SkeletonWrapper } from '@/components/common/SkeletonWrapper'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import {
	useUpdateTaskMutation,
	type FindTaskByIdQuery
} from '@/graphql/generated/output'
import {
	UpdateTaskHeaderSchema,
	type TypeUpdateTaskHeaderSchema
} from '@/schemas/task/update-task-header.schema'

interface ITaskHeaderSection {
	task: FindTaskByIdQuery['findTask']
	isLoading: boolean
}

export function TaskHeaderSection({ task, isLoading }: ITaskHeaderSection) {
	const form = useForm<TypeUpdateTaskHeaderSchema>({
		resolver: zodResolver(UpdateTaskHeaderSchema),
		values: {
			title: task?.title ?? '',
			description: task?.description ?? ''
		}
	})

	const [update] = useUpdateTaskMutation({
		onError: () => {
			toast.error('Something went wrong')
		}
	})

	const debouncedUpdate = useMemo(
		() =>
			debounce((data: TypeUpdateTaskHeaderSchema) => {
				update({
					variables: { id: task.id, data }
				})
			}, 500),
		[task?.id, update]
	)
	const onChange = () => {
		const data = form.getValues()
		debouncedUpdate(data)
	}

	return (
		<div>
			<Form {...form}>
				<form onChange={onChange} className="space-y-3">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<SkeletonWrapper isLoading={isLoading}>
									<FormControl>
										<Input
											className="border border-background bg-background text-base ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus-visible:outline-background focus-visible:ring-background disabled:cursor-not-allowed disabled:opacity-50 md:text-xl"
											{...field}
										/>
									</FormControl>
								</SkeletonWrapper>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<SkeletonWrapper isLoading={isLoading}>
									<FormControl>
										<TextareaAutosize
											placeholder="Description"
											className="flex min-h-[80px] w-full border border-background bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-0 md:text-sm"
											{...field}
										/>
									</FormControl>
								</SkeletonWrapper>
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	)
}
