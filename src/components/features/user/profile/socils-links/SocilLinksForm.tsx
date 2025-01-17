'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { FormWrapper } from '@/components/common/FormWrapper'
import { Button } from '@/components/ui/Button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import {
	useCreateSocialLinkMutation,
	useFindSocialLinksQuery
} from '@/graphql/generated/output'
import {
	SocialLinksSchema,
	TypeSocialLinksSchema
} from '@/schemas/user/social-links.schema'
import { SocilLinksList } from './SocilLinksList'

export function SocilLinksForm() {
	const t = useTranslations('settings.profile.socialLinks.createForm')

	const { refetch } = useFindSocialLinksQuery()

	const form = useForm<TypeSocialLinksSchema>({
		resolver: zodResolver(SocialLinksSchema),
		defaultValues: {
			title: '',
			url: ''
		}
	})

	const { isValid } = form.formState

	const [create, { loading: isLoadingCreate }] = useCreateSocialLinkMutation({
		onCompleted() {
			form.reset()
			refetch()
			toast.success(t('successMessage'))
		},
		onError() {
			toast.error(t('errorMessage'))
		}
	})

	const onSubmit = (data: TypeSocialLinksSchema) => {
		create({ variables: { data } })
	}

	return (
		<FormWrapper heading={t('heading')}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="px-5">
								<FormLabel>{t('titleLabel')}</FormLabel>
								<FormControl>
									<Input
										placeholder={t('titlePlaceholder')}
										disabled={isLoadingCreate}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="url"
						render={({ field }) => (
							<FormItem className="px-5 pb-3">
								<FormLabel>{t('urlLabel')}</FormLabel>
								<FormControl>
									<Input
										placeholder={t('urlPlaceholder')}
										disabled={isLoadingCreate}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<div className="flex justify-end p-5">
						<Button disabled={!isValid || isLoadingCreate}>
							{t('submitButton')}
						</Button>
					</div>
				</form>
			</Form>
			<SocilLinksList />
		</FormWrapper>
	)
}
