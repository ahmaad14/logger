import { useEffect, useState } from "react";
import ILog from "../types/ILog";
import fetchLogs from "./fetchLogs";
import filterLogs, { DateLogFilter, StringLogFilter } from "./filterLogs";
import sortLogs from "./sortLogs";

const useProcessLogs = (rowsPerPageCount: number) => {
  const [logs, setLogs] = useState<ILog[]>([]);
  const [sortBy, setSortBy] = useState<keyof ILog>();
  const [startIndex, setStartIndex] = useState(0);
  const [filters, setFilters] = useState<StringLogFilter[]>();
  const [dateFilter, setDateFilter] = useState<DateLogFilter>();
  const filteredData = filterLogs(logs, filters, dateFilter);
  const sortedData = sortLogs(filteredData, sortBy);
  const pageData = sortedData.slice(startIndex, startIndex + 10);
  const pagesCount = Math.ceil(filteredData.length/rowsPerPageCount); 

  const handleFiltersFormSubmit = (
    newFilters: StringLogFilter[],
    newDateFilter: DateLogFilter
  ) => {
    setFilters(newFilters);
    setDateFilter(newDateFilter);
  };

  const handleSort = (sortColumn: keyof ILog) => {
    setSortBy(sortColumn);
  };

  const handlePageChange = (currentPage: number) => {
    setStartIndex( currentPage*rowsPerPageCount);
  }

  useEffect(() => {
    const getData = async () => {
      const fetchedLogs = await fetchLogs();
      setLogs(fetchedLogs);
    };
    getData();
  }, []);

  return [pageData, pagesCount, handleSort, handleFiltersFormSubmit, handlePageChange] as const;
};

export default useProcessLogs;
