'use client'

import { usePathname } from 'next/navigation'

import Loader from '@/components/common/Loader'
import { useTasks } from '@/hooks/use-tasks'
import { useTaskViewStore } from '@/store/task/task-view.store'
import { KanbanBoard } from './kanban/KanbanBoard'
import { TaskTable } from './table/TaskTable'

export function TaskPageContent() {
	const pathName = usePathname()
	const projectId = pathName.split('/')[2]

	const { mode } = useTaskViewStore()

	const { tasks, loading } = useTasks(projectId)

	if (loading) return <Loader fullScreen size={32} />

	return (
		<>
			{mode === 'kanban' && <KanbanBoard tasks={tasks} />}
			{mode === 'table' && <TaskTable tasks={tasks} />}
		</>
	)
}
