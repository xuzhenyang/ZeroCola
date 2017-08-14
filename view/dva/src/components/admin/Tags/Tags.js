import React from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';
import styles from './Tags.css';
import { routerRedux } from 'dva/router';
import moment from 'moment';

function Tags(props) {

  const {
    tags,
    dispatch
  } = props;

  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      key: 'name',
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
          <Button onClick={() => { dispatch({ type: 'tags/deleteTag', payload: record.id }); }}>删除</Button>
        </span>
      )
    }
  ];

  return (
    <div className={styles.normal}>
      <Table
        bordered={true}
        columns={columns}
        dataSource={tags}
        rowKey={record => record.id}
        pagination={false}
      />
    </div>
  );
}

export default Tags;
