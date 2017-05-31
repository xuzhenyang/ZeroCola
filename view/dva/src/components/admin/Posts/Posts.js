import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import styles from './Posts.css';

function Posts({ dispatch, posts }) {

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
  ];

  return (
    <div className={styles.normal}>
      <Table
        columns={columns}
        dataSource={posts.postList}
        rowKey={record => record.id}
        pagination={false}
      />
    </div>
  );
}

function mapStateToProps({ posts }) {
  return { posts };
}

export default connect(mapStateToProps)(Posts);
