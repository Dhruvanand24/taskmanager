import React from 'react';
import { auth } from '../../firebase'; 
import { useNavigate } from 'react-router-dom';
import styles from "./Home.module.css";
import LogoutIcon from '@mui/icons-material/Logout';

const SignOutButton = () => {
    const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/login");
      
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button onClick={handleSignOut} className={styles.signoutbutton}><LogoutIcon /></button>
  );
};

export default SignOutButton;
