import React from 'react'
import {auth, db} from "../../firebase";
import { updateDoc, collection, doc, setDoc} from 'firebase/firestore';
import styles from "./Home.module.css";

const UpdateButton = (props) => {
    const id = props.id;
    const user = auth.currentUser;
    const updatedata = async()=>{
        try {
            const userRef = collection(db, "users");
            const TaskRef = doc(userRef, user.uid);
            const TaskCol = collection(TaskRef, "Tasks");
            const docRef = doc(TaskCol, id);
            if(props.DueDate!==null){
            
            await updateDoc(docRef,{
                Title: props.Title,
                Description: props.Description,
                DueDate: props.DueDate
                
            });
            alert("saved");
        } else{
            alert("Select a DueDate");
        }
            
        
       
         }
         catch (error) {
            console.error('Error adding document to subcollection: ', error);
          }
    };
  return (
    <button onClick={updatedata} className={styles.updatebutton} style={{backgroundColor:"green"}}>Save</button>
  )
}

export default UpdateButton