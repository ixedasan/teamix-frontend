'use client'

import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { CardContainer } from '@/components/common/CardContainer'
import { Form, FormField } from '@/components/ui/Form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/Select'
import {
	ChangeLanguageSchema,
	TypeChangeLanguageSchema
} from '@/schemas/user/change-language.schema'
import { languagesName } from '@/lib/i18n/config'
import { setLanguage } from '@/lib/i18n/language'

export function ChangeLanguageForm() {
	const t = useTranslations('settings.appearance.language')

	const [isPending, startTransition] = useTransition()
	const locale = useLocale()

	const form = useForm<TypeChangeLanguageSchema>({
		resolver: zodResolver(ChangeLanguageSchema),
		values: {
			language: locale as TypeChangeLanguageSchema['language']
		}
	})

	const onSubmit = (data: TypeChangeLanguageSchema) => {
		startTransition(async () => {
			try {
				await setLanguage(data.language)
			} catch {
				toast.success(t('successMessage'))
			}
		})
	}

	return (
		<CardContainer
			heading={t('heading')}
			description={t('description')}
			rightContent={
				<Form {...form}>
					<FormField
						control={form.control}
						name="language"
						render={({ field }) => (
							<Select
								onValueChange={value => {
									field.onChange(value)
									form.handleSubmit(onSubmit)()
								}}
								value={field.value}
							>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder={t('selectPlaceholder')} />
								</SelectTrigger>
								<SelectContent>
									{Object.entries(languagesName).map(([code, name]) => (
										<SelectItem key={code} value={code} disabled={isPending}>
											{name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
				</Form>
			}
		/>
	)
}
