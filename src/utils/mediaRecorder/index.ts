import Recorder from 'recorder-core'
// 引入需要使用到的音频格式编码引擎的js文件
import 'recorder-core/src/engine/wav'
// 如果要绘制音频波形图，需要引入
import 'recorder-core/src/extensions/frequency.histogram.view'
import 'recorder-core/src/extensions/lib.fft'

class Media {
  private mediaRecorder: any | null = null
  private stream: MediaStream | null = null
  private blobData: Blob | null = null
  private wave: any = null

  // 检测是否有设备权限
  async checkUserPermission() {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      this.stream = newStream
      return true
    }
    catch (error) {
      console.error('无法获取用户媒体设备', error)
      return false
    }
  }

  // 请求用户录音授权
  async requestUserPermission() {
    try {
      if (!this.stream) {
        const newStream = await navigator.mediaDevices.getUserMedia({ audio: true })
        this.stream = newStream
      }
    }
    catch (error) {
      console.error('无法获取用户媒体设备', error)
      throw error
    }
  }

  // 开始录制
  startRecording(ele: string) {
    if (!this.stream) {
      console.error('未获得录音授权')
      return
    }
    this.blobData = null
    this.startMediaRecorder(ele)
  }

  // 启动媒体记录器
  startMediaRecorder(elem?: string) {
    if (!this.stream) {
      console.error('stream is null')
      return
    }
    this.mediaRecorder = Recorder({
      type: 'wav', // wav格式, 需要使用的type类型，需提前把格式支持文件加载进来
      bitRate: 36, // 比特率kbps，越大音质越好
      sampleRate: 18000, // 采样率hz，每秒音波震动次数，越大细节越丰富
      onProcess: (buffers: any, powerLevel: any, duration: any, sampleRate: any) => {
        // buffers, // [[Int16,...],...]：缓冲的PCM数据，为从开始录音到现在的所有pcm片段，每次回调可能增加0-n个不定量的pcm片段
        // powerLevel, // 输入的音频波动值0-100
        // duration, // 录音持续时间ms
        // sampleRate, // 录音使用的采样率
        // // 利用waveview扩展实时绘制波形
        this.wave.input(buffers[buffers.length - 1], powerLevel, sampleRate)
      }, // 录音实时回调，大约1秒调用12次回调
    })
    this.mediaRecorder.open(() => {
      this.mediaRecorder.start()
      // 渲染音频波形图
      // this.wave = elem ? Recorder.WaveSurferView({ elem }) : null
      this.wave = Recorder.FrequencyHistogramView({ elem, lineCount: 100, position: -1, fallDuration: 500, stripeEnable: false, linear: [0, 'rgba(161,220,149,1)', 0.5, 'rgba(161,220,149,1)', 1, 'rgba(161,220,149,1)'] })
    }, (msg: string, isUserNotAllow: boolean) => {
      // 浏览器不支持录音、用户拒绝麦克风权限、或者非安全环境（非https、file等
      console.error(`${isUserNotAllow ? 'UserNotAllow，' : ''}无法录音:${msg}`)
    })
  }

  // 停止录制
  async stopRecording() {
    if (!this.mediaRecorder)
      throw new Error('mediaRecorder is null')

    return new Promise((resolve: any, reject: any) => {
      this.mediaRecorder.stop((blob: Blob, duration: any) => {
        this.blobData = blob
        resolve(blob)
      }, (error: Error) => {
        reject(error)
      })
    })
  }

  // 播放录制
  playRecording(): void {
    const { url } = this.getAudioBlob()
    const audioElement = document.createElement('audio')
    audioElement.src = url
    audioElement.controls = true
    audioElement.autoplay = true // 添加 autoplay 属性
    audioElement.style.display = 'none'
    document.body.appendChild(audioElement)
  }

  getAudioBlob() {
    const url = this.blobData ? URL.createObjectURL(this.blobData) : ''
    return { blob: this.blobData, url }
  }
}

export default Media
