import { Link } from "react-router-dom";


const Navbar = ({ token, handleToken, setInput, user }) => {

  const avatar = user?.account?.avatar?.secure_url;

  return (
    <nav className="container flex justify-between items-center gap-4 py-1">
      <Link to="/">
        <img src="/icons/logo.svg" alt="vinted logo" />
      </Link>

      <div className="hidden md:block searchbar relative max-w-[550px] grow">
        <input 
          type="text"
          placeholder="Recherche des articles" 
          onChange={(e)=> {
            setInput(e.target.value)
          }}
        />
        <img src="/icons/search.svg" alt="search" />
      </div>

      <div className="whitespace-nowrap">
        {token ? (
          <div className="flex items-center">
            <Link to="/user" className="flex items-center mr-4 text-[#017b86]">
              <img className="w-8 mr-1" src={`${avatar? avatar : "/icons/account.svg"}`} alt="user icon"/>
              <span>
                {user?.account?.username}
              </span>
            </Link>           
            <button className="mr-3 bg-pink-700 text-slate-50 border-1 border-rose-400"
              onClick={()=>{ handleToken(null)}}       
            >
              Se deconnecter
            </button>
          </div>
        ) : (
          <>
            <Link to="/signup">
              <button className="mr-3 text-[#017b86]">{`S'inscire`}</button>
            </Link>
            <Link to="/login">
              <button className="text-[#017b86]">Se connecter</button>
            </Link>
          </>
        )}
      </div>
      <Link to="/publish">
        <button className="bg-[#017b86] text-slate-50">Vend tes articles</button>
      </Link>  
    </nav>
  );
};

export default Navbar;