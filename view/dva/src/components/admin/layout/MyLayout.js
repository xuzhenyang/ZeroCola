import React from 'react';
import { Layout, Icon } from 'antd';
import styles from './MyLayout.css';
import MySider from './MySider.js'

const { Header, Content, Footer } = Layout;

function MyLayout({ children }) {
  return (
    <Layout className={styles.normal}>
      <MySider />
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
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

export default MyLayout;
