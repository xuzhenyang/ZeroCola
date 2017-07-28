import React from 'react';
import { Layout, Icon, Button } from 'antd';
import styles from './MyAdminLayout.css';
import MySider from './MySider.js'

const { Header, Content, Footer } = Layout;

function MyAdminLayout({ children, handleClickLogout }) {
  return (
    <Layout className={styles.normal}>
      <MySider />
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} >
          <Button onClick={handleClickLogout}>logout</Button>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
          </Footer>
      </Layout>
    </Layout>
  );
}

export default MyAdminLayout;
