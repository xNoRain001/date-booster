import canBeFolded from './fold-date/index'
import { monthMap, monthMapWithShorthand } from './get-month/index'
import { weekMap, weekMapWithShorthand } from './get-week/index'

class DateBooster {
  constructor () {}

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

  getMonth (date, shorthand = true) {
    if (shorthand) {
      return monthMapWithShorthand[new Date(date).getMonth()]
    } else {
      return monthMap[new Date(date).getMonth()]
    }
  }

  getWeek (date, shorthand = true) {
    if (shorthand) {
      return weekMapWithShorthand[new Date(date).getDay()]
    } else {
      return weekMap[new Date(date).getDay()]
    }
  }
}

export default DateBooster