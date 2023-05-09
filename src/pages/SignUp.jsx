import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const SignUp = ({handleToken}) => {

  const navigate = useNavigate();
  const [ signUpForm, setSignUpForm ] = useState({
    username: "",
    email: "",
    password: "",
    checkPassword: "",
    newsletter: true,
  })
  const [ loading, setLoading ] = useState(false);
  const [ unMatch, setUnMatch ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState(null);


  function handleChange (event) {
    const {id, value, type, checked} = event.target;
    setSignUpForm({
      ...signUpForm,
       [id]: type === "checkbox" ? checked : value
    })
  }

  async function submitSignup(event) {
    event.preventDefault();
    setLoading(true);
    setUnMatch(false);
    setErrorMessage(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/signup`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signUpForm)
      })
      const user = await response.json();
   
      if (response.status === 409) {
        setErrorMessage("Cet email est déjà utilisé, veuillez en choisir un autre :)")
  
      } else if (response.status === 400 && user.message === "Password must be at least 8 characters long") {
        setUnMatch(true);
        setErrorMessage("Le mot de passe doit etre au moins 8 characters de longueur")
      
      } else if (response.status === 400) {
        setErrorMessage("Veuillez remplir tous les champs :)")    
     
      } else if (response.status === 418) {
        setUnMatch(true);
        setErrorMessage("Veuillez insérer un mot de passe identique")
      }        
       
      if(user.token) {
        handleToken(user.token)
        navigate("/");
      } 

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false);
    }
  }


  return (
    <fieldset className="container h-full mt-[8.5rem] mb-16">     
        <legend className="text-2xl mx-auto mb-12">S&apos;inscrire</legend>      
        <form
          className="flex flex-col gap-5 justify-center items-center w-[85%] h-[25rem] sm:max-w-xs mx-auto" 
          onSubmit={submitSignup}
        > 
          <label htmlFor="username">
            <input
                className="inputField"
                id="username"
                type="text"
                onChange={handleChange}
                value={signUpForm.username}           
                placeholder="Nom d'utilisateur"
            />
          </label>

          <label htmlFor="email">
            <input
                className="inputField"
                id="email"
                type="email"
                onChange={handleChange}
                value={signUpForm.email}           
                placeholder="Email"
            />
          </label>

          <label className={unMatch ? "warn" : ""} htmlFor="password">
            <input
                className="inputField"
                id="password"
                type="password"
                onChange={handleChange}         
                placeholder="Mot de passe"
            />
          </label>

          <label className={unMatch ? "warn" : ""}  htmlFor="checkPassword">
            <input
                className="inputField"
                id="checkPassword"
                type="password"
                onChange={handleChange}         
                placeholder="Confirmez Mot de passe"
            />
          </label>

          <label className="text-center flex flex-col items-center justify-center mt-2" htmlFor="newsletter">
            <div className="flex items-center w-full">
              <input
                  className="w-6 h-5"
                  id="newsletter"
                  type="checkbox"
                  checked={signUpForm.newsletter}
                  onChange={handleChange}        
              /> 
                <span className="ml-4 text-gray-500">S&apos;inscrire à notre newsletter</span>        
            </div>
            <p className="text-left text-xs text-slate-400 mt-2">
              En m&apos;inscrivant je confirme avoir lu et accepté les Termes & Conditions et
              Politique de Confidentialité de Vinted. Je confirme avoir au moins 18 ans.
            </p>
          </label>
     
          <button className="bg-[#017b86] text-xl text-slate-50 min-h-[40px]">
            {loading ? "En cours..." : `S'inscrire`}     
          </button>
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          <Link to="/login">
            <span className="text-sm text-[#017b86]">Tu as deja un compte ? connecte-toi!</span> 
          </Link>
        </form>
    </fieldset>  
  )
}

export default SignUp;