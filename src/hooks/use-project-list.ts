import { projectListStore } from '@/store/project/project-list.store'

export function useProjectList() {
	const viewType = projectListStore(state => state.viewType)
	const setViewType = projectListStore(state => state.setViewType)

	return {
		viewType,
		setViewType
	}
}
