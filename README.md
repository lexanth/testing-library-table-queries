# testing-library-table-queries

> Additional testing-library queries for querying tables like a user

[![NPM](https://img.shields.io/npm/v/testing-library-table-queries.svg)](https://www.npmjs.com/package/testing-library-table-queries)

## Install

```bash
yarn add -D testing-library-table-queries
```

## Usage
_These examples all use `@testing-library/react`, but there isn't anything tying use of this library to that, it should work with anything `@testing-library/dom`-based._
### Inline
```js
import { getRowByFirstCellText, getAllCells } from 'testing-library-table-queries'

const { container } = render(<MyTable />)
expect(getRowByFirstCellText(container, 'John Smith')).toBeVisible()
const cells = getAllCells(getRowByFirstCellText(container, 'John Smith'))
```

### Global custom query
For e.g. React, we can add the custom queries to a global custom render (see [docs](https://testing-library.com/docs/react-testing-library/setup#add-custom-queries))
```js
import { render, queries } from '@testing-library/react'
import tableQueries from 'testing-library-table-queries'

const customRender = (ui, options) =>
  render(ui, { queries: { ...queries, ...tableQueries }, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
```
You can then use the queries just like any other query:
```js
const { getRowByFirstCellText } = render(<MyTable />)
expect(getRowByFirstCellText('John Smith')).toBeVisible()
const cells = within(getRowByFirstCellText('John Smith')).getAllCells()
```

## Limitations
* Assumes tables are using standard semantic table HTML elements (`tbody`, `thead`, `tr` etc.) with valid DOM nesting.
* Doesn't handle tables with cells spanning multiple rows (`rowspan`)
  * But `colspan` is fine!

## Queries
All queries have the standard set of get/getAll/query/queryAll/find/findAll variants. The pluralisation varies slightly to make them sensible.

### Rows
```js
const { getAllRows } = render(<MyTable />)
expect(getAllRows()).toHaveLength(5)
```
Just a shorthand to get all rows. No better than `getAllByRole('row')`, but used internally by some other queries, so might as well export it.

### Cells
```js
const { getAllCells } = render(<MyTable />)
expect(getAllCells()).toHaveLength(48)
```
Shorthand to get all cells, whether `th` or `td`. Most useful when combined with other queries (as is done internally).
```js
expect(within(headerRow).getAllCells()).toHaveLength(6)
```

### Row groups
```js
const { getByRowgroupType, queryByRowgroupType } = render(<MyTable />)
const header = getByRowgroupType('thead')
expect(within(header).getAllCells()).toHaveLength(6)
expect(queryByRowgroupType('tfoot')).toBeNull()
```
Finds row groups, based on which type of grouping it is (`thead`, `tbody` or `tfoot`). These would typically be indicated to a user through styling.

### Rows by row groups
```js
const { getAllRowsByRowgroupType } = render(<MyTable />)
expect(getAllRowsByRowgroupType('tbody')).toHaveLength(8)
```
Finds rows, based on which type of rowgroup they are in.

### Rows by first cell text
```js
const { getRowByFirstCellText } = render(<MyTable />)
expect(getRowByFirstCellText('John Smith')).toBeVisible()
fireEvent.click(within(getRowByFirstCellText('John Smith')).getByText('Delete'))
```
Users will generally find rows by scanning the content in the first column, then reading across the row. This finds that row (rather than just the first cell), which can then be used to identify other items within that row.

### Column cells by header text
```js
const { getAllColumnCellsByHeaderText } = render(<MyTable />)
const ageCells = getAllColumnCellsByHeaderText('Age')
ageCells.forEach((cell, index) => {
  expect(cell).toHaveTextContent(expectedValues[index])
})
```
Returns an array of cells based on the text in the column header. Note that there is no DOM 'column' element, so it is an array of cells. If multiple columns have the same header text, the first is used. Optionally, this also supports an index (starting from zero) to support having multiple header rows:
```js
const { getAllColumnCellsByHeaderText } = render(<MyTable />)
const ageCells = getAllColumnCellsByHeaderText('Age', 1) // Use the second header row, rather than the first
```

### Cell by row and column headers
```js
const { getCellByRowAndColumnHeaders } = render(<MyTable />)
expect(getCellByRowAndColumnHeaders('John Smith', 'Age')).toHaveTextContent('28')
```
If a user is trying to find a specific value for a specific entity, they might scan from the row and column headers. This finds cells based on those headers. Like column cells by header text, it only uses the first column with the specified header text (but will handle multiple rows), and supports a header index.

## Examples
See [example tests](./example/src/SimpleTable.test.js)

## Future changes
* Address the first column limitation
* Allow custom text normalisation/matching
* Allow Nth cell in a row, rather than just first

## License

MIT © [lexanth](https://github.com/lexanth)
