import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Pagination, Row, Col } from 'antd';
import styles from './PostListPage.css';
import logo from '../assets/logo.jpg';
import moment from 'moment';

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
        <Row>
          <Col span={8}>
          <span>
            {moment.unix(postPage.data[index].createTime / 1000).format('YYYY-MM-D')}
          </span>
          <span>&nbsp;&nbsp;·&nbsp; </span>
          </Col>
          <Col span={12}>
          <Link to={"/posts/" + postPage.data[index].id}>
            <p>{postPage.data[index].title}</p>
          </Link>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <h1>Archive</h1>
      <div className={styles.list}>
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
