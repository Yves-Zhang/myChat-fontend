import { LOCAL_NAME, LOCAL_SETTING } from '../map'
import { ss } from '@/utils/storage'
import defaultRole from '@/assets/defaultRole.json'

const _defaultRole = ss.get(LOCAL_SETTING) || defaultRole
export function defaultState(): Chat.ChatState {
  const uuid = 1002
  return {
    active: uuid,
    usingContext: true,
    history: [{ uuid, title: 'New Chat', isEdit: false, role: _defaultRole }],
    chat: [{ uuid, data: [] }],
    role: _defaultRole,
  }
}

export function getLocalState(): Chat.ChatState {
  const localState = ss.get(LOCAL_NAME)
  return { ...defaultState(), ...localState }
}

export function setLocalState(state: Chat.ChatState) {
  ss.set(LOCAL_NAME, state)
}
