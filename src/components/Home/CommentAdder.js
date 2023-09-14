import React from 'react'
import {auth, db} from "../../firebase";
import {collection, doc, addDoc} from 'firebase/firestore';
import styles from "./Home.module.css";

const CommentAdder = (props) => {
    const id = props.id;
    const user = auth.currentUser;
    const updatedata = async()=>{
        try {
            const userRef = collection(db, "Tasks");
            const TaskRef = doc(userRef, id);
            const TaskCol = collection(TaskRef, "Comments");
            
            
            await addDoc(TaskCol,{
                Comment: props.comment,
                Name:user.displayName,

                
            });
            alert("Comment Added");
         
            
        
       
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