import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface ViewStore {
	viewType: 'grid' | 'list'
	setViewType: (type: 'grid' | 'list') => void
}

export const projectListStore = create(
	persist<ViewStore>(
		set => ({
			viewType: 'grid',
			setViewType: type => set({ viewType: type })
		}),
		{
			name: 'project-list-view',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
