import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const clickLogOut = () => {
    const auth = getAuth();
    signOut(auth)
    navigate("/")
  }
  return(
    <>
      <button onClick={clickLogOut}>Log Out</button>
    </>
  );
}

export default Profile;