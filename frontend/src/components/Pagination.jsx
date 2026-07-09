function Pagination({ page, totalPages, onPageChange }) {
  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    pages.push(
      <button key="first" onClick={() => onPageChange(1)}>
        First
      </button>
    );
    pages.push(<span key="dots-start">...</span>);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={page === i ? 'active' : ''}
      >
        {i}
      </button>
    );
  }

  if (endPage < totalPages) {
    pages.push(<span key="dots-end">...</span>);
    pages.push(
      <button key="last" onClick={() => onPageChange(totalPages)}>
        Last
      </button>
    );
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
      {pages}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
