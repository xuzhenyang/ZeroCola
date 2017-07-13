import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import logo from '../assets/logo.jpg';
import util from '../utils/util';

const IndexPage = (props) => {

  const { dispatch, posts } = props;
  const postPage = posts.postPage;

  const postList = [];
  for (var index in postPage.data) {
    postList.push(
      <div>
        <a href={"/posts/" + postPage.data[index].id}>
          <h2>{postPage.data[index].title}</h2>
        </a>
        <div><span>{util.formateDate(postPage.data[index].createTime)}</span></div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <div><img className={styles.logo} src={logo} /></div>
        <p>blablabla...</p>
      </div>
      <hr className={styles.split} />
      <div>
        <div>
          <h1>Latest Posts</h1>
        </div>
        <div>
          {postList}
        </div >
        <div className={styles.loadmore}><button href="/posts">More</button></div>
      </div >
    </div >
  );
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(IndexPage);
