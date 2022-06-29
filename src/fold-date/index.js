const canBeFolded = (prevGroupDate, date, rule) => {
  if (rule === 'year') {
    return date.getYear() === prevGroupDate.getYear()
  }
  else if (rule === 'month') {
    return date.getYear() === prevGroupDate.getYear() &&
      date.getMonth() === prevGroupDate.getMonth()
  }
  else if (rule === 'day') {
    return date.getYear() === prevGroupDate.getYear() &&
      date.getMonth() === prevGroupDate.getMonth() &&
      date.getDay() === prevGroupDate.getDay()
  }
  else if (rule === 'hour') {
    return date.getYear() === prevGroupDate.getYear() &&
      date.getMonth() === prevGroupDate.getMonth() &&
      date.getDay() === prevGroupDate.getDay() && 
      date.getHours() === prevGroupDate.getHours()
  }
}

export default canBeFolded