import React from 'react';
import { Link } from 'dva/router';
import styles from './MyNav.css';


function MyNav(props) {

    return (
        <div className={styles.normal}>
            <div className={styles.nav}>
                <Link to="/" className={styles.link}>Home</Link>
                <Link to="/posts" className={styles.link}>Archive</Link>
            </div>
        </div>
    );
}

export default MyNav;