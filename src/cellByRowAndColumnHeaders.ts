import { queryHelpers } from '@testing-library/dom'
import { queryAllRowsByFirstCellText } from './rowByFirstCellText'
import { getColumnIndexByHeaderText } from './utils/columnIndexByHeaderText'
import { getCellInRowByIndex } from './utils/cellInRowByIndex'

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
  _c: HTMLElement,
  rowHeaderText: string,
  columnheaderText: string
) =>
  `Found multiple cells with ${rowHeaderText} in the first column and ${columnheaderText} in the header`
const getMissingError = (
  _c: HTMLElement,
  rowHeaderText: string,
  columnheaderText: string
) =>
  `Found no rows with ${rowHeaderText} in the first column and ${columnheaderText} in the header`

const [
  queryCellByRowAndColumnHeaders,
  getAllCellsByRowAndColumnHeaders,
  getCellByRowAndColumnHeaders,
  findAllCellsByRowAndColumnHeaders,
  findCellByRowAndColumnHeaders
] = queryHelpers.buildQueries<[string, string, number | undefined]>(
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
