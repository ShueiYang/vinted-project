import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";


const Login = ({handleToken, visible, setVisible , token, user}) => {

  const navigate = useNavigate();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ errorMessage, setErrorMessage] = useState("");

  async function submitLogin (event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email,
          password,
        })
      })
      const user = await response.json();
      if(response.status === 401) {
        setErrorMessage("Email ou mot de passe incorrect")
      } else if (response.status === 400) {
        setErrorMessage("Veuillez remplir tous les champs :)")
      }     
      if(user.token) {
        handleToken(user.token)
        navigate("/");
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if(token && user) {
    return <Navigate to="/" />
  }

  return (

    <fieldset className={`container h-full ${!visible? "mt-[8.5rem] mb-16" : ""}`}>
      <legend className="text-2xl mx-auto">Se connecter</legend>
      <form
        className="flex flex-col gap-5 justify-center items-center w-[85%] h-[25rem] sm:max-w-xs mx-auto"
        onSubmit={submitLogin}
      >
        <label className={errorMessage ? "warn" : ""} htmlFor="email">
          <input
            className="inputField"
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
        </label>

        <label className={errorMessage ? "warn" : ""} htmlFor="password">
          <input
            className="inputField"
            id="password"
            type="password"
            onChange={(e)=> {
              setPassword(e.target.value);
            }}
            placeholder="Mot de passe"
          />
        </label>

        <button className="bg-[#017b86] text-slate-50 text-xl mt-6"> 
          {loading ? "En cours..." : "Se connecter"} 
        </button>

        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        <div onClick={()=> {setVisible(!visible)}} className="hover:cursor-pointer">
          <span className="text-sm text-slate-600">Mot de passe oublie ?</span>
        </div>
        <Link to="/signup">
          <span className="text-sm text-[#017b86]">Pas encore de compte ? Inscris-toi !</span>
        </Link>
      </form>
    </fieldset>
  );
};

export default Login;
