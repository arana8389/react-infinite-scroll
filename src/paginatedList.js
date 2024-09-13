import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import ReactPaginate from 'react-paginate';
import './style.css';

export default function PaginatedList() {
  const [pagination, setPagination] = useState({
    data: new Array(10000).fill().map((value, index) => {
      return {
        id: index,
        title: faker.lorem.words(5),
        body: faker.lorem.sentences(4),
      };
    }),
    offset: 0,
    numberPerPage: 10,
    pageCount: 0,
    currentData: [],
  });

  useEffect(() => {
    setPagination((prevState) => {
      console.log('prevState', prevState);
      return {
        ...prevState,
        pageCount: prevState.data.length / prevState.numberPerPage,
        currentData: prevState.data.slice(
          pagination.offset,
          pagination.offset + pagination.numberPerPage
        ),
      };
    });
  }, [pagination.numberPerPage, pagination.offset]);

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = pagination.numberPerPage * selected;
    setPagination({ ...pagination, offset });
  };

  return (
    <div>
      {pagination.currentData &&
        pagination.currentData.map((item) => {
          return (
            <div key={item.id} className="post">
              <h3>
                {item.title} - {item.id}
              </h3>
              <p>{item.body}</p>
            </div>
          );
        })}
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breaklabel={'...'}
        pageCount={pagination.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        containerClassName={'pagination'}
        activeClassName={'active'}
        onPageChange={handlePageClick}
      />
    </div>
  );
}
