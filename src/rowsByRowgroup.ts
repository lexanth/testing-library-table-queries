import { queryHelpers } from '@testing-library/dom'
import { RowGroup } from './types'

function queryAllRowsByRowgroupType(
  container: HTMLElement,
  rowgroupTagName: RowGroup
) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(`${rowgroupTagName} tr`)
  )
}

const getMultipleError = (_c: HTMLElement, rowgroupTagName: RowGroup) =>
  `Found multiple rows within ${rowgroupTagName} elements`
const getMissingError = (_c: HTMLElement, rowgroupTagName: RowGroup) =>
  `Found no rows within ${rowgroupTagName} elements`

const [
  queryRowByRowgroupType,
  getAllRowsByRowgroupType,
  getRowByRowgroupType,
  findAllRowsByRowgroupType,
  findRowByRowgroupType
] = queryHelpers.buildQueries(
  queryAllRowsByRowgroupType,
  getMultipleError,
  getMissingError
)
export {
  queryAllRowsByRowgroupType,
  queryRowByRowgroupType,
  getAllRowsByRowgroupType,
  getRowByRowgroupType,
  findAllRowsByRowgroupType,
  findRowByRowgroupType
}
