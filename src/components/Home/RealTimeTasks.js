import React, { useEffect, useState } from 'react'
import {onSnapshot, collection, doc,docs} from "firebase/firestore";
import {auth,db} from "../../firebase";
import TaskCard from './TaskCard';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const RealTimeTasks = (props) => {
  
 

  
  
    const [tasks, setTasks] = useState([])
    const userRef = collection(db, 'Tasks');
    const [selectedFilter, setSelectedFilter] = useState("");
    
    const handleFilterSelect = (event) => {
      const selectedOption = event.target.value;
      setSelectedFilter(selectedOption);
  };
  const filteredTasks = tasks.filter(task => {
    if (selectedFilter === "") {
      return true; // Show all tasks when no filter is selected
    } else {
      return task.data.Status === selectedFilter; // Show tasks matching the selected filter
    }
  });

    useEffect(()=>{
      const unsubscribe = onSnapshot(userRef, (snapshot) => {
        setTasks(
          snapshot.docs
            .filter((doc) => {
              const data = doc.data();
              return data.AssignedByid === props.id || data.AssignedToid === props.id;
            })
            .map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
    
      return () => {
        unsubscribe();
      };
    
    
    },[])

    return (
     <div>
      <h2 style={{color:"whitesmoke"}}>
        Tasks
      </h2>
      <div>
        <div style={{color:"white"}}><FilterAltIcon /></div>
      <select onChange={handleFilterSelect}>
        <option value="">Show All</option>
        <option value="Pending">Show Pending Only</option>
        <option value="Completed">Show Completed Only</option>
      </select>
      
      </div>
      <div>
        { 
          filteredTasks.map(task=>(
            <li key={task.id}>

              <TaskCard id={task.id} Title={task.data.Title} Description={task.data.Description} Status={task.data.Status} DueDate={task.data.DueDate} AssignedTo={task.data.AssignedTo} AssignedBy={task.data.AssignedBy} />
            </li>
          ))
        }
      </div>
     </div>
    )};
 

export default RealTimeTasks
