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
  
    return [search, setSearchQuery];
}

export default useSearchDebounce;