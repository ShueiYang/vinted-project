import { Fragment } from "react";
import Pagination from "./Pagination";
import CardOffer from "./items/CardOffer";


const CardSection = ({datas, docsCount, pageLimit, gotoNextPage, gotoPrevPage }) => {
  
  return (
    <>
    <article className="container mt-8">
      <div className="flex gap-4 items-center justify-center md:justify-end ">
        <p>{`Total nombre d'offres: ${datas.count}`}</p>
        <span> | </span>
        <p className="text-zinc-500">{`Resultats sur la page: ${datas.offers.length} `}</p>
        <Pagination 
          docsCount={docsCount}
          pageLimit={pageLimit}  
          totalCount={datas.count} 
          gotoNextPage={gotoNextPage}
          gotoPrevPage={gotoPrevPage}
        />
      </div>
      {
        datas.offers.length === 0 ? 
          <div className="mt-12">
            <h3 className="text-center">PAS DE RESULTAT</h3>
          </div>  

      : <section className="card-offer my-6">  
        {         
          datas.offers.map(offer => {
            return (
              <Fragment key={offer._id}>
                <CardOffer offer={offer}/>
              </Fragment>
            )
          })}   
        </section>
      } 
    </article>
    </>
  )
}

export default CardSection;