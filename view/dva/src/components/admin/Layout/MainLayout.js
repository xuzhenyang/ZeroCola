import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import styles from './MainLayout.css';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

function MainLayout({ children }) {
  return (
    <Layout className={styles.normal}>
      <Sider>
        <div className={styles.logo} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['6']}>
          <SubMenu
            key="sub1"
            title={<span><Icon type="user" /><span className="nav-text">User</span></span>}
          >
            <Menu.Item key="1">Tom</Menu.Item>
            <Menu.Item key="2">Bill</Menu.Item>
            <Menu.Item key="3">Alex</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={<span><Icon type="team" /><span className="nav-text">Team</span></span>}
          >
            <Menu.Item key="4">Team 1</Menu.Item>
            <Menu.Item key="5">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="6">
            <span>
              <Icon type="file" />
              <span className="nav-text">File</span>
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
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

export default MainLayout;
