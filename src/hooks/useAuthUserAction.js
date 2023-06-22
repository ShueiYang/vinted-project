import { useState } from "react";


function useAuthUserAction (token)  {
    
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(false);

  const [ pwLoading, setPwLoading ] = useState(false);
  const [ pwError, setPwError ] = useState(null);
  const [ pwValidate, setPwValidate ] = useState(false);


  async function handleSubmit(event, publishForm, resetForm) {
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


  async function handleUpdateUser(event, profile) {
      event.preventDefault();
      setLoading(true);
      setSuccess(false);
      setError(null);
      try {
        const formData = new FormData();
        const formField = Object.entries(profile);
        formField.forEach(([key, value]) => {
          if(key === "avatar") {
            // check if the value is a new file
            if(value instanceof File) {
              formData.append(key, value)
            } 
          } else {
            if(value !== undefined) {
              formData.append(key, value);
            }
          }
        })
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/update`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: formData
          }
        )
        await response.json();
        if(response.ok) {
          setSuccess("Profile a bien été mis à jour")
        } else if (response.status === 400) {
          setError("Seul les fichiers de type Image sont acceptés")
        }  
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }


    async function handleEditPassword(event, credential, setCredential) {
      event.preventDefault();
      setPwLoading(true);
      setPwValidate(false);
      setPwError(null);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/update-password`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(credential)
          }
        )
        const data = await response.json();
        if(response.ok) {
          setPwValidate("Mot de passe a bien été mis à jour")
          //reset the state
          setCredential(prevState => {
            return {
              ...prevState,
              oldPassword: "",
              newPassword: "",
            }
          })
        } else if (response.status === 401 && data.message === "New password must be different than the previous one") {
          setPwError("Le nouveau mot de passe doit etre different de l'ancien")
        } else if (response.status === 401) {
          setPwError("Mauvais mot de passe")
        } else if (response.status === 400) {
          setPwError("Le nouveau mot de passe doit comporter au moins 8 caractères")
        }   
      } catch (err) {
        console.error(err)
      } finally {
        setPwLoading(false)
      }
    }

  return {
    loading,
    success,
    error,
    handleSubmit,
    handleUpdateUser,
    handleEditPassword,
    pwLoading,
    pwValidate,
    pwError
  }
}

export default useAuthUserAction;