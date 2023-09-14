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
        Status: props.Status
    }
   
    const AddTask = async()=>{
      console.log("inside addtask", props.SelectedUserId);
        if(!props.Title||!props.Description){
            alert("add title and description");
            return;
        }
         try {
            const userRef = collection(db, "users");
            const TaskRef = doc(userRef, user.uid);
            const TaskCol = collection(TaskRef, "Tasks");
            await addDoc(TaskCol,data );
            console.log("assigned to",props.AssignedTo);
            console.log(props.SelectedUserId);
            if(props.AssignedTo!==null){
              const taskref = doc(userRef, props.SelectedUserId);
              const taskcol = collection(taskref, "Tasks");
              await addDoc(taskcol, {
                Title: props.Title,
                Description: props.Description,
                DueDate: props.DueDate,
                AssignedBy: user.displayName,
                Status: props.Status,
                
              });
              const notref = collection(taskref, "Notifications");
              await addDoc(notref,{
                  Name: user.displayName,
                  Title: props.Title
              });
            }
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
