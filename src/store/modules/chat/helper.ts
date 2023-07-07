import { ss } from '@/utils/storage'

const LOCAL_NAME = 'chatStorage'

const defaultRole = ss.get('settingsStorage')
export function defaultState(): Chat.ChatState {
  const uuid = 1002
  return {
    active: uuid,
    usingContext: true,
    history: [{ uuid, title: 'New Chat', isEdit: false, role: defaultRole }],
    chat: [{ uuid, data: [] }],
    role: defaultRole,
  }
}

export function getLocalState(): Chat.ChatState {
  const localState = ss.get(LOCAL_NAME)
  return { ...defaultState(), ...localState }
}

export function setLocalState(state: Chat.ChatState) {
  ss.set(LOCAL_NAME, state)
}
