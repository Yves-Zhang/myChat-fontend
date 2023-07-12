import Cookies from 'cookiejs'

export function getCurrentDate() {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

export function setCrossSubdomainCookie(name: string, value: string, expires?: number) {
  const domainParts = window.location.hostname.split('.').reverse()
  const topLevelDomain = `${domainParts[1]}.${domainParts[0]}` // 获取顶级域名
  Cookies.set(name, value, { expires, domain: topLevelDomain, path: '/' })
}
