import { getNodeText, getDefaultNormalizer } from '@testing-library/dom'

import { queryAllCells } from '../cells'
import { queryAllRowsByRowgroupType } from '../rowsByRowgroup'
import { getColspan } from './colspan'

export const getColumnIndexByHeaderText = (
  container: HTMLElement,
  textContent: string,
  headerRowIndex = 0
) => {
  const headerCellsByRow = queryAllRowsByRowgroupType(
    container,
    'thead'
  ).map((row) => queryAllCells(row))

  if (headerRowIndex > headerCellsByRow.length - 1) {
    return -1
  }

  const headerRowToUse = headerCellsByRow[headerRowIndex]

  const cellIndex = headerRowToUse.findIndex((cell) => {
    // TODO - allow normaliser to be overridden
    return getDefaultNormalizer()(getNodeText(cell)) === textContent
  })
  if (cellIndex === -1) {
    return -1
  }

  const precedingCells = headerRowToUse.slice(0, cellIndex)
  return precedingCells.reduce((acc, curr) => {
    return acc + getColspan(curr)
  }, 0)
}
