import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './IndexPage.css';
import logo from '../assets/logo.jpg';
import moment from 'moment';

const IndexPage = (props) => {

  const { dispatch, posts } = props;
  const postPage = posts.postPage;

  const postList = [];
  for (var index in postPage.data) {
    postList.push(
      <div>
        <Link to={"/posts/" + postPage.data[index].id}>
          <h2>{postPage.data[index].title}</h2>
        </Link>
        <div><span>{moment.unix(postPage.data[index].createTime / 1000).format('YYYY-MM-D')}</span></div>
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
          {postList}
        </div >
        <div className={styles.loadmore}><Link to="/posts">More</Link></div>
      </div >
    </div >
  );
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(IndexPage);
