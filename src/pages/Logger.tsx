import ReactPaginate from "react-paginate";
import FiltersForm from "../components/form/FiltersForm";
import LogsTable from "../components/LogsTable";
import useProcessLogs from "../utils/useProcessLogs";

const Logger = () => {
  const rowsPerPage = 10;
  const [
    pageData,
    pagesCount,
    handleSort,
    handleFiltersFormSubmit,
    handlePageChange,
  ] = useProcessLogs(rowsPerPage);

  return (
    <>
      <FiltersForm onSubmit={handleFiltersFormSubmit} />

      <LogsTable logs={pageData} handleSort={handleSort} />

      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={(selectedItem) => handlePageChange(selectedItem.selected)}
        pageRangeDisplayed={10}
        pageCount={pagesCount}
        previousLabel="<"
      />
    </>
  );
};

export default Logger;
