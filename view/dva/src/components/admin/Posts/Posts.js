import React from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';
import styles from './Posts.css';
import { routerRedux } from 'dva/router';
import moment from 'moment';

function Posts({ dispatch, postPage }) {

  function onPageChange(page, pageSize) {
    dispatch({
      type: 'posts/fetch',
      payload: {
        page: page,
        pageSize: pageSize
      }
    });
  }

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '状态',
      dataIndex: 'statusDesc',
      key: 'statusDesc',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text, record) => {
        return (<p>{moment.unix(record.createTime / 1000).format('YYYY-MM-D H:mm')}</p>);
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text, record) => {
        if (record.updateTime) {
            return (<p>{moment.unix(record.updateTime / 1000).format('YYYY-MM-D H:mm')}</p>);
        }
      }
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span>
          <Button onClick={() => { dispatch(routerRedux.push('/admin/postEdit/' + record.id)); }}>修改</Button>
        </span>
      )
    }
  ];

  return (
    <div className={styles.normal}>
      <Table
        bordered={true}
        columns={columns}
        dataSource={postPage.data}
        rowKey={record => record.id}
        pagination={{
          current: postPage.pageIndex,
          total: postPage.totalNumber,
          pageSize: postPage.pageSize,
          onChange: onPageChange
        }}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { postPage } = state.posts;
  return { postPage: postPage };
}

export default connect(mapStateToProps)(Posts);
