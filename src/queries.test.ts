import { render } from './__testsupport__/render'
import * as queries from './'
import { simpleTable } from './__fixtures__/simpleTable'
import { colspanTable } from './__fixtures__/colspanTable'

describe('queries', () => {
  it('should return null for empty queries', () => {
    const container = render('<div />')
    expect(queries.queryRow(container)).toBeNull()
    expect(queries.queryCell(container)).toBeNull()
    expect(
      queries.queryCellByRowAndColumnHeaders(container, 'A', 'B')
    ).toBeNull()
    expect(queries.queryColumnCellByHeaderText(container, 'A')).toBeNull()
    expect(queries.queryRowByFirstCellText(container, 'A')).toBeNull()
    expect(queries.queryByRowgroupType(container, 'thead')).toBeNull()
    expect(queries.queryRowByRowgroupType(container, 'thead')).toBeNull()
  })

  it('should return an empty array for no matches for queryAll', () => {
    const container = render('<div />')
    expect(queries.queryAllRows(container)).toHaveLength(0)
    expect(queries.queryAllCells(container)).toHaveLength(0)
    expect(
      queries.queryAllCellsByRowAndColumnHeaders(container, 'A', 'B')
    ).toHaveLength(0)
    expect(
      queries.queryAllColumnCellsByHeaderText(container, 'A')
    ).toHaveLength(0)
    expect(queries.queryAllRowsByFirstCellText(container, 'A')).toHaveLength(0)
    expect(queries.queryAllByRowgroupType(container, 'thead')).toHaveLength(0)
    expect(queries.queryAllRowsByRowgroupType(container, 'thead')).toHaveLength(
      0
    )
  })

  it('should throw useful error messages for no item found', () => {
    const container = render('<div />')

    expect(() => queries.getRow(container)).toThrowErrorMatchingInlineSnapshot(`
"Found no rows

[36m<div>[39m
  [36m<div />[39m
[36m</div>[39m"
`)
    expect(() => queries.getCell(container))
      .toThrowErrorMatchingInlineSnapshot(`
"Found no cells

[36m<div>[39m
  [36m<div />[39m
[36m</div>[39m"
`)
    expect(() => queries.getCellByRowAndColumnHeaders(container, 'A', 'B'))
      .toThrowErrorMatchingInlineSnapshot(`
"Found no rows with A in the first column and B in the header

[36m<div>[39m
  [36m<div />[39m
[36m</div>[39m"
`)
    expect(() => queries.getColumnCellByHeaderText(container, 'A'))
      .toThrowErrorMatchingInlineSnapshot(`
"Found no rows with A in the header

[36m<div>[39m
  [36m<div />[39m
[36m</div>[39m"
`)
    expect(() => queries.getRowByFirstCellText(container, 'A'))
      .toThrowErrorMatchingInlineSnapshot(`
"Found no rows with A in the first cell

[36m<div>[39m
  [36m<div />[39m
[36m</div>[39m"
`)
    expect(() => queries.getByRowgroupType(container, 'thead'))
      .toThrowErrorMatchingInlineSnapshot(`
"Found no thead elements

[36m<div>[39m
  [36m<div />[39m
[36m</div>[39m"
`)
    expect(() => queries.getRowByRowgroupType(container, 'thead'))
      .toThrowErrorMatchingInlineSnapshot(`
"Found no rows within thead elements

[36m<div>[39m
  [36m<div />[39m
[36m</div>[39m"
`)
  })

  it('should find cells', () => {
    const container = render(simpleTable)
    expect(queries.getAllCells(container)).toHaveLength(48)
  })

  it('should find cells by row and column headings', () => {
    const container = render(simpleTable)
    expect(
      queries.getCellByRowAndColumnHeaders(container, 'trouble', 'Status').id
    ).toEqual('body-cell-29')
    expect(
      queries.getCellByRowAndColumnHeaders(container, 'reason', 'Age').id
    ).toEqual('body-cell-21')
    expect(
      queries.queryCellByRowAndColumnHeaders(container, 'NOT A ROW', 'Status')
    ).toBeNull()
    expect(
      queries.queryCellByRowAndColumnHeaders(
        container,
        'trouble',
        'Not a column'
      )
    ).toBeNull()
  })

  it('should find column cells by header text', () => {
    const container = render(simpleTable)
    expect(
      queries.queryAllColumnCellsByHeaderText(container, 'NOT A COLUMN')
    ).toHaveLength(0)
    const ageCells = queries.getAllColumnCellsByHeaderText(container, 'Age')
    expect(ageCells).toHaveLength(8)
    expect(ageCells.map((cell) => cell.id)).toEqual([
      'header-cell-3',
      'body-cell-3',
      'body-cell-9',
      'body-cell-15',
      'body-cell-21',
      'body-cell-27',
      'body-cell-33',
      'body-cell-39'
    ])
    const statusCells = queries.getAllColumnCellsByHeaderText(
      container,
      'Status'
    )
    expect(statusCells).toHaveLength(8)
    expect(statusCells.map((cell) => cell.id)).toEqual([
      'header-cell-5',
      'body-cell-5',
      'body-cell-11',
      'body-cell-17',
      'body-cell-23',
      'body-cell-29',
      'body-cell-35',
      'body-cell-41'
    ])
  })

  it('should find rows by the first cell text', () => {
    const container = render(simpleTable)
    expect(
      queries.queryAllRowsByFirstCellText(container, 'NOT A ROW')
    ).toHaveLength(0)
    expect(queries.getAllRowsByFirstCellText(container, 'reason')).toHaveLength(
      1
    )
    expect(queries.getRowByFirstCellText(container, 'reason').id).toEqual(
      'body-row-4'
    )
    expect(queries.getRowByFirstCellText(container, 'First Name').id).toEqual(
      'header-row'
    )
    expect(queries.getRowByFirstCellText(container, 'midnight').id).toEqual(
      'body-row-2'
    )
  })

  it('should find rowgroups', () => {
    const container = render(simpleTable)
    expect(queries.queryAllByRowgroupType(container, 'thead')).toHaveLength(1)
    expect(queries.getByRowgroupType(container, 'thead').id).toEqual('header')
    expect(queries.queryAllByRowgroupType(container, 'tbody')).toHaveLength(1)
    expect(queries.getByRowgroupType(container, 'tbody').id).toEqual('body')
    expect(queries.queryAllByRowgroupType(container, 'tfoot')).toHaveLength(0)
  })

  it('should find rows', () => {
    const container = render(simpleTable)
    expect(queries.getAllRows(container)).toHaveLength(8)
  })

  it('should find rows by rowgroup', () => {
    const container = render(simpleTable)
    expect(queries.getRowByRowgroupType(container, 'thead').id).toEqual(
      'header-row'
    )
    expect(queries.getAllRowsByRowgroupType(container, 'tbody')).toHaveLength(7)
  })

  it('should handle tables with cells spanning multiple columns', () => {
    const container = render(colspanTable)

    const statusColumnCells = queries.getAllColumnCellsByHeaderText(
      container,
      'Status',
      1
    )
    const expectedColumnIds = [
      'header-cell-2',
      'header-cell-7',
      'body-cell-5',
      'body-cell-11',
      'body-cell-17',
      'body-cell-23',
      'body-cell-29',
      'body-cell-35',
      'body-cell-41'
    ]
    expectedColumnIds.forEach((text, index) => {
      expect(statusColumnCells[index].id).toEqual(text)
    })
    const midnightLastNameCell = queries.getCellByRowAndColumnHeaders(
      container,
      'midnight',
      'Last Name',
      1
    )
    expect(midnightLastNameCell.id).toEqual('body-cell-7')
    const midnightFirstNameCell = queries.getCellByRowAndColumnHeaders(
      container,
      'midnight',
      'First Name',
      1
    )
    expect(midnightFirstNameCell.id).toEqual('body-cell-7')
    const midnightStatusCell = queries.getCellByRowAndColumnHeaders(
      container,
      'midnight',
      'Status',
      1
    )
    expect(midnightStatusCell.id).toEqual('body-cell-11')
  })
})
