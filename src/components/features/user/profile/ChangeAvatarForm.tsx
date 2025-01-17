'use client'

import { useRef, type ChangeEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ConfirmModal } from '@/components/common/ConfirmModal'
import { FormWrapper } from '@/components/common/FormWrapper'
import { SkeletonWrapper } from '@/components/common/SkeletonWrapper'
import { UserAvatar } from '@/components/common/UserAvatar'
import { Button } from '@/components/ui/Button'
import { Form, FormField } from '@/components/ui/Form'
import {
	useChangeProfileAvatarMutation,
	useFindProfileQuery,
	useRemoveProfileAvatarMutation
} from '@/graphql/generated/output'
import {
	TypeUploadImageSchema,
	UploadImageSchema
} from '@/schemas/upload-image.schema'

export function ChangeAvatarForm() {
	const t = useTranslations('settings.profile.avatar')

	const inputRef = useRef<HTMLInputElement>(null)

	const { data, loading, refetch } = useFindProfileQuery()
	const profile = data?.findProfile

	const form = useForm<TypeUploadImageSchema>({
		resolver: zodResolver(UploadImageSchema),
		values: {
			file: profile?.avatar || ''
		}
	})

	const [update, { loading: isLoadingUpdate }] = useChangeProfileAvatarMutation(
		{
			onCompleted() {
				refetch()
				toast.success(t('successUpdateMessage'))
			},
			onError() {
				toast.error(t('errorUpdateMessage'))
			}
		}
	)

	const [remove, { loading: isLoadingRemove }] = useRemoveProfileAvatarMutation(
		{
			onCompleted() {
				refetch()
				toast.success(t('successRemoveMessage'))
			},
			onError() {
				toast.error(t('errorRemoveMessage'))
			}
		}
	)

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (file) {
			form.setValue('file', file)
			update({ variables: { avatar: file } })
		}
	}

	return (
		<FormWrapper heading={t('heading')}>
			<Form {...form}>
				<FormField
					control={form.control}
					name="file"
					render={({ field }) => (
						<div className="px-5 pb-5">
							<SkeletonWrapper isLoading={loading}>
								<div className="flex w-full items-center space-x-6">
									<UserAvatar
										user={{
											username: profile?.username || 'A',
											avatar:
												field.value instanceof File
													? URL.createObjectURL(field.value)
													: field.value
										}}
										size="xl"
									/>
									<div className="space-y-4">
										<div className="flex items-center gap-4">
											<input
												className="hidden"
												type="file"
												ref={inputRef}
												onChange={handleImageChange}
											/>
											<Button
												variant="secondary"
												onClick={() => inputRef.current?.click()}
												disabled={isLoadingUpdate || isLoadingRemove}
											>
												{t('updateButton')}
											</Button>
											{profile?.avatar && (
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
										<p className="text-sm text-muted-foreground">{t('info')}</p>
									</div>
								</div>
							</SkeletonWrapper>
						</div>
					)}
				/>
			</Form>
		</FormWrapper>
	)
}
