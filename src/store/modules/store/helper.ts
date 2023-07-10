export interface Store {
  showSettings: boolean
}

export function defaultSetting(): Store {
  return {
    showSettings: false,
  }
}
