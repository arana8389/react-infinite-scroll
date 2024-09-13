import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import useInfiniteScroll from './useInfiniteScroll';

export default function ScrolledList() {
  const data = new Array(10000).fill().map((value, index) => {
    return {
      id: index,
      title: faker.lorem.words(5),
      body: faker.lorem.sentences(3),
    };
  });

  const showRecordCount = 5;

  const [listItems, setListItems] = useState(data.slice(0, showRecordCount));
  const [isFetching, setIsFetching] = useInfiniteScroll(showMoreItems);

  function showMoreItems() {
    console.log('isFetching ==>', isFetching);
    setTimeout(() => {
      console.log('items count', listItems.length);

      setListItems((prevState) =>
        data.slice(0, prevState.length + showRecordCount)
      );
      setIsFetching(false);
    }, 1000);
  }

  return (
    <>
      <ul className="list-group mb-2">
        {listItems.map((item) => (
          <li key={item.id} className="list-group-item">
            <div className="post">
              <h3>
                {item.title} - {item.id + 1}
              </h3>
              <p>{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
      {isFetching && 'Showing More Items.....'}
    </>
  );
}
