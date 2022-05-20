import React, { useState } from "react";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { firebaseStorage, firebaseStore } from "fbase";
import { v4 as uuidv4 } from "uuid";
import {
  FaRegWindowClose,
  FaRegPlusSquare,
  FaRegTimesCircle,
} from "react-icons/fa";

const MyeonisFactory = ({ userData, writing }) => {
  const [sendMs, setSendMs] = useState("");
  const [uploadFile, setUploadFile] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      console.log(userData);
      let download = "";
      if (uploadFile) {
        const storageRef = ref(firebaseStorage, `${userData.uid}/${uuidv4()}`);
        const response = await uploadString(storageRef, uploadFile, "data_url");
        download = await getDownloadURL(storageRef);
      }
      const add = await addDoc(collection(firebaseStore, "myeonis"), {
        text: sendMs,
        regDate: Date.now(),
        creatorUid: userData.uid,
        creatorDisplayName: userData.displayName,
        creatorPhoto: userData.photoUrl,
        uploadFile: download,
      });

      setSendMs("");
      setUploadFile("");
    } catch (error) {
      console.log(error);
    }
  };
  const setInput = (e) => {
    const {
      target: { value },
    } = e;
    setSendMs(value);
  };
  const fileChange = (e) => {
    const {
      target: { files },
    } = e;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setUploadFile(result);
    };
    reader.readAsDataURL(file);
  };
  const clearUploadFile = (e) => setUploadFile(null);
  return (
    <div className="factory_container">
      <div className="home_factory_dimm"></div>
      <form onSubmit={sendMessage} className="home_factory">
        <div className="fileview">
          {uploadFile ? (
            <>
              <img src={uploadFile} />
              <button onClick={clearUploadFile}>
                <FaRegWindowClose size={30} />
              </button>
            </>
          ) : (
            <>
              <span className="file_explanation">사진을 선택해보세요</span>
              <label htmlFor="input_file" className="home_factory_file">
                <FaRegPlusSquare />
              </label>
              <input
                id="input_file"
                type="file"
                onChange={fileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </>
          )}
        </div>
        <textarea
          type="text"
          value={sendMs}
          onChange={setInput}
          className="home_factory_textarea"
          placeholder="글을 작성해주세요."
        />
        <input type="submit" value="submit" className="home_factory_submit" />
      </form>
      <FaRegTimesCircle onClick={writing} className="closeBtn" />
    </div>
  );
};

export default MyeonisFactory;
