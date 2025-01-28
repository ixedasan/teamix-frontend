'use client'

import { useRef, type ChangeEvent } from 'react'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ConfirmModal } from '@/components/common/ConfirmModal'
import { FormWrapper } from '@/components/common/FormWrapper'
import { SkeletonWrapper } from '@/components/common/SkeletonWrapper'
import { Button } from '@/components/ui/Button'
import { Form, FormField } from '@/components/ui/Form'
import {
	useChangeProjectCoverMutation,
	useFindProjectByIdQuery,
	useRemoveProjectCoverMutation
} from '@/graphql/generated/output'
import {
	UploadImageSchema,
	type TypeUploadImageSchema
} from '@/schemas/upload-image.schema'
import { getMediaSource } from '@/utils/get-media-source'

export function ChangeProjectCoverForm() {
	const t = useTranslations('projects.settings.general.cover')

	const inputRef = useRef<HTMLInputElement>(null)

	const { data, loading, refetch } = useFindProjectByIdQuery()
	const project = data?.findProjectById

	const form = useForm<TypeUploadImageSchema>({
		resolver: zodResolver(UploadImageSchema),
		values: {
			file: getMediaSource(project?.cover || '')
		}
	})

	const [update, { loading: isLoadingUpdate }] = useChangeProjectCoverMutation({
		onCompleted() {
			refetch()
			toast.success(t('successUpdateMessage'))
		},
		onError(error) {
			toast.error(t('errorUpdateMessage'), {
				description: error.message
			})
		}
	})

	const [remove, { loading: isLoadingRemove }] = useRemoveProjectCoverMutation({
		onCompleted() {
			refetch()
			toast.success(t('successRemoveMessage'))
		},
		onError(error) {
			toast.error(t('errorRemoveMessage'), {
				description: error.message
			})
		}
	})

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (file) {
			form.setValue('file', file)
			update({ variables: { data: file } })
		}
	}

	return (
		<FormWrapper>
			<Form {...form}>
				<FormField
					control={form.control}
					name="file"
					render={({ field }) => (
						<div>
							<SkeletonWrapper isLoading={loading}>
								<div className="relative h-24 overflow-hidden rounded-md bg-gradient-to-r from-primary/70 to-chart-4/80">
									{(field.value || project?.cover) && (
										<Image
											src={
												field.value instanceof File
													? URL.createObjectURL(field.value)
													: field.value || project?.cover || ''
											}
											alt="Project cover"
											fill
											className="object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
										/>
									)}
								</div>
							</SkeletonWrapper>
							<div className="mt-4 flex justify-end gap-2">
								<input
									className="hidden"
									type="file"
									ref={inputRef}
									onChange={handleImageChange}
									accept="image/*"
								/>
								<Button
									variant="secondary"
									onClick={() => inputRef.current?.click()}
									disabled={isLoadingUpdate || isLoadingRemove}
								>
									{t('updateButton')}
								</Button>
								{project?.cover && (
									<ConfirmModal
										heading={t('confirmModal.heading')}
										message={t('confirmModal.message')}
										onConfirm={() => remove()}
									>
										<Button
											variant="ghost"
											size="icon"
											disabled={isLoadingUpdate || isLoadingRemove}
										>
											<Trash className="size-4" />
										</Button>
									</ConfirmModal>
								)}
							</div>
						</div>
					)}
				/>
			</Form>
		</FormWrapper>
	)
}
