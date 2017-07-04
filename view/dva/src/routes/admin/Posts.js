import React from 'react';
import { connect } from 'dva';
import styles from './Posts.css';
import PostComponent from '../../components/admin/Posts/Posts';

function Posts() {
  return (
    <div className={styles.normal}>
      <PostComponent />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Posts);
