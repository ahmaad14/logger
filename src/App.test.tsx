import { fireEvent, render, screen } from "@testing-library/react";
import Logger from "./pages/Logger";
import ILog from "./types/ILog";
import fetchLogs from "./utils/fetchLogs";

let allLogs: ILog[] = [];
let rowsPerPage = 10;
let pagesCount: number;

beforeAll(async () => {
  allLogs = await fetchLogs();
  pagesCount = Math.ceil(allLogs.length / rowsPerPage);
});

// common

const testSorting = (
  description: string,
  column: keyof ILog,
  compareFunction: (a: any, b: any) => number
) => {
  test(description, async () => {
    render(<Logger />);
    const nextPageButton = screen.findByText(">");
    const sortBtn = screen.findByTestId(`sort-${column}`);
    (await sortBtn).click();

    const displayedRows = [];
    const sortedRows: string[] = allLogs.map((log) =>
      String(log[column])
    ) as string[];

    sortedRows.sort(compareFunction);
    let logsCount = 0;

    for (let i = 0; i < pagesCount; i++) {
      for (let i = 0; i < 10 && logsCount < allLogs.length; i++) {
        let currentRow = (await screen.findByTestId(`${column}${i}`)).innerHTML;
        displayedRows.push(currentRow.trim());
        logsCount += 1;
      }
      (await nextPageButton).click();
    }
    expect(displayedRows).toStrictEqual(sortedRows);
    expect(logsCount).toBe(allLogs.length);
  });
};

// test filtering

const testFiltering = (
  description: string,
  column: keyof ILog,
  value: string
) => {
  test(description, async () => {
    render(<Logger />);
    const nextPageButton = screen.findByText(">");
    const searchBtn = screen.findByTestId("search-btn");
    const input = screen.getByTestId(`form-${column}`);

    fireEvent.change(input, { target: { value: value } });
    (await searchBtn).click();

    const displayedRows = [];
    const filteredRows: string[] = allLogs.filter(
      (log) => String(log[column]) === value
    ).map(log => String(log.logId));

    let logsCount = 0;

    for (let i = 0; i < pagesCount; i++) {
      for (let i = 0; i < 10 && logsCount < filteredRows.length; i++) {
        let currentRow = (await screen.findByTestId(`logId${i}`)).innerHTML;
        displayedRows.push(currentRow.trim());
        logsCount += 1;
      }
      (await nextPageButton).click();
    }
    expect(displayedRows).toStrictEqual(filteredRows);
    expect(logsCount).toBe(filteredRows.length);
  });
};

test("Renders all logs and the required number of rows per page", async () => {
  render(<Logger />);
  const nextPageButton = screen.findByText(">");

  let logsCount = 0;

  for (let i = 0; i < pagesCount; i++) {
    let currentPageLogs = await screen.findAllByTestId("log-row");
    let curentPageRowsCount = currentPageLogs.length;
    logsCount += curentPageRowsCount;
    expect(curentPageRowsCount).toBeLessThanOrEqual(rowsPerPage);
    (await nextPageButton).click();
  }

  expect(logsCount).toBe(allLogs.length);
});

testSorting(
  "sort by log id",
  "logId",
  (a: string, b: string) => Number(a) - Number(b)
);

testSorting(
  "sort by date",
  "creationTimestamp",
  (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime()
);

testSorting(
  "sort by application type",
  "applicationType",
  (a: string, b: string) => a.localeCompare(b)
);

testSorting("sort by action type", "actionType", (a: string, b: string) =>
  a.localeCompare(b)
);

testSorting("sort by application id", "applicationId", (a: string, b: string) =>
  a.localeCompare(b)
);

testFiltering( "filter by log id", "logId", "906468196730134" );
testFiltering( "filter by application type", "applicationType", "CERT_TITLE_DEED_PLOT" );
testFiltering( "filter by application type", "actionType", "INITIATE_APPLICATION" );


