import React from 'react';
import { connect } from 'dva';
import styles from './AdminPage.css';
import MyAdminLayout from '../../components/admin/Layout/MyAdminLayout';

function AdminPage({ children, dispatch }) {

  const layoutOpts = {
    handleClickLogout: function () {
      dispatch({ type: 'user/logout' });
    }
  }

  return (
    <div className={styles.normal}>
      <MyAdminLayout {...layoutOpts}>
        {children}
      </MyAdminLayout>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(AdminPage);
