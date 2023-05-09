import { useState } from "react";


const Profile = ({user}) => {


    const [ username, setUsernane ] = useState(user.account.username)
    // const [ oldPassword, setOldPassword ] = useState("")
    // const [ newPassword, setNewPassword ] = useState("")
    const [ newsletter, setNewsletter] = useState(user.newsletter)

    const avatar = user?.account?.avatar?.secure_url;
  
    return (

        <fieldset className="container h-full mt-[8.5rem] mb-16">     
        <legend className="text-4xl mx-auto mb-12">Profile pas pret :/</legend>      
            <form
            className="flex gap-8 justify-center items-center w-[85%] h-[25rem] sm:max-w-[600px] mx-auto" 
            //   onSubmit={submitSignup}
            > 
            <div className="flex-1">
                <img 
                    className="w-52 aspect square my-4"
                    src={`${avatar? avatar : "/icons/account.svg"}`} alt="avatar" 
                />
                <input 
                    type="file"
                />
            </div>

            <div className="w-full flex-1 flex flex-col gap-3"> 

               <label htmlFor="username">
                    Nom utilisateur
                    <input
                        className="inputField border-2 border-zinc-300"
                        id="username"
                        type="text"
                        onChange={(e)=>{
                          setUsernane(e.target.value)
                        }}
                        value={username}           
                        placeholder="Nom d'utilisateur"
                    />
                </label>

                <label className="" htmlFor="oldpassword">
                    Ancien Mot de passe
                    <input
                        className="inputField border-2 border-zinc-300"
                        id="oldpassword"
                        type="password"
                        // onChange={handleChange}         
                        placeholder="Ancien Mot de passe"
                    />
                </label>
                    
                <label className="" htmlFor="password">
                    Nouveau mot de passe
                    <input
                        className="inputField border-2 border-zinc-300"
                        id="password"
                        type="password"
                        // onChange={handleChange}         
                        placeholder="Nouveau Mot de passe"
                    />
                </label>

                <label className="" htmlFor="checkPassword">
                    Confirmer le Nouveau mot de passe
                    <input
                        className="inputField border-2 border-zinc-300"
                        id="checkPassword"
                        type="password"
                        // onChange={handleChange}         
                        placeholder="Confirmez Mot de passe"
                    />
                </label>

                <label className="text-center flex flex-col items-center justify-center mt-2" htmlFor="newsletter">
                    <div className="flex items-center w-full">
                    <input
                        className="w-6 h-5"
                        id="newsletter"
                        type="checkbox"
                        checked={newsletter}
                        onChange={(e)=>{
                            setNewsletter(e.target.value)
                        }}                      
                    /> 
                        <span className="ml-4 text-gray-500">S&apos;inscrire à notre newsletter</span>        
                    </div>
            
                </label>      
                <button className="bg-[#017b86] text-xl text-slate-50 min-h-[40px] mt-6">
                    Mis a jour
                </button>
              </div>  
            </form>
        </fieldset>  
    )
}

export default Profile;
