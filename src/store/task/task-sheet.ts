import { create } from 'zustand'

type TaskSheetStore = {
	isOpen: boolean
	taskId: string | null
	pendingTaskId: string | null
	projectId: string | null
	open: (taskId: string) => void
	setPending: (taskId: string, projectId: string) => void
	consumePending: () => string | null
	close: () => void
}

export const useTaskSheet = create<TaskSheetStore>((set, get) => ({
	isOpen: false,
	taskId: null,
	pendingTaskId: null,
	projectId: null,
	open: taskId => set({ isOpen: true, taskId }),
	setPending: (taskId, projectId) =>
		set({
			pendingTaskId: taskId,
			projectId
		}),
	consumePending: () => {
		const pendingId = get().pendingTaskId
		set({ pendingTaskId: null })
		return pendingId
	},
	close: () => set({ isOpen: false, taskId: null })
}))
