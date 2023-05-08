

function usePage(setCurrentPage, count, setCount, data) {

  function gotoNextPage(limit) {
    setCurrentPage((prevState) => {
      return prevState + 1;
    });
    if (limit >= data.count - count) {
      setCount(data.count);
    } else {
      setCount((prevState) => {
        return prevState + limit;
      });
    }
  }

  function gotoPrevPage(limit) {
    setCurrentPage((prevState) => {
      return prevState - 1;
    });
    if (limit > count - limit) {
      setCount(limit);
    } else {
      setCount((prevState) => {
        return prevState - limit;
      });
    }
  }
  return {
    gotoNextPage,
    gotoPrevPage,
  };
}

export default usePage;
