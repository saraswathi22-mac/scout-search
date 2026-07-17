import "./Pagination.css";

function Pagination({ page, setPage, hasPreviousPage, hasNextPage }) {
  return (
    <div className="pagination">
      <button
        className="paginationBtn"
        disabled={!hasPreviousPage}
        onClick={() => setPage((prev) => prev - 1)}
      >
        ← Previous
      </button>

      <span className="paginationCurrent">Page {page}</span>

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
