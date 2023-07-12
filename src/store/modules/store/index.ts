import { defineStore } from 'pinia'
import type { SettingsState } from '../settings/helper'
import { useChatStore } from '../chat'
import { LOCAL_SETTING } from '../map'
import type { Store } from './helper'
import { defaultSetting } from './helper'
import { ss } from '@/utils/storage'

export const useStore = defineStore('store', {
  state: (): Store => defaultSetting(),
  actions: {
    open() {
      this.showSettings = true
    },
    close() {
      this.showSettings = false
      const localSetting: SettingsState | undefined = ss.get(LOCAL_SETTING)
      const chatStore = useChatStore()
      // 判断当前的聊天角色是否是设置的聊天角色
      // 是就不做操作
      // 不是就切换到设置的聊天角色
      if (chatStore.role.id !== localSetting?.id)
        chatStore.addHistory({ title: 'New Chat', uuid: Date.now(), isEdit: false })
    },
  },

})
