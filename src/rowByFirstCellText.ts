import {
  queryHelpers,
  getNodeText,
  getDefaultNormalizer
} from '@testing-library/dom'
import { queryAllRows } from './rows'
import { queryAllCells } from './cells'

function queryAllRowsByFirstCellText(
  container: HTMLElement,
  textContent: string
) {
  const rows = queryAllRows(container)
  return rows.filter((row) => {
    const cellsInRow = queryAllCells(row)
    if (cellsInRow.length === 0) {
      return false
    }

    // TODO - make normaliser customisable, support textmatch
    return getDefaultNormalizer()(getNodeText(cellsInRow[0])) === textContent
  })
}

const getMultipleError = (_c: HTMLElement, textContent: string) =>
  `Found multiple rows with ${textContent} in the first cell`
const getMissingError = (_c: HTMLElement, textContent: string) =>
  `Found no rows with ${textContent} in the first cell`

const [
  queryRowByFirstCellText,
  getAllRowsByFirstCellText,
  getRowByFirstCellText,
  findAllRowsByFirstCellText,
  findRowByFirstCellText
] = queryHelpers.buildQueries(
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
