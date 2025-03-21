'use client'

import { Kanban, Table } from 'lucide-react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { TaskViewMode, useTaskViewStore } from '@/store/task/task-view.store'

export function TaskViewToggle() {
	const { mode, setMode } = useTaskViewStore()

	return (
		<Tabs value={mode} onValueChange={v => setMode(v as TaskViewMode)}>
			<TabsList className="h-8">
				<TabsTrigger value="kanban">
					<Kanban className="size-4" />
				</TabsTrigger>
				<TabsTrigger value="table">
					<Table className="size-4" />
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}
