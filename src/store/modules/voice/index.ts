import { defineStore } from 'pinia'
import Media from '@/utils/mediaRecorder'

interface VoiceStoreProps {
  voiceHandler: Media
}

export const useVoiceStore = defineStore('voice-store', {
  state: (): VoiceStoreProps => ({
    voiceHandler: new Media(),
  }),
  actions: {
    // 权限检测
    async checkUserPermission() {
      return await this.voiceHandler.checkUserPermission()
    },
    // 获取设备权限
    async requestUserPermission() {
      return await this.voiceHandler.requestUserPermission()
    },
    // 开始录制
    startRecording() {
      this.voiceHandler.startRecording()
    },
    // 停止录制
    stopRecording() {
      this.voiceHandler.stopRecording()
    },
    // 播放音频
    playRecording() {
      this.voiceHandler.playRecording()
    },
    // 获取音频blob和url
    getAudioBlob() {
      this.voiceHandler.getAudioBlob()
    },
  },
})
