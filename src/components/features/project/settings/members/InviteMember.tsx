'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
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
import { Input } from '@/components/ui/Input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/Select'
import { Role, useInviteMemberMutation } from '@/graphql/generated/output'
import {
	InviteMemberSchema,
	TypeInviteMemberSchema
} from '@/schemas/project/invite-member.schema'

export function InviteMember() {
	const t = useTranslations('projects.settings.member.invite')

	const [open, setOpen] = useState(false)

	const form = useForm<TypeInviteMemberSchema>({
		resolver: zodResolver(InviteMemberSchema),
		defaultValues: {
			email: '',
			role: Role.Member
		}
	})

	const { isValid, isDirty } = form.formState

	const [invite, { loading: isLoadingInvite }] = useInviteMemberMutation({
		onCompleted: () => {
			toast.success(t('successMessage'))
			form.reset()
		},
		onError: error => {
			toast.error(t('errorMessage'), { description: error.message })
		}
	})

	const onSubmit = (data: TypeInviteMemberSchema) => {
		invite({ variables: { data } })
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<Plus className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t('heading')}</DialogTitle>
					<DialogDescription>{t('description')}</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="flex items-center gap-3">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormControl>
											<Input
												placeholder="john.doe@example.com"
												disabled={isLoadingInvite}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Select
												disabled={isLoadingInvite}
												onValueChange={field.onChange}
												value={field.value}
											>
												<SelectTrigger className="w-[110px]">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value={Role.Admin}>
														{t('roleOptions.admin')}
													</SelectItem>
													<SelectItem value={Role.Member}>
														{t('roleOptions.member')}
													</SelectItem>
													<SelectItem value={Role.Viewer}>
														{t('roleOptions.viewer')}
													</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex justify-end gap-2">
							<Button
								type="button"
								variant="secondary"
								size="sm"
								onClick={() => setOpen(false)}
							>
								{t('cancelButton')}
							</Button>
							<Button
								type="submit"
								size="sm"
								disabled={!isValid || !isDirty || isLoadingInvite}
							>
								{t('submitButton')}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
