import { Menu, Dropdown, Button } from 'antd';
import logoRD from "../../assets/img/png/logo.png";
import { PoweroffOutlined as PoweroffIcon,
    DownOutlined as DownIcon } from '@ant-design/icons';

import './MenuTop.scss';

const { Item } = Menu;

const menuGames = (
    <Menu>
        <Item key="1">FlipGame</Item>
        <Item key="2" disabled>Emotion War</Item>
        <Item key="3" disabled>Nammu</Item>
        <Item key="4" disabled>Mission of live</Item>
    </Menu>
)

export default function MenuTop() {
    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <img className="menu-top__left-logo"
                    src={logoRD}
                    alt="SamuelBaronAbad"
                />
            </div>
            <Menu className="menu-top__center" mode="horizontal">
                <Dropdown overlay={menuGames}>
                    <a href="Hola">Games <DownIcon /></a>
                </Dropdown>
                <Item key="6">Contact</Item>
                <Item key="7">About us</Item>
            </Menu>
            <div className="menu-top__right">
                <Button type="link">
                    <PoweroffIcon />
                </Button>
            </div>

        </div>
    )
}