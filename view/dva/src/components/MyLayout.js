import React from 'react';
import styles from './MyLayout.css';
import MyNav from './MyNav';



function MyLayout({ children }) {
  return (
    <div className={styles.normal}>
      <MyNav />
      {children}
    </div>
  );
}

export default MyLayout;
