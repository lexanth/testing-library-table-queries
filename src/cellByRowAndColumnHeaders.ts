import { queryHelpers } from '@testing-library/dom'
import { queryAllRowsByFirstCellText } from './rowByFirstCellText'
import { getColumnIndexByHeaderText } from './utils/columnIndexByHeaderText'
import { getCellInRowByIndex } from './utils/cellInRowByIndex'
import { nthHeaderError } from './utils/nthHeaderError'

function queryAllCellsByRowAndColumnHeaders(
  container: HTMLElement,
  rowHeaderText: string,
  columnheaderText: string,
  headerRowIndex = 0
) {
  const rows = queryAllRowsByFirstCellText(container, rowHeaderText)

  const columnIndex = getColumnIndexByHeaderText(
    container,
    columnheaderText,
    headerRowIndex
  )

  return rows
    .map((row) => getCellInRowByIndex(row, columnIndex))
    .filter((cell) => !!cell) as HTMLElement[]
}

const getMultipleError = (
  _c: Element | null,
  rowHeaderText: string,
  columnheaderText: string,
  headerRowIndex = 0
) =>
  `Found multiple cells with ${rowHeaderText} in the first column and ${columnheaderText} in the ${nthHeaderError(
    headerRowIndex
  )}`
const getMissingError = (
  _c: Element | null,
  rowHeaderText: string,
  columnheaderText: string,
  headerRowIndex = 0
) =>
  `Found no rows with ${rowHeaderText} in the first column and ${columnheaderText} in the ${nthHeaderError(
    headerRowIndex
  )}`

const [
  queryCellByRowAndColumnHeaders,
  getAllCellsByRowAndColumnHeaders,
  getCellByRowAndColumnHeaders,
  findAllCellsByRowAndColumnHeaders,
  findCellByRowAndColumnHeaders
] = queryHelpers.buildQueries(
  queryAllCellsByRowAndColumnHeaders,
  getMultipleError,
  getMissingError
)
export {
  queryAllCellsByRowAndColumnHeaders,
  queryCellByRowAndColumnHeaders,
  getAllCellsByRowAndColumnHeaders,
  getCellByRowAndColumnHeaders,
  findAllCellsByRowAndColumnHeaders,
  findCellByRowAndColumnHeaders
}
