'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import EditorJS, { type OutputData } from '@editorjs/editorjs'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { useDebounce } from 'use-debounce'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { useChangeDocumentMutation } from '@/graphql/generated/output'
import { useDocument } from '@/hooks/use-document'

import '@/styles/editorjs.css'

export function DocumentEditor() {
	const params = useParams()
	const documentId = params.documentId as string

	const editorRef = useRef<EditorJS | null>(null)
	const [editorData, setEditorData] = useState<OutputData | null>(null)
	const { document, loading, error } = useDocument(documentId)
	const [updateDocument, { loading: isSaving }] = useChangeDocumentMutation()
	const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>(
		'saved'
	)

	const [debouncedEditorData] = useDebounce(editorData, 1000)

	const initializeEditor = useCallback(async () => {
		if (!document || editorRef.current) return

		const EditorJS = (await import('@editorjs/editorjs')).default
		const Header = (await import('@editorjs/header')).default
		const List = (await import('@editorjs/list')).default
		const Paragraph = (await import('@editorjs/paragraph')).default
		const Table = (await import('@editorjs/table')).default
		const Code = (await import('@editorjs/code')).default
		const InlineCode = (await import('@editorjs/inline-code')).default
		const Marker = (await import('@editorjs/marker')).default
		const Quote = (await import('@editorjs/quote')).default
		const Warning = (await import('@editorjs/warning')).default
		const Delimiter = (await import('@editorjs/delimiter')).default
		const CheckList = (await import('@editorjs/checklist')).default
		const ImageTool = (await import('@editorjs/image')).default
		const LinkTool = (await import('@editorjs/link')).default
		const Embed = (await import('@editorjs/embed')).default

		const editor = new EditorJS({
			holder: 'editor',
			tools: {
				header: {
					class: Header,
					config: {
						levels: [1, 2, 3, 4, 5, 6],
						defaultLevel: 1
					}
				},
				list: {
					class: List,
					inlineToolbar: true,
					config: {
						defaultStyle: 'unordered'
					}
				},
				paragraph: {
					class: Paragraph,
					inlineToolbar: true
				},
				table: {
					class: Table,
					inlineToolbar: true,
					config: {
						rows: 2,
						cols: 3
					}
				},
				code: Code,
				inlineCode: InlineCode,
				marker: Marker,
				quote: {
					class: Quote,
					inlineToolbar: true,
					config: {
						quotePlaceholder: 'Enter a quote',
						captionPlaceholder: "Quote's author"
					}
				},
				warning: {
					class: Warning,
					inlineToolbar: true,
					config: {
						titlePlaceholder: 'Title',
						messagePlaceholder: 'Message'
					}
				},
				delimiter: Delimiter,
				checklist: {
					class: CheckList,
					inlineToolbar: true
				},
				image: {
					class: ImageTool,
					config: {
						endpoints: {
							byFile: '/api/uploadImage',
							byUrl: '/api/fetchImage'
						},
						uploader: {
							uploadByFile(file: File) {
								// Implement your file upload logic here
								return Promise.resolve({
									success: 1,
									file: {
										url: 'https://example.com/image.jpg'
									}
								})
							}
						}
					}
				},
				linkTool: {
					class: LinkTool,
					config: {
						endpoint: '/api/fetchUrl'
					}
				},
				embed: {
					class: Embed,
					config: {
						services: {
							youtube: true,
							codesandbox: true,
							codepen: true
						}
					}
				}
			},
			data: document.content,
			onChange: async () => {
				setSaveStatus('saving')
				const savedData = await editor.save()
				setEditorData(savedData)
			},
			onReady: () => {
				editorRef.current = editor
			},
			autofocus: true,
			placeholder: 'Start writing your document...'
		})
	}, [document])

	useEffect(() => {
		initializeEditor()

		return () => {
			if (editorRef.current) {
				editorRef.current.destroy()
				editorRef.current = null
			}
		}
	}, [initializeEditor])

	useEffect(() => {
		const saveDocument = async () => {
			if (debouncedEditorData) {
				try {
					await updateDocument({
						variables: {
							id: documentId,
							data: {
								content: debouncedEditorData
							}
						}
					})
					setSaveStatus('saved')
				} catch (error) {
					console.error('Error saving document:', error)
					setSaveStatus('error')
				}
			}
		}

		saveDocument()
	}, [debouncedEditorData, documentId, updateDocument])

	if (loading) return <DocumentSkeleton />
	if (error) return <DocumentError error={error} />
	if (!document) return <DocumentNotFound />

	return (
		<Card className="mx-auto mt-8 w-full max-w-4xl">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<div className="flex flex-col gap-2">
					<CardTitle className="text-2xl font-bold">{document.title}</CardTitle>
					<div className="flex items-center gap-2 text-sm text-gray-500">
						<SaveStatus status={saveStatus} />
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div id="editor" className="prose max-w-none" />
			</CardContent>
		</Card>
	)
}

function SaveStatus({ status }: { status: 'saved' | 'saving' | 'error' }) {
	if (status === 'saved') {
		return (
			<Badge variant="outline">
				<CheckCircle2 className="mr-1 h-4 w-4" /> Saved
			</Badge>
		)
	}
	if (status === 'saving') {
		return <Badge variant="outline">Saving...</Badge>
	}
	return (
		<Badge variant="outline">
			<AlertCircle className="mr-1 h-4 w-4" /> Error saving
		</Badge>
	)
}

function DocumentSkeleton() {
	return (
		<Card className="mx-auto mt-8 w-full max-w-4xl">
			<CardHeader>
				<Skeleton className="h-8 w-[250px]" />
			</CardHeader>
			<CardContent>
				<Skeleton className="h-[300px] w-full" />
			</CardContent>
		</Card>
	)
}

function DocumentError({ error }: { error: Error }) {
	return (
		<Card className="mx-auto mt-8 w-full max-w-4xl">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-red-600">Error</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-red-600">{error.message}</p>
			</CardContent>
		</Card>
	)
}

function DocumentNotFound() {
	return (
		<Card className="mx-auto mt-8 w-full max-w-4xl">
			<CardHeader>
				<CardTitle className="text-2xl font-bold">Document Not Found</CardTitle>
			</CardHeader>
			<CardContent>
				<p>The requested document could not be found.</p>
			</CardContent>
		</Card>
	)
}
