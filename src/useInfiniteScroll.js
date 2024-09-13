import { useState, useEffect } from 'react';

export default (cb) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll, 100));

    return () =>
      window.removeEventListener('scroll', debounce(handleScroll, 100));
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    cb();
  }, [isFetching]);

  const debounce = (func, delay) => {
    let inDebounce;
    clearTimeout(inDebounce);
    return function () {
      inDebounce = setTimeout(() => {
        func.apply(this);
      }, delay);
    };
  };

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};
