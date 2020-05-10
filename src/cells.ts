import { queryHelpers } from '@testing-library/dom'

function queryAllCells(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>('td,th'))
}

const getMultipleError = () => 'Found multiple cells'
const getMissingError = () => 'Found no cells'
const [
  queryCell,
  getAllCells,
  getCell,
  findAllCells,
  findCell
] = queryHelpers.buildQueries(queryAllCells, getMultipleError, getMissingError)
export {
  queryAllCells,
  queryCell,
  getAllCells,
  getCell,
  findAllCells,
  findCell
}
