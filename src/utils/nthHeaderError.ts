function ordinalSuffix(n: number) {
  const j = n % 10
  const k = n % 100
  if (j === 1 && k !== 11) {
    return n + 'st'
  }
  if (j === 2 && k !== 12) {
    return n + 'nd'
  }
  if (j === 3 && k !== 13) {
    return n + 'rd'
  }
  return n + 'th'
}

export function nthHeaderError(headerRowIndex: number) {
  return headerRowIndex === 0
    ? 'header'
    : `${ordinalSuffix(headerRowIndex + 1)} header`
}
