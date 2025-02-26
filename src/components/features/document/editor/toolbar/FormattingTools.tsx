import { Editor } from '@tiptap/react'
import { Bold, Italic, Strikethrough, UnderlineIcon } from 'lucide-react'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup'

interface FormattingToolsProps {
	editor: Editor | null
}

export function FormattingTools({ editor }: FormattingToolsProps) {
	return (
		<ToggleGroup type="multiple">
			<ToggleGroupItem
				value="bold"
				aria-label="Toggle bold"
				onClick={() => editor?.chain().focus().toggleBold().run()}
				data-state={editor?.isActive('bold') ? 'on' : 'off'}
			>
				<Bold className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="italic"
				aria-label="Toggle italic"
				onClick={() => editor?.chain().focus().toggleItalic().run()}
				data-state={editor?.isActive('italic') ? 'on' : 'off'}
			>
				<Italic className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="underline"
				aria-label="Toggle underline"
				onClick={() => editor?.chain().focus().toggleUnderline().run()}
				data-state={editor?.isActive('underline') ? 'on' : 'off'}
			>
				<UnderlineIcon className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="strike"
				aria-label="Toggle strikethrough"
				onClick={() => editor?.chain().focus().toggleStrike().run()}
				data-state={editor?.isActive('strike') ? 'on' : 'off'}
			>
				<Strikethrough className="h-4 w-4" />
			</ToggleGroupItem>
		</ToggleGroup>
	)
}
