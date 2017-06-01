import React from 'react';
import { connect } from 'dva';
import styles from './AdminPage.css';
import MainLayout from '../components/admin/Layout/MainLayout';

function AdminPage({ children }) {
  return (
    <div className={styles.normal}>
      <MainLayout>
        {children}
      </MainLayout>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(AdminPage);
