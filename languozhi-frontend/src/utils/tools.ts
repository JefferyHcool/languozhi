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
