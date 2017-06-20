import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './PostEditor.css';

function PostEditor({ dispatch, post }) {

  return (
    <div className={styles.normal}>
    </div>
  );
}

function mapStateToProps({ post }) {
  return { post };
}

export default connect(mapStateToProps)(PostEditor);
