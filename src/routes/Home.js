import React, { useEffect, useState } from "react";
import { firebaseStore } from "fbase";
import { collection, addDoc, getDocs, orderBy, onSnapshot, query } from "firebase/firestore";
import Myeonis from "components/Myeonis";

const Home = ({ userData }) => {
  const [sendMs, setSendMs] = useState("");
  const [receiveMs, setReceiveMs] = useState([]);
  const [uploadFile, setUploadFile] = useState("");
  useEffect(() => {
    const que = query(collection(firebaseStore, "myeonis"), orderBy("regDate", "desc"));
    onSnapshot(que, (snapShot) => {
      let receiveMsList = snapShot.docs.map((doc) => ({
        id : doc.id,
        ...doc.data()
      }));
      setReceiveMs(receiveMsList)
    })
  }, []);
  
  const setInput = (e) => {
    const {target : {value}} = e;
    setSendMs(value)
  }
  const sendMessage = async(e) => {
    e.preventDefault();
    try {
      const add = await addDoc(collection(firebaseStore, "myeonis"), {
        text : sendMs,
        regDate : Date.now(),
        creatorId : userData.uid
      })
      setSendMs("");
    } catch (error) {
      console.log(error)
    }
  }
  const fileChange = (e) => {
    const { target : { files } } = e;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) =>{
      const { currentTarget : { result } } = finishedEvent;
      setUploadFile(result);
    }
    reader.readAsDataURL(file);
  }
  const clearUploadFile = (e) => setUploadFile(null);
  return(
    <div>
      <form onSubmit={sendMessage}>
        <input type="text" value={sendMs} onChange={setInput} />
        <input type="file" onChange={fileChange} accept="image/*"/>
        <input type="submit" value="submit" />
        {uploadFile && 
          <div>
            <img src={uploadFile} width="50px" height="50px"/>
            <button onClick={clearUploadFile}>clear</button>
          </div>}
      </form>
      <div>
        {receiveMs.map((ms) =>(
          <Myeonis key={ms.id} myeonisObj={ms} userData={userData} isCreator={ms.creatorId === userData.uid}/>
        ))}
      </div>
    </div>
  )
}

export default Home;