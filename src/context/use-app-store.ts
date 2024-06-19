import { create } from 'zustand'

// Extend this store if you need!

export interface AppStore {
  fontsLoaded: boolean
  setFontsLoaded: (fontsLoaded: boolean) => void
  introSeen: boolean
  setIntroSeen: (introSeen: boolean) => void
  assetsLoaded: boolean
  setAssetsLoaded: (assetsLoaded: boolean) => void
}

export const useAppStore = create<AppStore>((set) => ({
  fontsLoaded: false,
  setFontsLoaded: (fontsLoaded: boolean) => set((s) => ({ ...s, fontsLoaded })),
  introSeen: false,
  setIntroSeen: (introSeen: boolean) => set((s) => ({ ...s, introSeen })),
  assetsLoaded: false,
  setAssetsLoaded: (assetsLoaded: boolean) =>
    set((s) => ({ ...s, assetsLoaded }))
}))
