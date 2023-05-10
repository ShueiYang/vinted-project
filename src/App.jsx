import "./App.css"
import Header from "./components/header/Header";
import { Routes, Route, Navigate, } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./pages/Home";
import Offer from "./pages/Offer"
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import PrivateRoutes from "./components/PrivateRoutes";
import Publish from "./pages/Publish";
import Profile from "./pages/Profile";
import NotFoundPage from "./pages/404";
import Footer from "./components/footer/Footer";
import Modal from "./components/Modal";
import ResetPassword from "./pages/ResetPassword";
import useSearchDebounce from "./hooks/useSearchDebounce";
import Payment from "./pages/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


function App() {

  const [ token, setToken ] = useState(Cookies.get("vintedToken" || null));
  const [ user, setUser ] = useState(null);
  const [ visible, setVisible ] = useState(false);
  // custom  search debounce
  const [ search, setSearch ] = useSearchDebounce();

  const stripePromise = loadStripe(
    "pk_test_51N5rJgBVBg8h4b2rCeRDB0kIpG7xNLkmsEsWxc6z3kjkJIhhjUAntaeTYovKLSpohoriSMKvrdr10pXfZ96RnVk400klEweLkG"
  )
  
  useEffect(()=> {
    async function fetchUser() {
      try {
        if(token) {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          })
          if(response.status === 200) {
            const userData = await response.json();
            setUser(userData);
          } else {
            setToken(null)
            Cookies.remove("vintedToken");
          } 
        }
      } catch (err) {
        console.error(err)
      }
    } 
    fetchUser(); 
  },[token]);
 

  function handleToken (token) {
    if(token) {
      setToken(token)
      Cookies.set("vintedToken", token, {expires: 7, sameSite: "Strict"});
    } else {
      setToken(null)
      setUser(null)
      Cookies.remove("vintedToken");
    }
  }

  return (
    <>
      <Header 
        token={token}
        handleToken={handleToken}
        user={user}
        setSearch={setSearch}
      />   
      <Routes>
        <Route path="/" element={<Home search={search}/>} />
        <Route  path="/login" element={
          <Login 
            token={token}
            user={user}
            handleToken={handleToken}
            visible={visible}
            setVisible={setVisible} 
            />} 
          />
        <Route  path="/signup" element={<SignUp handleToken={handleToken} />} />
        <Route path="/offer/:id" element={<Offer />}/> 
        <Route path="/404" element={ <NotFoundPage />} />  
        <Route path="/reset-password" element={ <ResetPassword />} />  
        <Route path="*" element={<Navigate replace to="/404" />} />                    
        <Route element={<PrivateRoutes user={user} token={token} />}>   
          <Route path="/publish" element={<Publish token={token} />} />
          <Route path="/user" element={<Profile token={token} user={user}/>} />
          <Route path="/payment" element={
            <Elements stripe={stripePromise}>
              <Payment token={token} user={user}/>
            </Elements>
          } />
        </Route>
      </Routes>   

      <Footer />
      {visible && <Modal setVisible={setVisible}/>}     
    </>
  )
}

export default App;
