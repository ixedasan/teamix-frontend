import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { TypeBaseColor } from '@/constants/colors.constants'

export interface ConfigStore {
	theme: TypeBaseColor
	setTheme: (theme: TypeBaseColor) => void
}

export const configStore = create(
	persist<ConfigStore>(
		set => ({
			theme: 'default',
			setTheme: (theme: TypeBaseColor) => set({ theme })
		}),
		{
			name: 'config',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
