import "./Pagination.css";

const VISIBLE_PAGES = 5;

function Pagination({
  page,
  setPage,
  totalPages,
  hasPreviousPage,
  hasNextPage,
}) {
  let startPage = page - 2;

  if (startPage < 1) {
    startPage = 1;
  }

  const endPage = startPage + VISIBLE_PAGES - 1;

  if (endPage > totalPages) {
    startPage = totalPages - VISIBLE_PAGES + 1;
  }

  const pages = Array.from(
    { length: VISIBLE_PAGES },
    (_, index) => startPage + index,
  );
  console.log(pages);
  return (
    <div className="pagination">
      <button
        className="paginationBtn"
        disabled={!hasPreviousPage}
        onClick={() => setPage((prev) => prev - 1)}
      >
        ← Previous
      </button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`paginationBtn ${
            page === pageNumber ? "paginationBtnActive" : ""
          }`}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className="paginationBtn"
        disabled={!hasNextPage}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;
