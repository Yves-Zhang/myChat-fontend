import { defineStore } from 'pinia'
import Cookies from 'cookiejs'
import type { UserInfo, UserState } from './helper'
import { defaultSetting, getLocalState, setLocalState } from './helper'
import { fetchSignOut } from '@/api'
import { setCrossSubdomainCookie } from '@/utils/functions'

// 获取koudingtu.com域名下的所有cookie
const cookies = Cookies.all()
const { userInfo } = cookies

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
      setCrossSubdomainCookie('userInfo', JSON.stringify(this.userInfo))
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
