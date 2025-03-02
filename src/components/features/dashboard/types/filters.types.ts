import type { Priority, TaskStatus } from '@/graphql/generated/output'

export interface DateRange {
	from: Date | undefined
	to: Date | undefined
}

export interface Project {
	id: string
	name: string
	icon?: string
	description?: string
}

export interface User {
	id: string
	username: string
	displayName: string
	avatar?: string
}

export interface Label {
	id: string
	name: string
	color: string
}

export interface FilterState {
	status: TaskStatus[]
	priority: Priority[]
	projects: string[]
	search: string
	dateRange: DateRange
	assignee: string[]
	labels: string[]
}

export interface FilterProps {
	projects: Project[]
	onFilterChange: (filters: FilterState) => void
	initialFilters?: FilterState
}

export interface TaskItemProps {
	task: {
		id: string
		title: string
		description?: string
		status: TaskStatus
		priority: Priority
		position?: number
		startDate?: string
		dueDate?: string
		createdAt: string
		updatedAt: string
		project?: {
			id: string
			name: string
			icon?: string
		}
		labels?: {
			id: string
			name: string
			color: string
		}[]
		assignees?: {
			id?: string
			user: {
				id: string
				username?: string
				displayName?: string
				avatar?: string
			}
		}[]
		comments?: {
			id: string
		}[]
		attachments?: {
			id: string
			filename: string
			mimeType: string
		}[]
		links?: {
			id: string
			title: string
			url: string
		}[]
		createdBy?: {
			id: string
			username?: string
			displayName?: string
			avatar?: string
		}
	}
	showProject?: boolean
	isOverdue?: boolean
	isCompact?: boolean
}
