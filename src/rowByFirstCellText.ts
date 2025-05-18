import { queryHelpers, getDefaultNormalizer } from '@testing-library/dom'
import { queryAllRows } from './rows'
import { queryAllCells } from './cells'

function queryAllRowsByFirstCellText(
  container: HTMLElement,
  textQuery: string | RegExp,
) {
  const rows = queryAllRows(container)
  return rows.filter((row) => {
    const cellsInRow = queryAllCells(row)
    if (cellsInRow.length === 0) {
      return false
    }

    const cellNormalizedTextContent = getDefaultNormalizer()(cellsInRow[0].textContent || '');

    if (typeof textQuery === 'string') {
      return cellNormalizedTextContent === textQuery
    }

    return textQuery.test(cellNormalizedTextContent)
  })
}

const getMultipleError = (_c: Element | null, textQuery: string | RegExp) => {
  if (typeof textQuery === 'string') {
    return `Found multiple rows with ${textQuery} in the first cell`
  }
  return `Found multiple rows matching ${textQuery} in the first cell`
}
  
const getMissingError = (_c: Element | null, textQuery: string | RegExp) => {
  if (typeof textQuery === 'string') {
    return `Found no rows with ${textQuery} in the first cell`
  }
  return `Found no rows matching ${textQuery} in the first cell`
}

const [
  queryRowByFirstCellText,
  getAllRowsByFirstCellText,
  getRowByFirstCellText,
  findAllRowsByFirstCellText,
  findRowByFirstCellText
] = queryHelpers.buildQueries<[string | RegExp]>(
  queryAllRowsByFirstCellText,
  getMultipleError,
  getMissingError
)
export {
  queryAllRowsByFirstCellText,
  queryRowByFirstCellText,
  getAllRowsByFirstCellText,
  getRowByFirstCellText,
  findAllRowsByFirstCellText,
  findRowByFirstCellText
}
