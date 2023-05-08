import { Link } from "react-router-dom";


const HeroReady = () => {

  return (
    <>
      <div className="text-2xl  text-center sm:text-left tracking-tight sm:text-3xl sm:tracking-normal">
        <span>Prêts à faire du tri dans vos placards ?</span> 
      </div>
      <Link to="/publish" className="w-full flex justify-center sm:justify-start">     
        <button className="bg-[#017b86] text-slate-50 w-[85%] sm:w-44 h-10 mt-6 text-xl sm:text-sm">
            Commencer à vendre
        </button>
      </Link> 
    </>
  )
}

export default HeroReady;