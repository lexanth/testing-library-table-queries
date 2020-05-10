export const getColspan = (cell: HTMLElement): number => {
  const colspanAttr = cell.attributes.getNamedItem('colspan')
  const colspanValue = colspanAttr ? colspanAttr.value : null
  return colspanValue ? parseInt(colspanValue, 10) : 1
}
