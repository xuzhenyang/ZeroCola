import React from 'react';
import { connect } from 'dva';
import styles from './PostEditPage.css';
import PostEditor from '../../components/admin/posts/PostEditor';

function PostEditPage() {
  return (
    <div className={styles.normal}>
      <PostEditor />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(PostEditPage);
