import React from 'react';
import { connect } from 'dva';
import styles from './AdminPage.css';
import MyLayout from '../../components/admin/layout/MyLayout';

function AdminPage({ children }) {
  return (
    <div className={styles.normal}>
      <MyLayout>
        {children}
      </MyLayout>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(AdminPage);
