import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './PostPage.css';
import moment from 'moment';

const PostPage = (props) => {

  const { dispatch, posts } = props;
  const post = posts.post;

  const tagList = [];
  for(let i in post.tags) {
    tagList.push(<span>{post.tags[i].name} </span>);
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>{post.title}</h1>
        </div>
      </div>
      <div>{tagList}</div>
      <div className={styles.date}>
        <p>{moment.unix(post.createTime / 1000).format('YYYY-MM-DD')}</p>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: post.renderedContent }} />
        </div>
      </div>
    </div >
  );
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(PostPage);
