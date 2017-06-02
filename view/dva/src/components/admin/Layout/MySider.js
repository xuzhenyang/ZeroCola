import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import styles from './MySider.css';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const MySider = (props) => <Sider {...props} >
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

/** 注意：如果你想在 Sider 基础上进行包装，需要给自定义组件加上 __ANT_LAYOUT_SIDER = true 设置 */
MySider.__ANT_LAYOUT_SIDER = true;

export default MySider;