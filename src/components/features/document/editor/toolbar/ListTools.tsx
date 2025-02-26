import { Editor } from '@tiptap/react'
import { CheckSquare, List, ListOrdered } from 'lucide-react'

import { Button } from '@/components/ui/Button'

interface ListToolsProps {
	editor: Editor | null
}

export function ListTools({ editor }: ListToolsProps) {
	return (
		<>
			<Button
				variant="outline"
				size="icon"
				onClick={() => editor?.chain().focus().toggleBulletList().run()}
				data-state={editor?.isActive('bulletList') ? 'on' : 'off'}
			>
				<List className="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				size="icon"
				onClick={() => editor?.chain().focus().toggleOrderedList().run()}
				data-state={editor?.isActive('orderedList') ? 'on' : 'off'}
			>
				<ListOrdered className="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				size="icon"
				onClick={() => editor?.chain().focus().toggleTaskList().run()}
				data-state={editor?.isActive('taskList') ? 'on' : 'off'}
			>
				<CheckSquare className="h-4 w-4" />
			</Button>
		</>
	)
}
