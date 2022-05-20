import React, { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FaGoogle, FaGithub } from "react-icons/fa";

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const inputChange = (e) => {
    const {
      target: { value, name },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const authSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    let data;
    try {
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.log(error.code);
      const code = error.code;
      let errorMessage;
      if (code == "auth/wrong-password") {
        errorMessage = "비밀번호를 잘못 입력했습니다.";
      } else if (code == "auth/user-not-found") {
        errorMessage = "존재하지 않는 계정입니다. 가입해주세요!";
      } else if (code == "auth/weak-password") {
        errorMessage = "비밀번호는 6자리 이상 입력해주세요.";
      } else if (code == "auth/email-already-in-use") {
        errorMessage = "이미 존재하는 사용자입니다. 로그인해주세요.";
      }
      alert(errorMessage);
    }
  };
  const joinOtherAccount = async (e) => {
    const {
      target: { name },
    } = e;
    const auth = getAuth();
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }

    await signInWithPopup(auth, provider);
  };
  return (
    <div className="auth_main">
      <div className="auth_form">
        <form onSubmit={authSubmit}>
          <p className="auth_head">Myeoni</p>
          <input
            className="auth_input"
            onChange={inputChange}
            value={email}
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <input
            className="auth_input"
            onChange={inputChange}
            value={password}
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <input
            className="auth_input"
            type="submit"
            value={newAccount ? "회원가입" : "로그인"}
          />
        </form>
        <span onClick={toggleAccount} className="auth_toggle">
          {newAccount ? "로그인하기" : "회원가입하기"}
        </span>
        <div className="socialBtn">
          <button name="google" onClick={joinOtherAccount}>
            <FaGoogle className="auth_icon" size={20} />
            Google 로그인
          </button>
          <button name="github" onClick={joinOtherAccount}>
            <FaGithub className="auth_icon" />
            GitHub 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
