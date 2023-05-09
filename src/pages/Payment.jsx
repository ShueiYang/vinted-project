import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Payment = ({ token, user }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [validate, setValidate] = useState(false);
  const { title, price } = location.state;

  const stripe = useStripe();
  const elements = useElements();
 
  async function handleSubmit(event) {

    event.preventDefault();
    try {
      setIsLoading(true);
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: user._id
      });
      const stripeToken = stripeResponse.token.id;
      const backEndResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            stripeToken,
            title,
            amount: Number(price),
          }),
        }
      );
      const result = await backEndResponse.json();
      if (result === "succeeded") {
        setIsLoading(false);
        setValidate(true);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full h-full mt-[6.5rem] bg-slate-100">
      {validate ? (
        <div className="h-[400px] flex flex-col items-center justify-center">
          <h3>Le paiement a ete valide avec succes</h3>
          <Link to="/" className="mt-4">
            <button>A l&apos;accueil</button>
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="container sm:max-w-[450px] min-h-[550px] flex flex-col justify-center mx-auto"
        >
          <div className="w-full flex flex-col bg-[#fff]">
            <div className="min-h-[180px] p-4">
              <h3>Commande</h3>
              <p className="my-2">{`Nom: ${title}`}</p>
              <p className="text-sm my-2">{`Frais protection acheteur`}</p>
              <p className="text-sm my-2">{`Frais de port`}</p>
            </div>

            <div className="flex flex-col flex-1 p-6 border-t border-slate-300">
                <p className="text-sm my-4">{`Il ne vous reste plus qu'un etape pour vous offrir ${title}`}</p>
              <div className="flex justify-between">
                <span className="my-2 font-bold">Total</span>
                <span className="my-2 font-bold">{`${price}€`}</span>
              </div>
              <CardElement />
              <button
                className={`${isLoading ? "inactive" : ""}
                 w-[80%] bg-[#017b86] text-slate-50 text-xl h-10 mt-8 mb-4 mx-auto`}
              >
                {isLoading ? "transaction en cours..." : "Payer"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Payment;
