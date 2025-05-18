import { queryHelpers } from '@testing-library/dom'
import { queryAllRows } from './rows'
import { getColumnIndexByHeaderText } from './utils/columnIndexByHeaderText'
import { getCellInRowByIndex } from './utils/cellInRowByIndex'
import { nthHeaderError } from './utils/nthHeaderError'
import { stringOrRegexError } from './utils/stringOrRegexError'

function queryAllColumnCellsByHeaderText(
  container: HTMLElement,
  textQuery: string | RegExp,
  headerRowIndex = 0
) {
  const cellIndex = getColumnIndexByHeaderText(
    container,
    textQuery,
    headerRowIndex
  )

  return queryAllRows(container)
    .map((row) => {
      return getCellInRowByIndex(row, cellIndex)
    })
    .filter((cell) => !!cell) as HTMLElement[]
}

const getMultipleError = (
  _c: Element | null,
  textQuery: string | RegExp,
  headerRowIndex = 0
) =>
  `Found mutiple cells ${stringOrRegexError(textQuery)} in the ${nthHeaderError(
    headerRowIndex
  )}`

const getMissingError = (
  _c: Element | null,
  textQuery: string | RegExp,
  headerRowIndex = 0
) =>
  `Found no rows ${stringOrRegexError(textQuery)} in the ${nthHeaderError(
    headerRowIndex
  )}`

const [
  queryColumnCellByHeaderText,
  getAllColumnCellsByHeaderText,
  getColumnCellByHeaderText,
  findAllColumnCellsByHeaderText,
  findColumnCellByHeaderText
] = queryHelpers.buildQueries(
  queryAllColumnCellsByHeaderText,
  getMultipleError,
  getMissingError
)
export {
  queryAllColumnCellsByHeaderText,
  queryColumnCellByHeaderText,
  getAllColumnCellsByHeaderText,
  getColumnCellByHeaderText,
  findAllColumnCellsByHeaderText,
  findColumnCellByHeaderText
}
