import React from "react";
import { render } from "./test-utils";
import { SimpleTable } from "./SimpleTable";

describe("SimpleTable", () => {
  it("should have 8 rows", () => {
    const { getAllRows } = render(<SimpleTable />);
    expect(getAllRows()).toHaveLength(8);
  });
  it("should have a header row", () => {
    const { getRowByRowgroupType } = render(<SimpleTable />);
    expect(getRowByRowgroupType("thead")).toBeVisible();
  });
  it("should have 7 body rows", () => {
    const { getAllRowsByRowgroupType } = render(<SimpleTable />);
    expect(getAllRowsByRowgroupType("tbody")).toHaveLength(7);
  });
  it("should not have a footer row", () => {
    const { queryRowByRowgroupType } = render(<SimpleTable />);
    expect(queryRowByRowgroupType("tfoot")).toBeNull();
  });
  it("should have 48 cells", () => {
    const { getAllCells } = render(<SimpleTable />);
    expect(getAllCells()).toHaveLength(48);
  });
  it("should have a Status column", () => {
    const { getAllColumnCellsByHeaderText } = render(<SimpleTable />);
    expect(getAllColumnCellsByHeaderText("Status")).toHaveLength(8);
  });
  it('should have a row for "reason guest"', () => {
    const { getRowByFirstCellText } = render(<SimpleTable />);
    expect(getRowByFirstCellText("reason")).toBeVisible();
  });
  it('should have "trouble skirt"s status as relationship', () => {
    const { getCellByRowAndColumnHeaders } = render(<SimpleTable />);
    expect(getCellByRowAndColumnHeaders("trouble", "Status")).toHaveTextContent(
      "relationship"
    );
  });
});
