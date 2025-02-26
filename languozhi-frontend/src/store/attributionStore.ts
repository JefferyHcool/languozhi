import { create } from 'zustand'

interface DrawerState {
  isOpen: boolean
  openDrawer: (item?: string | undefined) => void
  closeDrawer: () => void
  currentItem: string
}

export const useAttributionStore = create<DrawerState>(set => ({
  isOpen: false,
  currentItem: '',
  openDrawer: item => {
    set({ isOpen: true, currentItem: item || '' })
  },
  closeDrawer: () => set({ isOpen: false })
}))
