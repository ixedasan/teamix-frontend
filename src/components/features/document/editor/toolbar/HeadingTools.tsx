import { Editor } from '@tiptap/react'
import { Heading1, Heading2, Heading3 } from 'lucide-react'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup'

interface HeadingToolsProps {
	editor: Editor | null
}

export function HeadingTools({ editor }: HeadingToolsProps) {
	return (
		<ToggleGroup type="single">
			<ToggleGroupItem
				value="h1"
				aria-label="Toggle H1"
				onClick={() =>
					editor?.chain().focus().toggleHeading({ level: 1 }).run()
				}
				data-state={editor?.isActive('heading', { level: 1 }) ? 'on' : 'off'}
			>
				<Heading1 className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="h2"
				aria-label="Toggle H2"
				onClick={() =>
					editor?.chain().focus().toggleHeading({ level: 2 }).run()
				}
				data-state={editor?.isActive('heading', { level: 2 }) ? 'on' : 'off'}
			>
				<Heading2 className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="h3"
				aria-label="Toggle H3"
				onClick={() =>
					editor?.chain().focus().toggleHeading({ level: 3 }).run()
				}
				data-state={editor?.isActive('heading', { level: 3 }) ? 'on' : 'off'}
			>
				<Heading3 className="h-4 w-4" />
			</ToggleGroupItem>
		</ToggleGroup>
	)
}
