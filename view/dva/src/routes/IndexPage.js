import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import logo from '../assets/logo.jpg';

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
        <div><span>{postPage.data[index].createTime}</span></div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div><img className={styles.logo} src={logo} /></div>
        <br />
        <p>自豪地运行在树莓派上...</p>
      </div>
      <div>
        <div>
          <hr />
          <h2>Latest Posts</h2>
        </div>
        <div>
          {postList}
        </div >
        <div><a href="/posts">More</a></div>
      </div >
    </div >
  );
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(IndexPage);
