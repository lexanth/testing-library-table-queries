import { getDefaultNormalizer } from '@testing-library/dom'

import { queryAllCells } from '../cells'
import { queryAllRowsByRowgroupType } from '../rowsByRowgroup'
import { getColspan } from './colspan'

export const getColumnIndexByHeaderText = (
  container: HTMLElement,
  textQuery: string | RegExp,
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
    const cellNormalizedTextContent = getDefaultNormalizer()(
      cell.textContent || ''
    )

    if (typeof textQuery === 'string') {
      return cellNormalizedTextContent === textQuery
    }

    return textQuery.test(cellNormalizedTextContent)
  })

  if (cellIndex === -1) {
    return -1
  }

  const precedingCells = headerRowToUse.slice(0, cellIndex)
  return precedingCells.reduce((acc, curr) => {
    return acc + getColspan(curr)
  }, 0)
}
