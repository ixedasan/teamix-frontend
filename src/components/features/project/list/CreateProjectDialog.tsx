import { useState } from 'react'

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

export function CreateProjectDialog() {
	const [open, setOpen] = useState(false)
	const isDesktop = useMediaQuery('(min-width: 768px)')

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button>+</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create Project</DialogTitle>
						<DialogDescription>
							Create a new project to start collaborating with your team.
						</DialogDescription>
					</DialogHeader>
					<CreateProjectForm />
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button>+</Button>
			</DrawerTrigger>
			<DrawerContent className="px-4">
				<DrawerHeader className="text-left">
					<DrawerTitle>Create Project</DrawerTitle>
					<DrawerDescription>
						Create a new project to start collaborating with your team.
					</DrawerDescription>
				</DrawerHeader>
				<CreateProjectForm showCancelButton onCancel={() => setOpen(false)} />
			</DrawerContent>
		</Drawer>
	)
}
