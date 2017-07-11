import React from 'react';
import { Link } from 'dva/router';
import { Layout, Menu, Icon } from 'antd';
import styles from './MySider.css';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

function MySider(props) {

    //获取url锚点 匹配Menu的key来保持默认高亮
    const selectedKeys = window.location.hash.substring(1).split('?')[0];

    return (
        <Sider {...props} >
            <div className={styles.logo} />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedKeys]} defaultOpenKeys={['sub1']}>
                <Menu.Item key="/admin">
                    <Link to="/admin">
                        <Icon type="home" />
                        首页
                    </Link>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={<span><Icon type="file-text" /><span className="nav-text">文章管理</span></span>}
                >
                    <Menu.Item key="/admin/posts">
                        <Link to="/admin/posts">
                            文章列表
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/postCreate">
                        <Link to="/admin/postCreate">
                            新建
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="/admin/tags">
                    <Link to="/admin/tags">
                        <Icon type="tags-o" />
                        标签管理
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider >
    );
}

/** 注意：如果你想在 Sider 基础上进行包装，需要给自定义组件加上 __ANT_LAYOUT_SIDER = true 设置 */
MySider.__ANT_LAYOUT_SIDER = true;

export default MySider;