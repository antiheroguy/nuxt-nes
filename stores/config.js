import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => {
    return {
      volume: 50,
      size: 2,
      speed: 10,
      pad1: {
        UP: 'ArrowUp',
        DOWN: 'ArrowDown',
        LEFT: 'ArrowLeft',
        RIGHT: 'ArrowRight',
        A: 'Numpad2',
        B: 'Numpad1',
        C: 'Numpad5',
        D: 'Numpad4',
        SELECT: 'Space',
        START: 'Enter'
      },
      pad2: {
        UP: 'KeyW',
        DOWN: 'KeyS',
        LEFT: 'KeyA',
        RIGHT: 'KeyD',
        A: 'KeyK',
        B: 'KeyJ',
        C: 'KeyI',
        D: 'KeyU',
        SELECT: 'KeyO',
        START: 'KeyP'
      }
    }
  },
  getters: {
    width: (state) => state.size * 256,
    height: (state) => state.size * 240,
  },
  persist: {
    storage: localStorage,
  }
})