/**
 * 全屏
 */
export const setFullScreen = () => {
  const element = document.documentElement
  // 判断是否已经是全屏
  // 如果是全屏，退出
  if (document.fullscreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
      // @ts-ignore
    } else if (document.webkitCancelFullScreen) {
      // @ts-ignore
      document.webkitCancelFullScreen()
      // @ts-ignore
    } else if (document.mozCancelFullScreen) {
      // @ts-ignore
      document.mozCancelFullScreen()
      // @ts-ignore
    } else if (document.msExitFullscreen) {
      // @ts-ignore
      document.msExitFullscreen()
    }
    return false
  }
  // 否则，进入全屏
  if (element.requestFullscreen) {
    element.requestFullscreen()
    // @ts-ignore
  } else if (element.webkitRequestFullScreen) {
    // @ts-ignore
    element.webkitRequestFullScreen()
    // @ts-ignore
  } else if (element.mozRequestFullScreen) {
    // @ts-ignore
    element.mozRequestFullScreen()
    // @ts-ignore
  } else if (element.msRequestFullscreen) {
    // @ts-ignore
    element.msRequestFullscreen()
  }
  return true
}

/**
 * 千分位显示
 * @param number
 * @returns
 */
export const formatNumberWithCommas = (number: string) => {
  const parts = number.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

// 时间格式化
export const timeFromDate = (date: { toTimeString: () => string | any[] }) => date.toTimeString().slice(0, 8)
export function secondsToDHMS(seconds: number, precision: 'year' | 'day' | 'hour' | 'minute' | 'second'): string {
  // 定义时间单位
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const years = Math.floor(days / 365)

  // 计算剩余的时间
  const remainingSeconds = seconds % 60
  const remainingMinutes = minutes % 60
  const remainingHours = hours % 24
  const remainingDays = days % 365
  if (precision === 'year') {
    return `${years}年 ${remainingDays}天 ${remainingHours}小时 ${remainingMinutes}分钟 ${remainingSeconds}秒`
  }
  if (precision === 'day') {
    return `${days}天 ${remainingHours}小时 ${remainingMinutes}分钟 ${remainingSeconds}秒`
  }
  if (precision === 'hour') {
    return `${hours}小时 ${remainingMinutes}分钟 ${remainingSeconds}秒`
  }
  if (precision === 'minute') {
    return `${remainingMinutes}分钟 ${remainingSeconds}秒`
  }
  if (precision === 'second') {
    return `${remainingSeconds}秒`
  }
  return `${remainingSeconds}秒`
  // 返回格式化后的字符串
}
export function millisecondsToDHMS(milliseconds: number): string {
  // 定义时间单位
  const seconds = Math.floor(milliseconds / 1000) // 总秒数
  const minutes = Math.floor(seconds / 60) // 总分钟数
  const hours = Math.floor(minutes / 60) // 总小时数
  const days = Math.floor(hours / 24) // 总天数
  const years = Math.floor(days / 365) // 总年数

  // 计算剩余的时间
  const remainingMilliseconds = milliseconds % 1000 // 剩余的毫秒
  const remainingSeconds = seconds % 60 // 剩余的秒
  const remainingMinutes = minutes % 60 // 剩余的分钟
  const remainingHours = hours % 24 // 剩余的小时
  const remainingDays = days % 365 // 剩余的天数

  // 返回格式化后的字符串
  return `${years}年 ${remainingDays}天 ${remainingHours}小时 ${remainingMinutes}分钟 ${remainingSeconds}秒 ${remainingMilliseconds}毫秒`
}
