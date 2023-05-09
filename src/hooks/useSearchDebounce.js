import { useState, useEffect } from "react";

// custom hook to delay searchQuery on the searchBar

function useSearchDebounce(delay = 350) {
    
    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    
    useEffect(() => {
      const delayFn = setTimeout(() => {
        setSearch(searchQuery)
      }, delay);   
      return () => clearTimeout(delayFn);

    }, [searchQuery, delay]);
  // Search is the real state which will trigger the rerender, and this state
  // is trigger by a second state searchQuery delay by setTimeout 350 ms.
  // and Searchquery is the state listening on the searchbar.
    return [search, setSearchQuery];
}

export default useSearchDebounce;