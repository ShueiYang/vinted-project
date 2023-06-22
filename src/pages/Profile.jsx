import { useState } from "react";
import useAuthUserAction from "../hooks/useAuthUserAction";

const Profile = ({ token, user }) => {
  const avatarPic = user?.account?.avatar?.secure_url;

  const [ profile, setProfile ] = useState({
    username: user.account.username,
    avatar: avatarPic ? avatarPic : "/icons/account.svg",
    newsletter: user.newsletter,
  });
  const [credential, setCredential] = useState({
    oldPassword: "",
    newPassword: "",
  });

  function handleChange(event) {
    const { id, value, type, checked, files } = event.target;
    setProfile({
      ...profile,
      [id]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    });
  }
  function handlePassword(event) {
    const { id, value } = event.target;
    setCredential({
      ...credential,
      [id]: value,
    });
  }

  // custom hook
  const { 
    loading, 
    success,
    error,
    handleUpdateUser, 
    handleEditPassword,
    pwLoading, 
    pwValidate,
    pwError
  } = useAuthUserAction(token);


  return (
    <fieldset className="container h-full mt-[8.5rem] mb-16">
      <legend className="text-4xl mx-auto mb-12">Détail du Profile</legend>
      <div
        className="flex flex-col gap-4 justify-center items-center w-[85%] h-full sm:max-w-[600px] mx-auto"
      >
        <form 
          className="profile w-full flex-1 flex gap-3"
          onSubmit={(event) => {handleUpdateUser(event, profile)}}
        >   
          <div className="flex-1">
            {profile.avatar instanceof File ? (
                <img
                  className="w-52 aspect square my-4"
                  src={URL.createObjectURL(profile.avatar)}
                  alt="avatar"
                />
            ) : (
                <img
                  className="w-52 aspect square my-4"
                  src={avatarPic ? avatarPic : "/icons/account.svg"}
                  alt="avatar"
                />
            )}
            <input id="avatar" type="file" onChange={handleChange} />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="username">
                Nom utilisateur
              <input
                className="inputField border-2 border-zinc-300"
                id="username"
                type="text"
                onChange={handleChange}
                value={profile.username}
                placeholder="Nom d'utilisateur"
              />
            </label>

            <label
              className="text-center flex flex-col items-center justify-center mt-2"
              htmlFor="newsletter"
            >
              <div className="flex items-center w-full">
                <input
                    className="w-6 h-5"
                    id="newsletter"
                    type="checkbox"
                    checked={profile.newsletter}
                    onChange={handleChange}
                />
                <span className="ml-4 text-gray-500">
                    S&apos;inscrire à notre newsletter
                </span>
              </div>
            </label>
        
            <button className="bg-[#017b86] text-xl text-slate-50 min-h-[40px] mt-2">
              {loading ? "En cours..." : "Mise a jour Profile"}   
            </button>
            <div className="h-12">
              {success  &&
                <p className="mt-6 text-teal-500 text-center">{success}</p>
              } 
              {error  &&
                <p className="mt-6 text-red-500 text-center">{error}</p>
              }   
            </div>
          </div>
        </form>

        <div className="w-full h-0.5 my-4 bg-slate-200"></div>

        <form 
          className="flex flex-col justify-end gap-4 max-w-[300px]"
          onSubmit={(event) => {handleEditPassword(event, credential, setCredential)}}
        >
            <label className="" htmlFor="oldPassword">
              Ancien Mot de passe
              <input
                className="inputField border-2 border-zinc-300"
                id="oldPassword"
                type="password"
                onChange={handlePassword}
                value={credential.oldPassword}
                placeholder="Mot de passe actuel"
              />
            </label>

            <label className="" htmlFor="newPassword">
              Nouveau mot de passe
              <input
                className="inputField border-2 border-zinc-300"
                id="newPassword"
                type="password"
                onChange={handlePassword}
                value={credential.newPassword}
                placeholder="Nouveau Mot de passe"
              />
            </label>
          <button className="bg-[#017b86] text-xl text-slate-50 min-h-[40px] mt-4">
            {pwLoading ? "En cours..." : "Mise a jour Mot de passe"}  
          </button>
          <div className="h-12">
            {pwValidate  &&
              <p className="mt-6 text-teal-500 text-center">{pwValidate}</p>
            } 
            {pwError  &&
              <p className="mt-6 text-red-500 text-center">{pwError}</p>
            }   
          </div>
        </form>     
      </div>
    </fieldset>
  );
};

export default Profile;