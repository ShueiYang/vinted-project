import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadPage from "../components/LoadPage";


const Offer = () => {
  
  const [ pageData, setPageData ] = useState({});
  const [ isLoading, setLoading ] = useState(true);


  const { id } = useParams();

  useEffect(()=> {
    async function fetchOfferData() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/offer/${id}`);
        const data = await response.json();
        if(response.ok) {
          setPageData(data);
          setLoading(false);
        }     
      } catch (err) {
        console.error(err)
      }
    }
    fetchOfferData();
  }, [id]);
  
  const { 
    product_pictures,
    product_price, 
    product_details,
    product_name,
    product_description,
    owner,
  } = pageData;


  if(isLoading)
    return <LoadPage />

  return (
    <>
    <article className="container flex flex-col items-center md:flex-row p-8 md:p-14 w-full h-auto gap-[5%] justify-around bg-stone-100 mt-[6.5rem]">
      <div className="w-[85%] md:w-[45%] h-[90%] flex overflow-x-auto">
      {
        product_pictures.map(picture => {
          return (
            <Fragment key={picture.asset_id}>
              <img 
                className="w-full h-full shrink-0"
                src={picture.secure_url}
                alt="img" 
              />
            </Fragment>
          )
        })
      } 
      </div>

      <div className="flex flex-col justify-between w-[85%] max-w-[27rem] md:w-[45%] h-[90%] p-6 md:p-10 bg-[white]">
        <div className="w-full flex-auto mb-4">
            <span className="text-2xl">{`${product_price} €`}</span>
            <ul className="detail flex flex-col text-sm uppercase mt-[10%]">
            {
              product_details.map(detail => {
                const keyName = Object.keys(detail);   
                return(
                  <li className="flex" key={keyName[0]}> 
                    <span className="text-neutral-400">{`${keyName[0]}:`}</span>
                    <span>{detail[keyName[0]]}</span>
                  </li>
                )
              })
            }
            </ul>
        </div>

        <div className="w-full h-0.5 mt-2 mb-4 bg-slate-200"></div>

        <div className="w-full flex flex-col justify-around">
          <h2>{product_name}</h2>
          <p className="text-sm my-2">{product_description}</p>
          <div className="flex items-center gap-10">
            <img className="w-9 h-9 rounded-full" src={owner.account.avatar ? owner.account.avatar.secure_url : "/icons/account.svg"} alt="avatar"/>
            <span>{owner.account.username}</span>
          </div>
        </div>
        <Link 
          to="/payment"
          state={{title: product_name, price: product_price}} 
          className="w-[80%] mx-auto"
        >  
          <button className="w-full bg-[#017b86] text-slate-50 h-10 mt-8 mb-4 mx-auto">
            Acheter
          </button>
        </Link>  
      </div>    
    </article>
    </>
  )
}

export default Offer;