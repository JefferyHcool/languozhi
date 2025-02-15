import { create } from 'zustand'

interface MenuState {
  collapsed: boolean
  toggleMenu: () => void
}

export const useMenuStore = create<MenuState>(set => ({
  collapsed: false,
  toggleMenu: () => set(state => ({ collapsed: !state.collapsed }))
}))
