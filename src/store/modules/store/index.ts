import { defineStore } from 'pinia'
import type { Store } from './helper'
import { defaultSetting } from './helper'

export const useStore = defineStore('store', {
  state: (): Store => defaultSetting(),
  actions: {
    open() {
      this.showSettings = true
    },
    close() {
      this.showSettings = false
    },
  },
})
