import FilterBar from "../components/content/Filterbar"
import HeroSection from "../components/content/HeroSection";
import CardSection from "../components/content/CardSection";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import usePage from "../hooks/usePage";


const pageLimit = 15;

const Home = ({input}) => {

  const [ data, setData ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);
  const [ count, setCount ] = useState(pageLimit);
  const [ sort, setSort ] = useState("price-asc");
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ priceRange, setPriceRange ] = useState({ priceMin: "", priceMax: "" });


  useEffect(()=> {
    const params = new URLSearchParams({
        limit: pageLimit,
        sort: sort,
        page: currentPage,
        priceMin: priceRange.priceMin,
        priceMax: priceRange.priceMax,
        title: input 
    })
    const apiUrl = `${import.meta.env.VITE_API_URL}/offers?${params.toString()}`

    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(response.ok) {
          setData(data);
          setLoading(false);
        }     
      } catch (err) {
        console.error(err)
      }
    }
    fetchData();
  }, [currentPage, sort, input, priceRange]);


  const { gotoNextPage, gotoPrevPage } = usePage(setCurrentPage, count, setCount, data);

  return (
    <>
      <FilterBar 
        setSort={setSort}
        setPriceRange={setPriceRange}
      />
      <HeroSection />
      {isLoading ? <Loader /> 
      : <CardSection 
          datas={data}
          docsCount={count}
          pageLimit={pageLimit}
          gotoNextPage={gotoNextPage}
          gotoPrevPage={gotoPrevPage}
        />
      }
    </>
  );
};

export default Home;
