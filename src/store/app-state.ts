import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AppState = {
  locale: 'ru' | 'en'
  userId: string | null
  token: string | null
  updateUser: (token: string, userId: string) => void
  removeUser: () => void
  switchLocale: () => void
}

export const useAppStore = create<
  AppState,
  [['zustand/persist', AppState]]
>(
  persist(
    (set, get) => ({
      token: null,
      locale: 'en',
      userId: null,
      updateUser: (_token, _userId) =>
        set({ token: _token, userId: _userId }),
      removeUser: () => set({ token: null, userId: null }),
      switchLocale: () => {
        const currLocale = get().locale
        if (currLocale == 'en') set({ locale: 'ru' })
        else set({ locale: 'en' })
      },
    }),
    {
      name: 'app-storage',
    },
  ),
)
