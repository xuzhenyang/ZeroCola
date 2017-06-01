import React from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';
import styles from './Posts.css';

function Posts({ dispatch, posts }) {

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span>
          <Button>test</Button>
        </span>
      )
    }
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
