import { useState } from "react"



const Modal = ({setVisible}) => {
   
   const [ loading, setLoading ] = useState(false); 
   const [ mailSend, setMailSend ] = useState(false);
   const [ email, setEmail ] = useState("");
   const [ error, setError ] =  useState(false);  

 
    async function submitForgotPassword(event) {
        event.preventDefault();
        setLoading(true)
        try {          
            await fetch(`${import.meta.env.VITE_API_URL}/user/forgot-password`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                  email, 
                })
            })
            setLoading(false);      
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            setMailSend(true);
        }
    }

  return (
    <div 
        className="modal-root" 
        onClick={()=> {setVisible(false)}}
    >
        <div 
            className="modal" 
            onClick={(event)=> {event.stopPropagation()}}
        >
            <div className="flex w-full justify-end">
              <button onClick={()=> {setVisible(false)}} className="w-8">
                X
              </button>
            </div>

        { !mailSend ?

            <form
                className="flex flex-col gap-5 justify-center items-center"
                onSubmit={submitForgotPassword}
            >
                <h3>Reinitialisation mot de passe</h3>
                <label htmlFor="email" className="flex justify-center">
                <input
                    className="inputField w-[80%]"
                    id="email"
                    type="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    placeholder="Votre Email"
                />
                </label>
                <button className="bg-[#017b86] text-slate-50 text-xl mt-6"> 
                     {loading ? "En cours..." : "Envoyer"} 
                </button>
            </form> 

         :  <div className="flex flex-col items-center">
                <h3 className="mt-5 text-center">
                 { error ? "Une erreur est survenue" : "Le lien pour reinitialiser a ete envoye dans votre boite mail"}
                </h3>       
                <button onClick={()=> {setVisible(false)}} className="bg-[#017b86] text-slate-50 text-xl mt-6"> 
                    OK
                </button>
            </div>
        }
        </div>
    </div>
  )
}

export default Modal;