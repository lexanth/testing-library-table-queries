import { queryHelpers } from '@testing-library/dom'
import { queryAllRows } from './rows'
import { getColumnIndexByHeaderText } from './utils/columnIndexByHeaderText'
import { getCellInRowByIndex } from './utils/cellInRowByIndex'
import { nthHeaderError } from './utils/nthHeaderError'

function queryAllColumnCellsByHeaderText(
  container: HTMLElement,
  textContent: string,
  headerRowIndex = 0
) {
  const cellIndex = getColumnIndexByHeaderText(
    container,
    textContent,
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
  textContent: string,
  headerRowIndex = 0
) =>
  `Found multiple cells with ${textContent} in the ${nthHeaderError(
    headerRowIndex
  )}`
const getMissingError = (
  _c: Element | null,
  textContent: string,
  headerRowIndex = 0
) =>
  `Found no rows with ${textContent} in the ${nthHeaderError(headerRowIndex)}`

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
