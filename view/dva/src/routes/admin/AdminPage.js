import React from 'react';
import { connect } from 'dva';
import styles from './AdminPage.css';
import MyAdminLayout from '../../components/admin/Layout/MyAdminLayout';

function AdminPage({ children }) {
  return (
    <div className={styles.normal}>
      <MyAdminLayout>
        {children}
      </MyAdminLayout>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(AdminPage);
