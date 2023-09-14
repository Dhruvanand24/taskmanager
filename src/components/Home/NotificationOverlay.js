import React from 'react';
import styles from "./Home.module.css";

function NotificationOverlay({ notifications, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.notificationList}>
        <h3>Notifications</h3>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default NotificationOverlay;
