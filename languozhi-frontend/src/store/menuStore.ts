import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface MenuState {
  collapsed: boolean
  toggleMenu: () => void
}

export const useMenuStore = create<MenuState>()(
  persist(
    set => ({
      collapsed: false,
      toggleMenu: () => set(state => ({ collapsed: !state.collapsed }))
    }),
    {
      name: 'menu-storage', // 存储的 key
      storage: createJSONStorage(() => localStorage) // 使用 localStorage 持久化
    }
  )
)
