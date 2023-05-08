import { Link } from "react-router-dom";


const CardOffer = ({offer}) => {
  
  const {
    owner,
    product_image,
    product_details,
    product_price
  } = offer;

  return (
    <Link to={`/offer/${offer._id}`}>
      <div className="flex flex-col w-full h-auto"> 
        <div className="flex items-center justify-center gap-2 p-2 text-xs ">
          <img className="w-6 h-6 rounded-full" src={owner.account.avatar ? owner.account.avatar.secure_url : "/icons/account.svg"} alt="avatar" />
          <span>{owner.account.username}</span>
        </div>
        <div>
          <img className="w-full aspect-[0.6/1]" src={product_image.secure_url} alt="test" />
          <div className="flex flex-col p-2">
            <span>{`${product_price} €`}</span>
            {
              product_details.map((detail, i) => {
                return(
                  <div key={i} className="text-sm md:text-xs">
                    { detail["TAILLE"] && <span>{detail["TAILLE"]}</span> }
                    { detail["MARQUE"] && <span>{detail["MARQUE"]}</span> }
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardOffer;