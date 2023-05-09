import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const ResetPassword = () => {

  const navigate = useNavigate();  

  const [ validate, setValidate ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ isPending, setPending ] = useState(false);
  const [ password, setPassword ] = useState("");
  const [ checkPassword, setCheckPassword ] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const token = searchParams.get("token");


  useEffect(() => {
    async function accessResetForm() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/reset-password/${id}/${token}`
        );
        if (response.ok) {
          setValidate(true);
        } else {
          setErrorMessage(
            "Votre lien est invalide ou le token a deja ete utilise ou expire."
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
    // will redirect to the homePage if no id or token on the query
    if(id && token) {
      accessResetForm();
    } else {
      navigate("/")
    }    

  }, [id, token, navigate]);


  async function submitResetPassword(event) {
      event.preventDefault();
      setPending(true)
      try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/user/reset-password/${id}/${token}`, {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                password,
                confirmPassword: checkPassword,
              })
          })
          const user = await response.json();
          if(response.ok) {
            navigate("/login")
          }

          if (response.status === 400 && user.message === "Password must be at least 8 characters long") {
            setErrorMessage("Le mot de passe doit etre au moins 8 characters de longueur")
      
          } else if (response.status === 400 && user.message === "Password do not match") {
            setErrorMessage("Veuillez insérer un mot de passe identique")
          
          } else if (response.status === 400) {
            setErrorMessage("Veuillez remplir tous les champs :)")      
          }                   
      } catch (err) {
          console.error(err)
          setErrorMessage(err.message)
      } finally {
        setPending(false);
      }
  }

  if(!validate) 
     return (
      <div className="mt-[6.5rem]">
        <h3 className="text-center">{errorMessage}</h3>
      </div>
    )

  return (
    <fieldset className="container h-full mt-[6.5rem]">
        <legend className="text-2xl mx-auto">Reinitialisation mot de passe</legend>
        <form
        className="flex flex-col gap-5 justify-center items-center w-[85%] h-[25rem] sm:max-w-xs mx-auto"
          onSubmit={submitResetPassword}
        >
        <label className={errorMessage ? "warn" : ""} htmlFor="password">
            <input
            className="inputField"
            id="password"
            type="password"
            onChange={(e)=> {
                setPassword(e.target.value);
            }}
            placeholder="Veuillez saisir le nouveau mot de passe"
            />
        </label>

        <label className={errorMessage ? "warn" : ""}  htmlFor="checkPassword">
            <input
                className="inputField"
                id="checkPassword"
                type="password"
                onChange={(e)=> {
                    setCheckPassword(e.target.value);
                }}      
                placeholder="Confirmez Mot de passe"
            />
        </label>

        <button className="bg-[#017b86] text-slate-50 text-xl mt-6"> 
            {isPending ? "En cours..." : "Envoyer"} 
        </button>

        {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
        )}

       </form>
    </fieldset>
  )  
 
};

export default ResetPassword;
