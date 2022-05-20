import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { firebaseAuth } from "fbase";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        const displayName = !user.displayName ? user.email : user.displayName;
        setUserData({
          displayName: displayName,
          photoUrl: user.photoURL,
          uid: user.uid,
          updateProfile: (args) =>
            updateProfile(user, { displayName: user.displayName }),
        });
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = firebaseAuth.currentUser;
    setUserData({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) =>
        updateProfile(user, { displayName: user.displayName }),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userData={userData}
        />
      ) : (
        "initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} myeonisns</footer>
    </>
  );
}

export default App;
