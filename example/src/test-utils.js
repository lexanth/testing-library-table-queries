import { render, queries } from '@testing-library/react'
import tableQueries from 'table-queries'

const customRender = (ui, options) =>
  render(ui, { queries: { ...queries, ...tableQueries }, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
