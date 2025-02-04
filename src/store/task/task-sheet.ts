import { create } from 'zustand'

type TaskSheetStore = {
	isOpen: boolean
	taskId: string | null
	open: (taskId: string) => void
	close: () => void
}

export const useTaskSheet = create<TaskSheetStore>(set => ({
	isOpen: false,
	taskId: null,
	open: taskId => set({ isOpen: true, taskId: taskId }),
	close: () => set({ isOpen: false, taskId: null })
}))
