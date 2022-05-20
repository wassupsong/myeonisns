import React, { useEffect, useRef, useState } from "react";

import { FaRegPaperPlane } from "react-icons/fa";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { firebaseStore } from "fbase";
import Talk_Message from "components/Talk_Message";

const Talk = ({ userData }) => {
  const [sendMs, setSendMs] = useState("");
  const [receiveMs, setReceiveMs] = useState([]);
  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "오후" : "오전";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = ampm + " " + hours + ":" + minutes;
    return strTime;
  };
  useEffect(() => {
    const que = query(
      collection(firebaseStore, "myeoniTalk"),
      orderBy("regDateMS")
    );
    onSnapshot(que, (snapShot) => {
      let receiveMsList = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReceiveMs(receiveMsList);
    });
  }, []);

  const inputChange = (e) => {
    const {
      target: { value },
    } = e;
    setSendMs(value);
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const add = await addDoc(collection(firebaseStore, "myeoniTalk"), {
        text: sendMs,
        regDate: formatAMPM(new Date()),
        sendId: userData.uid,
        sendDisplayName: userData.displayName,
        sendPhotoUrl: userData.photoUrl,
        regDateMS: Date.now(),
      });
      setSendMs("");
    } catch (error) {
      console.log(error);
    }
  };
  const messageBoxRef = useRef();
  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [receiveMs]);

  return (
    <div className="talk_container">
      <div className="talk_header">
        <h2 className="talk_header_title">MyeoniTalk</h2>
      </div>
      <div className="talk_main" ref={messageBoxRef}>
        {receiveMs.map((ms) => (
          <Talk_Message
            key={ms.id}
            msObj={ms}
            isCreator={ms.sendId === userData.uid}
          />
        ))}
      </div>
      <div className="talk_input">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="채팅을 입력하세요"
            value={sendMs}
            onChange={inputChange}
          />
          <button type="submit">
            <FaRegPaperPlane className="nav_icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Talk;
