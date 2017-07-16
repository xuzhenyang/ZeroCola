import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Pagination } from 'antd';
// import styles from './PostPage.css';
import logo from '../assets/logo.jpg';
import util from '../utils/util';

const PostListPage = (props) => {

  const { dispatch, posts } = props;
  const postPage = posts.postPage;

  function onPageChange(page, pageSize) {
    dispatch({
      type: 'posts/fetch',
      payload: {
        page: page,
        pageSize: pageSize
      }
    });
  }

  const postList = [];
  for (var index in postPage.data) {
    postList.push(
      <div>
        <Link to={"/posts/" + postPage.data[index].id}>
          <h2>{postPage.data[index].title}</h2>
        </Link>
        <div><span>{util.formateDate(postPage.data[index].createTime)}</span></div>
      </div>
    );
  }

  return (
    <div>
      <div>
        {postList}
      </div >
      <Pagination
        defaultCurrent={1}
        current={postPage.pageIndex}
        total={postPage.totalNumber}
        pageSize={postPage.pageSize}
        onChange={onPageChange} />
    </div>
  );
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(PostListPage);
