class Media {
  private mediaRecorder: MediaRecorder | null = null
  private recordedChunks: Blob[] = []
  private stream: MediaStream | null = null
  // private keydownFlag = false

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
  startRecording() {
    if (!this.stream) {
      console.error('未获得录音授权')
      return
    }

    this.recordedChunks = []
    this.startMediaRecorder()
  }

  // 启动媒体记录器
  startMediaRecorder() {
    if (!this.stream) {
      console.error('stream is null')
      return
    }

    this.mediaRecorder = new MediaRecorder(this.stream)

    this.mediaRecorder.addEventListener('dataavailable', (event: BlobEvent) => {
      this.recordedChunks.push(event.data)
    })

    this.mediaRecorder.start()
  }

  // 停止录制
  stopRecording() {
    if (!this.mediaRecorder) {
      console.error('mediaRecorder is null')
      return
    }

    this.mediaRecorder.stop()
  }

  // 播放录制
  playRecording() {
    const { url } = this.getAudioBlob()
    const audioElement = document.createElement('audio')
    audioElement.src = url
    audioElement.controls = true
    audioElement.autoplay = true // 添加 autoplay 属性
    audioElement.style.display = 'none'
    document.body.appendChild(audioElement)
  }

  getAudioBlob() {
    const blob = new Blob(this.recordedChunks, { type: 'audio/webm' })
    const url = URL.createObjectURL(blob)
    return { blob, url }
  }
}

export default Media
