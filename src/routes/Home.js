import React, { useEffect, useState } from "react";
import { firebaseStore } from "fbase";
import { collection, orderBy, onSnapshot, query } from "firebase/firestore";
import Myeonis from "components/Myeonis";

const Home = ({ userData }) => {
  const [receiveMs, setReceiveMs] = useState([]);
  useEffect(() => {
    const que = query(
      collection(firebaseStore, "myeonis"),
      orderBy("regDate", "desc")
    );
    onSnapshot(que, (snapShot) => {
      let receiveMsList = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReceiveMs(receiveMsList);
    });
  }, []);

  return (
    <>
      <div className="home_container">
        <div>
          {receiveMs.map((ms) => (
            <Myeonis
              key={ms.id}
              myeonisObj={ms}
              userData={userData}
              isCreator={ms.creatorUid === userData.uid}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
