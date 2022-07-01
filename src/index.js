import canBeFolded from './fold-date/index'
import { monthMap, monthMapWithShorthand } from './get-month/index'
import { weekMap, weekMapWithShorthand } from './get-week/index'
import { getTime, addZero } from './utils/index'

class DateBooster {
  constructor (timeZone) {
    // ...
  }

  /*
   * 将属于同一时间范围的数据折叠到一起。
   *
   * @param {array=[]} data 待处理的数据，数组的每一项是对象，对象中通过 date 属性标识时间
   * @param {string='day'} rule 折叠方式，可选值有 hour | day | month | year
   * @param {boolean=true} descending 时间降序排列
   * @return {array} 处理后的数据
   */
  foldDate (data = [], rule = 'day', descending = true) {
    if (descending) {
      data.sort((a, b) => b.date.getTime() - a.date.getTime())
    } else {
      data.sort((a, b) => a.date.getTime() - b.date.getTime())
    }

    const foldedDate = []
    foldedDate.push([data[0]])

    let prevGroupIndex = 0
    
    for (let i = 1, l = data.length; i < l; i++) {
      const item = data[i]

      if (canBeFolded(foldedDate[prevGroupIndex][0].date, item.date, rule)) {
        foldedDate[prevGroupIndex].push(item)
      } else {
        prevGroupIndex++
        foldedDate.push([item])
      }
    }

    return foldedDate
  }

  /*
   * 获取当前日期的月份
   * 
   * @param {date} data
   * @param {boolean=true} shorthand 是否简写
   * @return {string} 当前日期的月份
   */
  getMonth (date, shorthand = true) {
    if (shorthand) {
      return monthMapWithShorthand[new Date(date).getMonth()]
    } else {
      return monthMap[new Date(date).getMonth()]
    }
  }

  /*
   * 获取当前日期的星期
   * 
   * @param {date} data
   * @param {boolean=true} shorthand 是否简写
   * @return {string} 当前日期的星期
   */
  getWeek (date, shorthand = true) {
    if (shorthand) {
      return weekMapWithShorthand[new Date(date).getDay()]
    } else {
      return weekMap[new Date(date).getDay()]
    }
  }

  /*
   * 计算两个日期间的时间差
   *
   * @param {string|Date} date1 开始时间
   * @param {string|Date} date2 结束时间
   * @param {string} format 时间差值的单位 s（秒） | m（分） | h（时） | d（天）
   * @return {number} 时间差值
   */
  getTimeDiff (date1, date2, format = 's') {
    format = format.toLowerCase()
    const diff = getTime(date2) - getTime(date1)

    if (format === 's') {
      return Math.floor(diff / 1000)
    }
    else if (format === 'm') {
      return Math.floor(diff / (1000 * 60))
    }
    else if (format === 'h') {
      return Math.floor(diff / (1000 * 60 * 60))
    }
    else if (format === 'd') {
      return Math.floor(diff / (1000 * 60 * 60 * 24))
    }
  }

  /*
   * 倒计时
   *
   * @param {HTMLElement} 显示倒计时的元素
   * @param {string|Date} 倒计时为0的时刻
   */
  countdown (elm, date) {
    if (this.getTimeDiff(Date.now(), date) <= 0) {
      throw new Error('invalid date.')
    }

    let h = this.getTimeDiff(Date.now(), date, 'h')
    let m = this.getTimeDiff(Date.now(), date, 'm') - h * 60
    let s = this.getTimeDiff(Date.now(), date, 's') - h * 60 * 60 - m * 60

    elm.innerText = `${ addZero(h, 2) }:${ addZero(m, 2) }:${ addZero(s, 2) }`

    return (() => {
      const timeout = setInterval(() => {
        if (s === 0) {
          if (m === 0) {
            clearInterval(timeout)
            return
          } else {
            s = 60
            m--

            if (m === 0) {
              if (h > 0) {
                m = 59
                h--
              }
            }
          }
        }
     
        s -= 1
        elm.innerText = `${ addZero(h, 2) }:${ addZero(m, 2) }:${ addZero(s, 2) }`
      }, 1000)
    })()
  }
}

export default DateBooster