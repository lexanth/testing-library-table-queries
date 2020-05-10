import { queryHelpers } from '@testing-library/dom'

function queryAllRows(container: HTMLElement) {
  return Array.from(container.querySelectorAll('tr'))
}

const getMultipleError = () => 'Found multiple rows'
const getMissingError = () => 'Found no rows'
const [
  queryRow,
  getAllRows,
  getRow,
  findAllRows,
  findRow
] = queryHelpers.buildQueries(queryAllRows, getMultipleError, getMissingError)
export { queryAllRows, queryRow, getAllRows, getRow, findAllRows, findRow }
