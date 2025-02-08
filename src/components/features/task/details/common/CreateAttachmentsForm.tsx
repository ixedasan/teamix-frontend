'use client'

import { useCallback, useState, type ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus, UploadCloud } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/Button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/Dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/Form'
import { useUploadTaskAttachmentMutation } from '@/graphql/generated/output'
import {
	UploadFileSchema,
	type TypeUploadFileSchema
} from '@/schemas/upload-file.schema'
import { cn } from '@/lib/utils'

interface ICreateAttachmentsForm {
	taskId: string
	trigger?: ReactNode
}

export function CreateAttachmentsForm({
	taskId,
	trigger
}: ICreateAttachmentsForm) {
	const [open, setOpen] = useState(false)
	const [uploadFile, { loading, error }] = useUploadTaskAttachmentMutation({
		onCompleted: () => {
			toast.success('Attachment uploaded successfully')
			setOpen(false)
			form.reset()
		}
	})

	const form = useForm<TypeUploadFileSchema>({
		resolver: zodResolver(UploadFileSchema),
		defaultValues: {
			file: undefined
		}
	})

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (acceptedFiles.length > 0) {
				form.setValue('file', acceptedFiles[0])
			}
		},
		[form]
	)

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: false,
		accept: { '*': [] }
	})

	const onSubmit = (data: TypeUploadFileSchema) => {
		uploadFile({
			variables: { taskId: taskId, file: data.file }
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{trigger ? (
					trigger
				) : (
					<Button variant="outline" size="icon">
						<Plus className="size-4" />
					</Button>
				)}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload attachment</DialogTitle>
					<DialogDescription className="sr-only"></DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="file"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div
											{...getRootProps()}
											className={cn(
												'cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition',
												isDragActive ? 'border-primary' : 'border-gray-300'
											)}
										>
											<input
												{...getInputProps()}
												onChange={e => {
													const file = e.target.files?.[0] || null
													field.onChange(file)
												}}
											/>
											<UploadCloud className="mx-auto h-8 w-8 text-muted-foreground" />
											<p className="mt-2 text-sm">
												Drag the file here or click to select
											</p>
											{field.value && (
												<p className="mt-2 text-sm font-medium">
													{field.value.name}
												</p>
											)}
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{error && (
							<p className="text-sm text-red-500">
								Uploading erorr: {error.message}
							</p>
						)}

						<div className="flex justify-end gap-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => setOpen(false)}
								disabled={loading}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={loading}>
								{loading && <Loader2 className="mr-2 size-4 animate-spin" />}
								Upload
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
