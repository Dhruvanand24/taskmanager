import React, { useState, useEffect } from 'react'
import styles from "./Home.module.css";
import CompletedButton from './CompletedButton';
import DeleteTaskButton from './DeleteTaskButton';
import UpdateButton from './UpdateButton';
import DatePicker from "react-datepicker";
import CommentAdder from './CommentAdder';
import { collection, getDoc, doc, query, onSnapshot } from 'firebase/firestore';
import {auth, db} from '../../firebase';
import EditIcon from '@mui/icons-material/Edit';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';


const TaskCard = (props) => {
  
  const user = auth.currentUser;
  const statusc = props.Status==="Completed"?"green":"red";
  const [edit, setEdit] = useState(true);
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState();
  const [allComments, setAllcomments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [title, setTitle] = useState(props.Title);
  const [description, setDescription] = useState(props.Description);
  const handleEditToggle = () => {
    setEdit(!edit);
  };
  const handleCommentToggle = () => {
    setShowComment(!showComment);
   
  };
  const userRef = collection(db, 'users');
  const taskRef = doc(userRef, user.uid);
  const taskCol = collection(taskRef, 'Tasks');
  const comRef = doc(taskCol, props.id);
  const comcol = collection(comRef, 'Comments');



  useEffect(()=>{
    const unsubscribe = onSnapshot(comcol, snapshot => {
    setAllcomments(snapshot.docs.map(doc=>({id: doc.id, data:doc.data()})))
    })
  return ()=>{
    unsubscribe()
  }
  
  
  },[])
  
  
  
 
  return (
    
   <div> 
    {edit?(
    <div className={styles.eachtasks}>
        <h4>Title: {props.Title}</h4>
        <h4 style={{marginTop:"-4px"}}>Description:</h4>
        <div className={styles.descriptionbox}><p style={{marginTop:"-4px"}}>{props.Description}</p></div>
        <h4 style={{marginTop:"-4px", color:"grey"}}>DueDate:{new Date(props.DueDate.seconds * 1000).toLocaleDateString("en-US")}</h4>
        <h4 style={{marginTop:"-4px", color:statusc}}>Status: {props.Status}</h4>
        {
            props.AssignedTo!==null && <h4>Assigned to: { props.AssignedTo }</h4>
        }
        {
            props.AssignedBy!==null && <h4>Assigned By: { props.AssignedBy }</h4>
        }
        <div style={{display:'flex', flexWrap:'wrap'}}>
        <CompletedButton id={props.id} status={props.Status} />
        <DeleteTaskButton id={props.id} />
        <button onClick={handleEditToggle} className={styles.updatebutton}><EditIcon/></button>
        <button onClick={handleCommentToggle} className={styles.updatebutton} style={{backgroundColor:"blue"}}>{showComment?<CommentsDisabledIcon />:<AddCommentIcon/>}</button>
        </div>
        {
            showComment?(
            <div>
                <h4>Add Comments</h4>
                <input className={styles.commentadder}value={comments} onChange={(event)=>setComments(event.target.value)}placeholder='type here'></input>
                 <CommentAdder id={props.id} comment={comments}/>
                 {
                    allComments.map((data)=>{
                        return(<div className={styles.commentbox}>
                            <div style={{display:"flex"}}>
                                <h4 style={{marginRight:"5px", color:"gray"}} >username:</h4>
                                <h4 >{data.data.Name}</h4>
                                
                            </div>
                            <div style={{display:"flex"}}>
                                <h4 style={{marginRight:"5px", color:"gray"}} >commented:</h4>
                                <h4>{data.data.Comment}</h4>
                                
                            </div>

                            </div>
                        )
                    })
                 }
                 
            </div>
            
            ):(<></>)
        }

        

    </div>
    ):
    (
    <div className={styles.eachtasks}>
        <h4>Title: </h4>
        <input value={title} onChange={(event)=>setTitle(event.target.value)}></input>
        <h4>Description: </h4>
        <textarea value={description} onChange={(event)=>setDescription(event.target.value)}></textarea>
         <h4>Due Date:</h4>
         <DatePicker selected={selectedDate} onChange={date=>setSelectedDate(date)} />
         <button onClick={handleEditToggle} className={styles.updatebutton}>Close</button>
         <UpdateButton Title={title} Description={description} DueDate={selectedDate} id={props.id}/>
         
         
        </div>
        )
 } </div>
)
}

export default TaskCard
