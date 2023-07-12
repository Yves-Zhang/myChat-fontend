import { defineStore } from 'pinia'
import Cookies from 'cookiejs'
import type { UserInfo, UserState } from './helper'
import { defaultSetting, getLocalState, setLocalState } from './helper'
import { fetchSignOut } from '@/api'

const userInfo: any = Cookies.get('userInfo')

export const useUserStore = defineStore('user-store', {
  state: (): UserState => {
    return {
      userInfo: {
        ...getLocalState().userInfo,
        ...JSON.parse(userInfo),
      },
    }
  },
  actions: {
    updateUserInfo(userInfo: Partial<UserInfo>) {
      this.userInfo = { ...this.userInfo, ...userInfo }
      this.recordState()
    },

    resetUserInfo() {
      this.userInfo = { ...defaultSetting().userInfo }
      this.recordState()
    },

    recordState() {
      Cookies.set('userInfo', JSON.stringify(this.userInfo))
      setLocalState(this.$state)
    },

    exitCurrentUser(cb?: () => void) {
      fetchSignOut().then(() => {
        this.resetUserInfo()
        window.location.href = 'https://ai.koudingtu.com/webapp/authPage/#/'
        cb?.()
      })
    },
  },
})
