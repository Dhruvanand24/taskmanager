import {React, useState} from 'react'
import {auth, db} from "../../firebase";
import { updateDoc, collection, doc, setDoc} from 'firebase/firestore';
import styles from "./Home.module.css";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import DoneIcon from '@mui/icons-material/Done';

const CompletedButton = (props) => {
    const id = props.id;
    const user = auth.currentUser;
    const [status, setStatus] = useState(props.status);

    const updatedata = async()=>{
        try {
            const userRef = collection(db, "Tasks");
            const TaskRef = doc(userRef, id);
            if(status==="Completed"){
            await updateDoc(TaskRef,{
                Status: "Pending"
                
            });
            setStatus("Pending");
            
        };  
        if(status==="Pending"){
            await updateDoc(TaskRef,{
                Status: "Completed"
                
            });
            setStatus("Completed");
            
        };   
       
         }
         catch (error) {
            console.error('Error adding document to subcollection: ', error);
          }
    };
  return (
    <button onClick={updatedata} className={styles.addtaskbutton}>{status==="Completed"?<PendingActionsIcon />:<DoneIcon />}</button>
  )
}

export default CompletedButton
