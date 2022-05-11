import React, { useState } from "react";
import AppRouter from "components/Router";
import { firebaseAuth } from "fbase"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(firebaseAuth.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <footer>&copy; {new Date().getFullYear()} myeonisns</footer>
    </>
  )
}

export default App;
