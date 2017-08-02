import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Pagination, Row, Col } from 'antd';
import styles from './PostListPage.css';
import moment from 'moment';

const PostListPage = (props) => {

  const { dispatch, posts } = props;
  const postPage = posts.postPage;

  function onPageChange(page, pageSize) {
    dispatch({
      type: 'posts/getPosts',
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
          <Col span={6} offset={4}>
          <p>
            {moment.unix(postPage.data[index].createTime / 1000).format('YYYY-MM-DD')}
          </p>
          </Col>
          <Col span={12}>
          <Link to={"/posts/" + postPage.data[index].id}>
            <h4>{postPage.data[index].title}</h4>
          </Link>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <h1>Archive</h1>
      </div>
      <div className={styles.posts}>
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
