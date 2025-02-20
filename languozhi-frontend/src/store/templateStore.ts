import { create } from 'zustand'
import { generateName, generatePaperName } from '@/utils/template'
import { nanoid } from 'nanoid' // 生成唯一 ID
import { persist, createJSONStorage } from 'zustand/middleware'

interface TemplateState {
  template: GenerationTemplate | null
  templates: GenerationTemplate[] // 存储已保存模板
  createTemplate: () => void
  isExist: (id: string) => boolean
  setTemplate: (newTemplate: GenerationTemplate) => void
  updateTemplate: (updates: Partial<GenerationTemplate>) => void
  saveTemplate: () => void
  loadTemplateById: (id: string) => void
}

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set, get) => ({
      template: null,
      templates: [],

      // 生成一个新的模板
      createTemplate: () => {
        const newTemplate: GenerationTemplate = {
          id: nanoid(), // 生成唯一 ID
          templateName: generateName(),
          baseInfo: { title: generatePaperName() },
          questionConfig: { type: [], difficulty: '' },
          globalConfig: { model: 'DeepSeek-V2.5' }
        }
        set({ template: newTemplate })
      },

      // 直接设置模板
      setTemplate: newTemplate => {
        set({ template: newTemplate })
      },

      // 局部更新当前模板
      updateTemplate: updates => {
        set(state => ({
          template: state.template ? { ...state.template, ...updates } : null
        }))
      },

      // 保存当前模板到列表
      saveTemplate: () => {
        set(state => {
          if (!state.template) return {}
          const res = state.templates.find(t => t.id === state.template?.id)
          if (res) {
            return {
              templates: state.templates.map(t => (t.id === state.template?.id ? { ...t, ...state.template } : t))
            }
          }
          return {
            templates: [...state.templates, state.template]
          }
        })
      },

      isExist: (id: string) => {
        return get().templates.some(t => t.id === id)
      },

      // 根据 ID 加载模板
      loadTemplateById: id => {
        const foundTemplate = get().templates.find(t => t.id === id)
        if (foundTemplate) {
          set({ template: foundTemplate })
        }
      }
    }),
    {
      name: 'template-storage', // 存储的 key
      storage: createJSONStorage(() => localStorage), // 使用 localStorage 持久化
      partialize: state => ({ templates: state.templates, template: state.template }) // 仅持久化 templates
    }
  )
)
