import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import styles from "./Home.module.css";
import SignOutButton from './SignOutButton';
import Taskadder from './Taskadder';
import { auth,db } from '../../firebase';
import RealTimeTasks from './RealTimeTasks';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import NotificationsIcon from '@mui/icons-material/Notifications';



function Home(props) {
  console.log("executed Home");
  const [showNotificationOverlay, setShowNotificationOverlay] = useState(false); // State for showing the overlay
  const [notifications, setNotifications] = useState(["1", "2"]); // State for notifications
  const currentUser = auth.currentUser;
  const navigate = useNavigate();
  const toggleNotificationOverlay = () => {
    setShowNotificationOverlay(!showNotificationOverlay);
  };
  useEffect(() => {
    // Redirect to the login page if the user is not logged in
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const addNotification = (notification) => {
    setNotifications([...notifications, notification]);
  };


 return (
    <div className={styles.mainbox}>
        <div className={styles.header}>
            <h4>
                <Link to="/login"><LoginIcon /></Link>

            </h4>
            
            <h4>
                <Link to="/signup"><PersonAddAlt1Icon/></Link>
            </h4> 
            
            <h4>{currentUser.displayName}</h4>
            <div>
          {/* Button to open/close the notification overlay */}
          <button onClick={toggleNotificationOverlay}><NotificationsIcon /></button>
        </div>
            <div> <SignOutButton /></div>

        </div>
        <div className={styles.mainarea}>
        <Taskadder userName={props.name}/>
        {currentUser?
        <RealTimeTasks id={currentUser.uid}/>:<></>
        }
        
        
        </div>
        
       

       
    </div>
  )
}

export default Home
