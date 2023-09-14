import React from 'react'
import {collection, addDoc, doc} from "firebase/firestore";
import { db, auth } from '../../firebase';
import styles from "./Home.module.css";
import AddTaskIcon from '@mui/icons-material/AddTask';


const AddTaskButton = (props) => {
    const user = auth.currentUser;
    const data = {
        Title: props.Title,
        Description: props.Description,
        DueDate: props.DueDate,
        AssignedTo: props.AssignedTo,
        AssignedBy: props.AssignedBy,
        AssignedByid: props.AssignedByid,
        AssignedToid: props.SelectedUserId,
        Status: props.Status
    }
   
    const AddTask = async()=>{
      
        if(!props.Title||!props.Description){
            alert("add title and description");
            return;
        }
         try {
            const userRef = collection(db, "Tasks");
            await addDoc(userRef,data );
            
         }
         catch (error) {
            console.error('Error adding document to subcollection: ', error);
          }
    };
  return (
    <button onClick={AddTask} className={styles.addtaskbutton}><AddTaskIcon /></button>
  )
}

export default AddTaskButton
