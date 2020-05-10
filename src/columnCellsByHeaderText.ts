import { queryHelpers } from '@testing-library/dom'
import { queryAllRows } from './rows'
import { getColumnIndexByHeaderText } from './utils/columnIndexByHeaderText'
import { getCellInRowByIndex } from './utils/cellInRowByIndex'

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

const getMultipleError = (_c: HTMLElement, textContent: string) =>
  `Found multiple cells with ${textContent} in the header`
const getMissingError = (_c: HTMLElement, textContent: string) =>
  `Found no rows with ${textContent} in the header`

const [
  queryColumnCellByHeaderText,
  getAllColumnCellsByHeaderText,
  getColumnCellByHeaderText,
  findAllColumnCellsByHeaderText,
  findColumnCellByHeaderText
] = queryHelpers.buildQueries<[string, number | undefined]>(
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
