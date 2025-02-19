import { useEffect, useRef } from 'react'
import { Editor, EditorContent } from '@tiptap/react'

interface EditorWrapperProps {
	editor: Editor | null
}

export function EditorWrapper({ editor }: EditorWrapperProps) {
	const contentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClick = () => {
			if (editor && !editor.isFocused) {
				editor.commands.focus('end')
			}
		}

		const editorElement = contentRef.current
		if (editorElement) {
			editorElement.addEventListener('click', handleClick)

			return () => {
				editorElement.removeEventListener('click', handleClick)
			}
		}
	}, [editor])

	return (
		<div ref={contentRef}>
			<EditorContent
				editor={editor}
				className="prose min-h-[300px] max-w-none rounded-sm border border-border p-4"
			/>
		</div>
	)
}
