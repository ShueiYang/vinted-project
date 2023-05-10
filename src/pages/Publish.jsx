import { useState } from "react";
import InputForm from "../components/InputForm";
import DropFileInput from "../components/DropFileInput";


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
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(false)

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
 
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true)
    setSuccess(false);
    setError(null)
    try {
      const formData = new FormData();
      const datasForm = Object.entries(publishForm);

      datasForm.forEach(([key, value])=> {
        if(key === "picture") {
          if(Array.isArray(value)) {
            value.forEach(file => {
              formData.append("picture", file)
            })
          } else {
            formData.append("picture", value)
          }
        } else {
          formData.append(key, value);
        }       
      })
    
      const response = await fetch(`${import.meta.env.VITE_API_URL}/offer/publish`, {
        method: "POST",
      // not setting the content-type header with fetch
        headers: {
          "Authorization": `Bearer ${token}` 
        },
        body: formData
      })
      const data = await response.json();  

      if(response.status === 201) {
        // reset the form if success
        resetForm();
        setSuccess("Votre article a été publié avec succes")
      } 
      if (response.status === 400 && data.message === "Price must be greater than 0 and not exceed 500") {
        setError("Le prix doit etre un nombre compris entre 0 à 500 euros")
      } else if (response.status === 400 && data.message === "Only images files are allowed") {
        setError("Seul les fichiers de type Images sont acceptes")
      } else if (response.status === 400) {
        setError("Veuillez remplir tous les champs :)")
      }      
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return ( 
  
    <fieldset className="mt-[6.5rem] w-full h-full flex">  
      <legend className="mx-auto"><h3>Vends ton article</h3></legend>   
    
      <form 
        className="container flex flex-col"
        onSubmit={handleSubmit}
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