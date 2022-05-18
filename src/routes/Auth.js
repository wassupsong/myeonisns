import React, { useState } from "react";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  signInWithPopup
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (e) => {
    const { target : {value, name}} = e;
    if(name === "email"){
      setEmail(value)
    }else if(name === "password"){
      setPassword(value)
    }
  }
  const onSubmit = async(e) =>{
    e.preventDefault();
    const auth = getAuth();
    let data;
    try{
      if(newAccount){
        data = await createUserWithEmailAndPassword(auth, email, password)
      }else{
        data = await signInWithEmailAndPassword(auth, email, password)
      }
      console.log(data);
    }catch(error){
      setError(error.message)
    }
  }
  const toggleAccount = () => setNewAccount(prev => !prev)
  const joinOtherAccount = async(e) => {
    const {target : { name }} = e;
    const auth = getAuth();
    let provider;
    if(name === "google"){
      provider = new GoogleAuthProvider();
    }else if(name === "github"){
      provider = new GithubAuthProvider();
    }
    
    await signInWithPopup(auth, provider);
  }
  return(
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={email} name="email" type="email" placeholder="Email" required />
        <input onChange={onChange} value={password} name="password" type="password" placeholder="Password" required />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"}/>
        <span>{error}</span>
      </form>
        <span onClick={toggleAccount}>{newAccount ? "Log In" : "Create Account"}</span>
      <div>
        <button name="google" onClick={joinOtherAccount}>Continue with Google</button>
        <button name="github" onClick={joinOtherAccount}>Continue with GitHub</button>
      </div>
    </div>
  );
}

export default Auth;