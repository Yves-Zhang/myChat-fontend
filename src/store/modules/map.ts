import Cookies from 'cookiejs'

const cookies = Cookies.all()
const { userInfo = '{}' } = cookies

export const LOCAL_NAME = `chatStorage-${JSON.parse(userInfo).name}`
export const LOCAL_SETTING = `settingStorage-${JSON.parse(userInfo).name}`
export const LOCAL_APP = `appSetting-${JSON.parse(userInfo).name}`
