import { queryAllCells } from '../cells'
import { getColspan } from './colspan'

type Maybe<T> = T | null
type Accumulator = { cell: Maybe<HTMLElement> | null; precedingColspan: number }

export const getCellInRowByIndex = (row: HTMLElement, index: number) => {
  const cells = queryAllCells(row)

  const result = cells.reduce(
    (acc: Accumulator, curr) => {
      if (acc.precedingColspan > index) {
        return acc
      }
      const newColspan = acc.precedingColspan + getColspan(curr)
      return {
        cell: newColspan >= index ? curr : null,
        precedingColspan: newColspan
      }
    },
    { cell: null, precedingColspan: 0 }
  )
  return result.cell
}
