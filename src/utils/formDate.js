export function formatTime() {
  const date = new Date()
  const hour = date.getHours()
  const min = date.getMinutes()
  return hour + ':' + min
}

export function formatDate(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return year + "-" + month + "-" + day
}

export function formatMessage(date) {
  const year = date.substr(0, 4) * 1
  const nowdate = new Date()
  const nowyear = nowdate.getFullYear()
  if (year !== nowyear) return date.substr(0, 16)
  return date.substr(6, 10)
}

export function limitLiteral(literal) {
  if (literal.length < 19) {
    return literal
  } else {
    return literal.substr(0, 19) + '...'
  }

}