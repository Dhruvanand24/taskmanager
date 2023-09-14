import React from 'react'
import {auth, db} from "../../firebase";
import {collection, doc, addDoc} from 'firebase/firestore';
import styles from "./Home.module.css";

const CommentAdder = (props) => {
    const id = props.id;
    const user = auth.currentUser;
    const updatedata = async()=>{
        try {
            const userRef = collection(db, "users");
            const TaskRef = doc(userRef, user.uid);
            const TaskCol = collection(TaskRef, "Tasks");
            const docRef = doc(TaskCol, id);
            const comRef = collection(docRef, "Comments");
            
            
            await addDoc(comRef,{
                Comment: props.comment,
                Name:user.displayName,

                
            });
            alert("saved");
         
            
        
       
         }
         catch (error) {
            console.error('Error adding document to subcollection: ', error);
          }
    };
  return (
    <button onClick={updatedata} className={styles.updatebutton} style={{backgroundColor:"green"}}>Add</button>
  )
}

export default CommentAdder