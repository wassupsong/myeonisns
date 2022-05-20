import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { firebaseStore, firebaseStorage } from "fbase";
import { deleteObject, ref } from "firebase/storage";
import { FaEllipsisH, FaRegHeart } from "react-icons/fa";
import defaultUserIcon from "icon/abstract-user-flat-3.png";

const Myeonis = ({ myeonisObj, isCreator }) => {
  const [newMyeonis, setNewMyeonis] = useState(myeonisObj.text);
  const [isEditing, setIsEditing] = useState(false);
  const deleteMyeonis = async (e) => {
    const alertConfirm = window.confirm(
      "Are you sure want to delete this myeonis?"
    );
    const d = doc(firebaseStore, "myeonis", myeonisObj.id);
    const storageRef = ref(firebaseStorage, myeonisObj.uploadFile);
    if (alertConfirm) {
      await deleteDoc(d);
      await deleteObject(storageRef);
    }
  };
  const editMyeonis = async (e) => {
    e.preventDefault();
    const d = doc(firebaseStore, "myeonis", myeonisObj.id);
    await updateDoc(d, {
      text: newMyeonis,
    });
    setIsEditing(false);
  };
  const toggleEdit = (e) => setIsEditing((prev) => !prev);
  const inputChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewMyeonis(value);
  };
  console.log(myeonisObj.creatorPhoto);
  return (
    <div className="home_myeonis">
      <div className="myeonis_profile">
        <img
          src={
            !myeonisObj.creatorPhoto ? defaultUserIcon : myeonisObj.creatorPhoto
          }
          className="myeonis_userphoto"
        />
        <span className="myeonis_name">{myeonisObj.creatorDisplayName}</span>
        {isCreator ? (
          <div className="">
            <button onClick={deleteMyeonis}>Delete</button>
            <button onClick={toggleEdit}>Edit</button>
          </div>
        ) : null}
      </div>
      <div className="myeonis_content">
        {myeonisObj.uploadFile && (
          <img src={myeonisObj.uploadFile} className="myeonis_uploadfile" />
        )}
        <p className="myeonis_text">{myeonisObj.text}</p>
        {isEditing ? (
          <div className="popup_edit">
            <form onSubmit={editMyeonis}>
              <input
                type="text"
                onChange={inputChange}
                placeholder="edit here"
                value={newMyeonis}
              />
              <input type="submit" value="edit" />
            </form>
            <button onClick={toggleEdit}>cancel</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Myeonis;
