import React from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';
import styles from './Posts.css';

function Posts({ dispatch, posts }) {

/**
 * 时间格式转换
 * timestamp -> yyyy-MM-dd hh:mm
 * @param {*} timestamp 
 */
  function formateDate(timestamp) {
    if (timestamp == null || timestamp == undefined) {
      return "";
    }
    var date = new Date(timestamp);
    var dateValue = [date.getFullYear(), date.getMonth(), date.getDate()].join('-');
    var timeValue = date.getHours() + ':' + date.getMinutes();
    return dateValue + ' ' + timeValue;
  }

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
      render: (text, record) => {
        return (<p>{formateDate(record.createTime)}</p>);
      }
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
        bordered={true}
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
