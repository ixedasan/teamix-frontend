'use client'

import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type ChangeEvent
} from 'react'
import { useParams } from 'next/navigation'
import { useEditor } from '@tiptap/react'
import debounce from 'debounce'

import { Input } from '@/components/ui/Input'
import { useDocument } from '@/hooks/use-document'
import { EditorWrapper } from './EditorContent'
import { Toolbar } from './toolbar'
import { configureEditor } from '@/lib/editor-config'

export function DocumentEditor() {
	const params = useParams()
	const documentId = params.documentId as string
	const { document, loading, error, updateDocument } = useDocument(documentId)
	const [title, setTitle] = useState('')
	const isInitialLoadRef = useRef(true)

	const debouncedUpdateDocument = useCallback(
		debounce((title: string, content: any) => {
			updateDocument(title, content)
		}, 1000),
		[updateDocument]
	)

	const editor = useEditor({
		extensions: configureEditor(),
		content: null,
		autofocus: false,
		editorProps: {
			attributes: {
				class:
					'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none'
			}
		},
		onUpdate: ({ editor }) => {
			if (isInitialLoadRef.current) return

			const json = editor.getJSON()
			debouncedUpdateDocument(title, json)
		}
	})

	useEffect(() => {
		if (document && editor) {
			isInitialLoadRef.current = true
			setTitle(document.title)

			const currentContent = JSON.stringify(editor.getJSON())
			const newContent = JSON.stringify(document.content)

			if (currentContent !== newContent) {
				editor.commands.setContent(document.content, false)

				if (editor.isFocused) {
					editor.view.focus()
				}
			}

			setTimeout(() => {
				isInitialLoadRef.current = false
			}, 100)
		}
	}, [document, editor])

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newTitle = e.target.value
		setTitle(newTitle)
		debouncedUpdateDocument(newTitle, editor?.getJSON())
	}

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>

	return (
		<div className="mx-auto w-full max-w-4xl p-4">
			<Input
				type="text"
				value={title}
				onChange={handleTitleChange}
				placeholder="Document Title"
				className="mb-4 text-2xl font-bold"
			/>
			<Toolbar editor={editor} />
			<EditorWrapper editor={editor} />
		</div>
	)
}
