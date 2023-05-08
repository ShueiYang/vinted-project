import RangeSlider from "./items/RangeSlider";
import { useEffect, useState } from "react";


const FilterBar = ({setSort, setPriceRange}) => {

  const [ priceSorted,  setPriceSorted] = useState(true);

  useEffect(()=> {
    if(priceSorted) {
      setSort("price-asc")
    } else {
      setSort("price-desc")
    }
  }, [priceSorted, setSort])


  return (
    <nav className="fixed w-full top-14 z-10 bg-[#fff] border-y border-neutral-200">
      <div className="flex items-center justify-center whitespace-nowrap h-10 my-1 lg:w-[80%] mx-auto">
        <span className="hidden md:block text-sm mr-4">Trier par prix</span>
        <label className="w-11 h-5 rounded-2xl bg-[#017b86] flex items-center cursor-pointer">     
          <input 
            className="hidden"
            type="checkbox"
            name="price" 
            onChange={()=> {setPriceSorted(!priceSorted)}}
            checked={priceSorted}
          />
          <div className={`${ priceSorted ? "translate-x-0.5" : "translate-x-6"}
            duration-300 bg-slate-50 w-[1.1rem] h-[1.1rem] rounded-full border border-zinc-500 
            flex items-center text-sm justify-center
          `}>  
            {
              priceSorted ? <span>⇡</span> : <span>⇣</span>
            }       
          </div>
        </label>
        
        <span className="text-sm ml-4">Prix entre :</span>
        <RangeSlider  setPriceRange={setPriceRange} />
      
        <a href="https://github.com/ShueiYang/"
            className="hidden md:flex items-center mx-6"
            rel="noopener noreferrer"
            target="_blank"
          >
          <img 
              className="w-6"
              src="/icons/github.svg"
              alt="github"
          />
            <span>Source</span>
        </a>
      </div>
    </nav>
    
  )
}

export default FilterBar;