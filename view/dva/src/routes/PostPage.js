import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './PostPage.css';
import logo from '../assets/logo.jpg';

const PostPage = (props) => {

  const { dispatch, posts } = props;
  const post = posts.post;

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>{post.title}</h1>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.post}>
          <p dangerouslySetInnerHTML={{ __html: post.renderedContent }} />
        </div>
      </div>
    </div >
  );
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(PostPage);
