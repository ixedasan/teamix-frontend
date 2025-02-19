import { useCallback, useState } from 'react'
import { Editor } from '@tiptap/react'
import { ImageIcon } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'

interface ImageDialogProps {
	editor: Editor | null
}

export function ImageDialog({ editor }: ImageDialogProps) {
	const [imageUrl, setImageUrl] = useState('')

	const addImage = useCallback(() => {
		if (imageUrl) {
			editor?.chain().focus().setImage({ src: imageUrl }).run()
		}
		setImageUrl('')
	}, [editor, imageUrl])

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<ImageIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Image</DialogTitle>
				</DialogHeader>
				<Input
					type="url"
					placeholder="https://example.com/image.jpg"
					value={imageUrl}
					onChange={e => setImageUrl(e.target.value)}
				/>
				<Button onClick={addImage}>Add Image</Button>
			</DialogContent>
		</Dialog>
	)
}
