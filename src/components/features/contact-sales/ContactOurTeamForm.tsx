'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import {
	SendEnterprisePlanMessageSchema,
	type TypeSendEnterprisePlanMessageSchema
} from '@/schemas/project/send-enterprise-plan-message'

export function ContactOurTeamForm() {
	const t = useTranslations('contactSales.contact')

	const form = useForm<TypeSendEnterprisePlanMessageSchema>({
		resolver: zodResolver(SendEnterprisePlanMessageSchema),
		defaultValues: {
			name: '',
			email: '',
			company: '',
			message: ''
		}
	})

	const onSubmit = (data: TypeSendEnterprisePlanMessageSchema) => {
		console.log(data)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="relative space-y-4"
			>
				<h2 className="text-3xl font-bold">{t('heading')}</h2>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('nameLabel')}</FormLabel>
							<FormControl>
								<Input
									placeholder="John Doe"
									className="bg-background/50"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('emailLabel')}</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="john.doe@example.com"
									className="bg-background/50"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="company"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('companyLabel')}</FormLabel>
							<FormControl>
								<Input className="bg-background/50" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('messageLabel')}</FormLabel>
							<FormControl>
								<Textarea
									placeholder={t('messagePlaceholder')}
									rows={4}
									className="bg-background/50"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button size="lg" className="w-full">
					{t('submitButton')}
					<ArrowRight className="ml-2 h-4 w-4" />
				</Button>
			</form>
		</Form>
	)
}
