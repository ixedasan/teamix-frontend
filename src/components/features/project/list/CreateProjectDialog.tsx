import { ReactNode, useState } from 'react'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

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
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from '@/components/ui/Drawer'
import { useMediaQuery } from '@/hooks/use-media-query'
import { CreateProjectForm } from './CreateProjectForm'

interface ICreateProjectDialog {
	triger?: ReactNode
}

export function CreateProjectDialog({ triger }: ICreateProjectDialog) {
	const t = useTranslations('projects.create')
	const [open, setOpen] = useState(false)
	const isDesktop = useMediaQuery('(min-width: 768px)')

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					{triger ? (
						triger
					) : (
						<Button>
							<Plus size={16} />
						</Button>
					)}
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t('heading')}</DialogTitle>
						<DialogDescription>{t('description')}</DialogDescription>
					</DialogHeader>
					<CreateProjectForm />
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				{triger ? triger : <Button>+</Button>}
			</DrawerTrigger>
			<DrawerContent className="px-4">
				<DrawerHeader className="text-left">
					<DrawerTitle>{t('heading')}</DrawerTitle>
					<DrawerDescription>{t('description')}</DrawerDescription>
				</DrawerHeader>
				<CreateProjectForm showCancelButton onCancel={() => setOpen(false)} />
			</DrawerContent>
		</Drawer>
	)
}
