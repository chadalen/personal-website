import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Paginator from 'paginator';

interface PageButtonProp {
  currentPage: number;
  page: number;
  onClick: () => void;
}

const PageButton = ({ currentPage, page, onClick }: PageButtonProp): React.ReactElement => (
  <button
    key={page}
    type="button"
    className={clsx(
      'font-bold py-2 px-4 rounded mr-1 text-sm',
      {
        'bg-gray-600 text-gray-300': currentPage === page,
      },
      {
        'bg-gray-300 hover:bg-gray-400 text-gray-800': currentPage !== page,
      },
    )}
    onClick={onClick}
  >
    {page}
  </button>
);

interface PaginationProp {
  onChange: (newPage: number) => void;
  itemCountPerPage: number;
  pageRangeCount: number;
  totalItemCount: number;
  activePage: number;
}

function Pagination({
  onChange,
  itemCountPerPage,
  pageRangeCount,
  totalItemCount,
  activePage,
}: PaginationProp): React.ReactElement {
  const [pages, setPages] = useState([]);
  const {
    current_page: currentPage,
    first_page: firstPage,
    last_page: lastPage,
    total_pages: totalPages,
  } = new Paginator(itemCountPerPage, pageRangeCount)
    .build(totalItemCount, activePage);

  function onClickPage(newPage: number) {
    if (onChange) {
      onChange(newPage);
    }
  }

  useEffect(() => {
    const pageBtns = [];

    for (let i = firstPage; i <= lastPage; i += 1) {
      pageBtns.push((
        <PageButton
          key={i}
          currentPage={currentPage}
          page={i}
          onClick={() => onClickPage(i)}
        />
      ));
    }

    setPages(pageBtns);
  }, [currentPage, itemCountPerPage, pageRangeCount]);

  return (
    <div>
      {currentPage > 1 && (
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-1 text-sm"
          onClick={() => onClickPage(Math.max(currentPage - 1, 1))}
        >
          Prev
        </button>
      )}

      {pages}

      {currentPage < totalPages && (
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-1 text-sm"
          onClick={() => onClickPage(Math.min(currentPage + 1, totalPages))}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
