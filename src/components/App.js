import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { firebaseAuth } from "fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user){
        setIsLoggedIn(true);
        setUserData(user)
      }else{
        setIsLoggedIn(false);
        setUserData(null);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userData={userData} /> : "initializing..."}
      <footer>&copy; {new Date().getFullYear()} myeonisns</footer>
    </>
  )
}

export default App;
