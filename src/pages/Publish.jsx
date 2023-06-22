import { useState } from "react";
import InputForm from "../components/InputForm";
import DropFileInput from "../components/DropFileInput";
import useAuthUserAction from "../hooks/useAuthUserAction";


const Publish = ({token}) => {
  
  const [ publishForm, setPublishForm] = useState({
    picture: [],
    title: "",
    description: "",
    brand: "",
    size: "",
    color: "",
    condition: "",
    city: "",
    price: "",
  })

  function handleChange (event) {
    const { id, value } = event.target;
    setPublishForm({
      ...publishForm,
      [id]: value
    })
  }
  function handlePictureChange(file) {  
    setPublishForm({
      ...publishForm, 
      picture: file
    })
  }
  function resetForm() {
    setPublishForm({
      picture: [],
      title: "",
      description: "",
      brand: "",
      size: "",
      color: "",
      condition: "",
      city: "",
      price: "",
    })
  }

  // custom hook
  const { loading, error, success, handleSubmit } = useAuthUserAction(token);


  return ( 
  
    <fieldset className="mt-[6.5rem] w-full h-full flex">  
      <legend className="mx-auto"><h3>Vends ton article</h3></legend>   
    
      <form 
        className="container flex flex-col"
        onSubmit={(event) => {handleSubmit(event, publishForm, resetForm)}}
      >  
        <DropFileInput 
          pictures={publishForm.picture}
          handlePictureChange={handlePictureChange}
        />
        
        <div className="flex flex-col my-8">
          <InputForm
            id="title"
            inputValue={publishForm.title}
            handleChange={handleChange}
            placeholder="ex: chemise sezame verte"
          > 
            Titre
          </InputForm>

          <div className="flex flex-col md:flex-row w-[85%] h-40 md:h-32 justify-center mx-auto py-5 border-b border-neutral-200">
            <label className="flex flex-1 items-center max-h-[35px] px-4" htmlFor="description">
              Decris ton article
            </label>
            <textarea 
              className="publishField resize-none"
              id="description"
              value={publishForm.description}
              placeholder="ex: portee quelquefois, taille 44" 
              rows="6"  
              onChange={handleChange}     
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col">
          <InputForm
            id="brand"
            inputValue={publishForm.brand}
            handleChange={handleChange}
            placeholder="ex: Zara"
          > 
            Marque
          </InputForm>

          <InputForm
            id="size"
            inputValue={publishForm.size}
            handleChange={handleChange}
            placeholder="ex: L/40/12"
          > 
            Taille
          </InputForm>

          <InputForm
            id="color"
            inputValue={publishForm.color}
            handleChange={handleChange}
            placeholder="ex: Turquoise"
          > 
            Couleur
          </InputForm>

          <InputForm
            id="condition"
            inputValue={publishForm.condition}
            handleChange={handleChange}
            placeholder="ex: neuf avec etiquette"
          > 
            Etat
          </InputForm>

          <InputForm
            id="city"
            inputValue={publishForm.city}
            handleChange={handleChange}
            placeholder="ex: Paris"
          > 
            Lieu
          </InputForm>
        </div>

        <div className="mt-4">
          <InputForm
            id="price"
            inputValue={publishForm.price}
            handleChange={handleChange}
            placeholder="0.00€"
          > 
            Prix
          </InputForm>
        </div> 
        <div className="h-12">
          {success  &&
            <p className="mt-6 text-teal-500 text-center">{success}</p>
          } 
          {error  &&
            <p className="mt-6 text-red-500 text-center">{error}</p>
          }   
         </div>
        <button className="bg-[#017b86] mx-auto text-slate-50 w-[85%] sm:w-44 h-10 my-10 text-xl sm:text-sm">
          {loading ? "En cours..." : "Ajouter"} 
        </button>
      </form>

    </fieldset>       
  )
}

export default Publish;