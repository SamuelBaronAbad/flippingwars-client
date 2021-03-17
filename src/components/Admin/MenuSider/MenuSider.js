import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {HomeOutlined as HomeIcon, MenuOutlined as MenuIcon} from '@ant-design/icons';

import "./MenuSider.scss";

function MenuSider(props) {
    
    const {Sider} = Layout;
    const {menuCollapsed, location} = props;
    const {Item} = Menu;
    return (
        <Sider className="menu-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline"
             defaultSelectedKeys={[location.pathname]}>
                <Item key="/admin">
                    <Link to={"/admin"}>
                        <HomeIcon></HomeIcon>
                        <span className="nav-text">Home</span>
                    </Link>
                </Item>
                <Item key="/admin/users">
                    <Link to={"/admin/users"}>
                        <MenuIcon></MenuIcon>
                        <span className="nav-text">Users</span>
                    </Link>
                </Item>
             </Menu>
        </Sider>
    )
}

export default withRouter(MenuSider);