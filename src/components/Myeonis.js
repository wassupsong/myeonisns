import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { firebaseStore } from "fbase";

const Myeonis = ({ myeonisObj, isCreator }) => {
  const [newMyeonis, setNewMyeonis] = useState(myeonisObj.text);
  const [isEditing, setIsEditing] = useState(false);
  const deleteMyeonis = async(e) => {
    const alertConfirm = window.confirm("Are you sure want to delete this myeonis?")
    const d = doc(firebaseStore, "myeonis", myeonisObj.id)
    if(alertConfirm) await deleteDoc(d);
  }
  const editMyeonis = async(e) => {
    e.preventDefault();
    const d = doc(firebaseStore, "myeonis", myeonisObj.id)
    await updateDoc(d, {
      text : newMyeonis
    })
    setIsEditing(false)
  }
  const toggleEdit = (e) => setIsEditing(prev => !prev);
  const inputChange = (e) => {
    const { target : {value}} = e;
    setNewMyeonis(value)
  }
  return(
    <div>
      <h3>{myeonisObj.text}</h3>
      {isEditing ? 
        <>
          <form onSubmit={editMyeonis}>
            <input type="text" onChange={inputChange} placeholder="edit here" value={newMyeonis}/>
            <input type="submit" value="edit"/>
          </form>
          <button onClick={toggleEdit}>cancel</button>
        </> : 
        isCreator ? 
          <>
            <button onClick={deleteMyeonis}>Delete</button>
            <button onClick={toggleEdit}>Edit</button>
          </> : null}
    </div>
  );
}

export default Myeonis;