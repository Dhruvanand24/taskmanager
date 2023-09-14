import {React, useEffect, useState} from 'react'
import styles from "./Home.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {db,auth} from "../../firebase";
import {collection, query, doc, getDocs, getDoc, where} from "firebase/firestore";
import AddTaskButton from './AddTaskButton';




const Taskadder = (props) => {
   const currentUser = auth.currentUser;
    const [selectedDate, setSelectedDate] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [allUsers, setAllusers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({username: "", userId: ""});
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const querySnapshot = await getDocs(collection(db, 'users'));
      
              const usernamesData = [];
      
              querySnapshot.forEach((doc) => {
                const username = doc.data().Name;
                const userId = doc.id;
                usernamesData.push({ username, userId });
              });
      
              // Set the usernames data to the state variable 'data'
              setAllusers(usernamesData);
              
            } catch (error) {
              console.error('Error fetching usernames:', error);
            }
          };
      
          fetchData();
          
    },[])
    const handleUserSelect = (event) => {
     
      const selectedUserId = event.target.value; // Get the selected user's ID
  const selectedUserData = allUsers.find((user) => user.userId === selectedUserId);
  setSelectedUser(selectedUserData);
 
 
  
    };
    
    
  return (
    
    <div className={styles.Taskcard}>
      <h2>Add Tasks</h2>
      <label>Title</label>
      <input placeholder='enter title'value={title} onChange={(event)=>setTitle(event.target.value)}></input>
      <label>Description</label>
      <textarea placeholder="enter description"value={description} style={{width:"80%"}} onChange={(event)=>setDescription(event.target.value)} ></textarea>
      
      <div style={{display:'flex', flexWrap:'wrap'}}>
      <label>Due Date</label>
        <DatePicker selected={selectedDate} onChange={date=>setSelectedDate(date)} />
        <div>
      <label style={{marginLeft:"20px"}}>Assign To</label>
      <select onChange={handleUserSelect}>
        <option value={""}>Select a user</option>
        {allUsers.map((user, index) => (
           user.username !== currentUser.displayName && (
            <option key={index} value={user.userId}>
              {user.username}
            </option>
          )
        ))}
      </select>
      
    </div>
   <AddTaskButton Title={title} Description={description} DueDate={selectedDate} AssignedTo={selectedUser.username} Status = "Pending" AssignedBy={currentUser.displayName} SelectedUserId={selectedUser.userId} AssignedByid={currentUser.uid}/>
    </div>

      
    </div>
  )
}

export default Taskadder
