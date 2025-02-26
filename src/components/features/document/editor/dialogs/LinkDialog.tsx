import { useCallback, useState } from 'react'
import { Editor } from '@tiptap/react'
import { LinkIcon } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'

interface LinkDialogProps {
	editor: Editor | null
}

export function LinkDialog({ editor }: LinkDialogProps) {
	const [linkUrl, setLinkUrl] = useState('')

	const setLink = useCallback(() => {
		if (linkUrl) {
			editor
				?.chain()
				.focus()
				.extendMarkRange('link')
				.setLink({ href: linkUrl })
				.run()
		}
		setLinkUrl('')
	}, [editor, linkUrl])

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<LinkIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Link</DialogTitle>
				</DialogHeader>
				<Input
					type="url"
					placeholder="https://example.com"
					value={linkUrl}
					onChange={e => setLinkUrl(e.target.value)}
				/>
				<Button onClick={setLink}>Add Link</Button>
			</DialogContent>
		</Dialog>
	)
}
