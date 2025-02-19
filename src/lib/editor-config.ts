import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'

export const configureEditor = () => [
	StarterKit.configure({
		heading: {
			levels: [1, 2, 3]
		}
	}),
	Highlight,
	Link,
	Image,
	TaskList,
	TaskItem.configure({
		nested: true
	}),
	Placeholder.configure({
		placeholder: 'Write something...'
	}),
	Underline
]
