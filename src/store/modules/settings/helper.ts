import { ss } from '@/utils/storage'

const LOCAL_NAME = 'settingsStorage'

export interface SettingsState {
  id: number
  role: string
  description: string
  systemMessage: string
  temperature: number
  top_p: number
  logo: string
}

export function defaultSetting(): SettingsState {
  return {
    id: 1,
    role: 'ChatGpt',
    description: '您的人工智能助手',
    systemMessage: 'You are ChatGPT, a large language model trained by OpenAI. Follow the user\'s instructions carefully. Respond using markdown.',
    logo: 'https://ai.koudingtu.com/static/images/1.png',
    temperature: 0.8,
    top_p: 1,
  }
}

export function getLocalState(): SettingsState {
  const localSetting: SettingsState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: SettingsState): void {
  ss.set(LOCAL_NAME, setting)
}

export function removeLocalState() {
  ss.remove(LOCAL_NAME)
}
