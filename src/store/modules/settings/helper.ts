import { ss } from '@/utils/storage'
import defaultRole from '@/assets/defaultRole.json'
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
    ...defaultRole,
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
