import React from 'react';
import { Link } from 'dva/router';
import { Layout, Menu, Icon } from 'antd';
import styles from './MySider.css';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const MySider = (props) => <Sider {...props} >
    <div className={styles.logo} />
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
            <Link to="/admin">
                <Icon type="home" />
                首页
            </Link>
        </Menu.Item>
        <Menu.Item key="2">
            <Link to="/admin/posts">
                <Icon type="file-text" />
                文章管理
            </Link>
        </Menu.Item>
        <Menu.Item key="3">
            <Link to="/admin/tags">
                <Icon type="tags-o" />
                标签管理
            </Link>
        </Menu.Item>
        {/*<SubMenu
            key="sub2"
            title={<span><Icon type="tags-o" /><span className="nav-text">标签管理</span></span>}
        >
            <Menu.Item key="5">标签列表</Menu.Item>
            <Menu.Item key="6">新建</Menu.Item>
        </SubMenu>*/}
    </Menu>
</Sider>

/** 注意：如果你想在 Sider 基础上进行包装，需要给自定义组件加上 __ANT_LAYOUT_SIDER = true 设置 */
MySider.__ANT_LAYOUT_SIDER = true;

export default MySider;