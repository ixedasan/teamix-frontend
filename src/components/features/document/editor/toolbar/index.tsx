import { Editor } from '@tiptap/react'

import { ImageDialog } from '../dialogs/ImageDialog'
import { LinkDialog } from '../dialogs/LinkDialog'
import { FormattingTools } from './FormattingTools'
import { HeadingTools } from './HeadingTools'
import { ListTools } from './ListTools'

interface ToolbarProps {
	editor: Editor | null
}

export function Toolbar({ editor }: ToolbarProps) {
	return (
		<div className="mb-4 flex flex-wrap gap-2">
			<FormattingTools editor={editor} />
			<HeadingTools editor={editor} />
			<ListTools editor={editor} />
			<LinkDialog editor={editor} />
			<ImageDialog editor={editor} />
		</div>
	)
}
