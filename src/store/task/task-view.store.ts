import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type TaskViewMode = 'kanban' | 'table'

interface ViewState {
	mode: TaskViewMode
	setMode: (mode: TaskViewMode) => void
}
export const useTaskViewStore = create(
	persist<ViewState>(
		set => ({
			mode: 'kanban',
			setMode: mode => set({ mode })
		}),
		{
			name: 'task-view',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
