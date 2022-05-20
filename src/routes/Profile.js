import { firebaseAuth, firebaseStore } from "fbase";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userData, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userData.displayName);
  // useEffect(() => {
  //   getMyMyeonis();
  // }, []);
  // const getMyMyeonis = async () => {
  //   const q = query(
  //     collection(firebaseStore, "myeonis"),
  //     where("creatorId", "==", userData.uid)
  //   );
  //   const querySnapShot = await getDocs(q);
  //   querySnapShot.forEach((doc) => {
  //     console.log(doc.id, "=>", doc.data());
  //   });
  // };
  const navigate = useNavigate();
  const clickLogOut = () => {
    const auth = getAuth();
    signOut(auth);
    navigate("/");
  };
  const updateProfileData = async (e) => {
    e.preventDefault();
    if (userData.displayName !== newDisplayName) {
      await updateProfile(firebaseAuth.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  const onChangeDisplayName = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  return (
    <div className="profile_container">
      <form onSubmit={updateProfileData} className="auth_form">
        <input
          type="text"
          placeholder="이름"
          value={newDisplayName}
          onChange={onChangeDisplayName}
          className="auth_input"
        />
        <input type="submit" value="프로필 수정" />
        <br></br>
        <button onClick={clickLogOut} className="logout">
          로그아웃
        </button>
      </form>
    </div>
  );
};

export default Profile;
