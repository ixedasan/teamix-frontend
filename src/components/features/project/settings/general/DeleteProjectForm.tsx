'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { FormWrapper } from '@/components/common/FormWrapper'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import {
	useDeleteProjectMutation,
	useFindProjectByIdQuery
} from '@/graphql/generated/output'

export function DeleteProjectForm() {
	const t = useTranslations('projects.settings.general.delete')

	const router = useRouter()
	const [isOpen, setIsOpen] = useState(false)
	const [confirmationText, setConfirmationText] = useState<string>('')

	const { data, refetch } = useFindProjectByIdQuery()
	const project = data?.findProjectById

	const [remove, { loading: isLoadingRemove }] = useDeleteProjectMutation({
		onCompleted() {
			toast.success('Project deleted successfully')
			router.push('/projects')
			refetch()
			setIsOpen(false)
		},
		onError(error) {
			toast.error('Failed to delete project', {
				description: error.message
			})
		}
	})

	const handleDelete = () => {
		if (confirmationText === project?.name) {
			remove()
		}
	}

	const isDeleteDisabled = confirmationText !== project?.name || isLoadingRemove

	return (
		<FormWrapper>
			<Accordion type="single" collapsible>
				<AccordionItem value="delete-project">
					<AccordionTrigger>
						<div className="flex items-center gap-2">
							<Trash2 className="h-4 w-4" />
							{t('heading')}
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-4">
							<p className="text-sm text-muted-foreground">
								{t('description')}
							</p>
							<Dialog open={isOpen} onOpenChange={setIsOpen}>
								<DialogTrigger asChild>
									<Button variant="destructive">{t('deleteButton')}</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-lg">
									<DialogHeader>
										<DialogTitle>{t('confirmModal.heading')}</DialogTitle>
										<DialogDescription>
											{t('confirmModal.message')}
											<span className="mx-2 font-mono font-bold">
												{project?.name}
											</span>
										</DialogDescription>
									</DialogHeader>
									<div className="space-y-3 py-4">
										<div className="space-y-2">
											<Label htmlFor="projectName">
												{t('confirmModal.deleteLabel')}
											</Label>
											<Input
												id="projectName"
												value={confirmationText}
												onChange={e => setConfirmationText(e.target.value)}
												placeholder={project?.name}
												className={
													confirmationText && confirmationText !== project?.name
														? 'border-destructive'
														: ''
												}
											/>
										</div>
									</div>
									<DialogFooter>
										<Button
											variant="ghost"
											onClick={() => setIsOpen(false)}
											disabled={isLoadingRemove}
										>
											{t('confirmModal.cancelButton')}
										</Button>
										<Button
											variant="destructive"
											onClick={handleDelete}
											disabled={isDeleteDisabled}
										>
											{t('confirmModal.confirmButton')}
										</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</FormWrapper>
	)
}
