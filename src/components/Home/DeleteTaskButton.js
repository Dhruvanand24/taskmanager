import React from 'react';
import {auth, db} from "../../firebase";
import {doc, collection, deleteDoc} from "firebase/firestore";
import styles from "./Home.module.css";
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteTaskButton = (props) => {
  const id = props.id;
  const user = auth.currentUser;
  const deletedata = async()=>{
    try {
        const taskRef = doc(db, 'users', user.uid, 'Tasks', id);
        await deleteDoc(taskRef);
        alert("completed");
     }
     catch (error) {
        console.error('an error occured ', error);
      }
};
  return (
    <button onClick={deletedata} className={styles.deletebutton}><DeleteIcon /></button>
  )
}

export default DeleteTaskButton
