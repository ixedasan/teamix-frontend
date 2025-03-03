import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useTaskSheet } from '@/store/task/task-sheet'

export function useTaskNavigation() {
	const router = useRouter()
	const { setPending } = useTaskSheet()

	const navigateToTask = (taskId: string, projectId: string) => {
		// Сохраняем ID задачи в хранилище
		setPending(taskId, projectId)

		router.push(`/projects/${projectId}/tasks`)
	}

	return { navigateToTask }
}

// Хук для использования на странице заданий для автоматического открытия
export function useAutoOpenPendingTask() {
	const { open, consumePending } = useTaskSheet()

	useEffect(() => {
		const timer = setTimeout(() => {
			const pendingTaskId = consumePending()
			if (pendingTaskId) {
				open(pendingTaskId)
			}
		}, 200)

		return () => clearTimeout(timer)
	}, [])
}
