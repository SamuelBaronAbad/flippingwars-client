import React from 'react';
import SamuelLogo from "../../../assets/img/png/logo.png";
import { Button } from "antd";
import {
    MenuUnfoldOutlined as MenuUnfoldIcon,
    MenuFoldOutlined as MenufoldIcon,
    PoweroffOutlined as PoweroffIcon
} from "@ant-design/icons";
import {logOut} from '../../../api/auth';

import "./MenuTopAdmin.scss";

export default function MenuTop(props) {
    const {menuCollapsed, setMenuCollapsed} = props;
    const logout = () => {
        logOut();
        window.location.reload();
    }
    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <img className="menu-top__left-logo"
                    src={SamuelLogo}
                    alt="SamuelBaronAbad"
                />
                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
                   { menuCollapsed ? 
                        <MenuUnfoldIcon />
                     : 
                        <MenufoldIcon />
                    }
                    
                </Button>
            </div>
            <div className="menu-top__right">
                <Button type="link" onClick={logout}>
                    <PoweroffIcon />
                </Button>
            </div>
        </div>
    )
}