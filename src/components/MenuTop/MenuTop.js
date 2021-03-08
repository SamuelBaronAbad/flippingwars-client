import { createRef, useRef, useState } from 'react';
import { Modal, Menu, Dropdown, Button, Switch } from 'antd';
import logoRD from "../../assets/img/png/logo.png";
import RegisterForm from '../ModalSignIn/RegisterForm';
import LoginForm from '../ModalSignIn/LoginForm';
import {
    PoweroffOutlined as PoweroffIcon,
    DownOutlined as DownIcon
} from '@ant-design/icons';

import './MenuTop.scss';

const { Item } = Menu;

// Crear mas adelante una lista para cargar los juegos que vayamos metiendo
const menuGames = (
    <Menu>
        <Item key="1"><a href="/games/flip-cards">FlipGame</a></Item>
        <Item key="2" disabled>Emotion War</Item>
        <Item key="3" disabled>Nammu</Item>
        <Item key="4" disabled>Mission of live</Item>
    </Menu>
)

export default function MenuTop() {

    const [showModal, setShowModal] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [checked, setChecked] = useState(true)


    function onChange() {
        setShowForm(!showForm)
        setChecked(!checked)
    }
    function handleCancel() {
        setShowModal(false);
        setShowForm(true);
        setChecked(true)
    }

    return (
        <>
            <div className="menu-top">
                <div className="menu-top__left">
                    <img className="menu-top__left-logo"
                        src={logoRD}
                        alt="SamuelBaronAbad"
                    />
                </div>
                <Menu className="menu-top__center" mode="horizontal">
                    <Dropdown overlay={menuGames}>
                        <a href="/games">Games <DownIcon /></a>
                    </Dropdown>
                    <Item key="6">Contact</Item>
                    <Item key="7">About us</Item>
                </Menu>
                <div className="menu-top__right">
                    <Button type="link" onClick={() => setShowModal(true)}>
                        ACCEDER
                </Button>
                </div>
            </div>
            <Modal
                visible={showModal}
                title="Acceder"
                footer={null}
                onCancel={handleCancel}
            >
                <Switch
                    className="menu-top__modal-switch"
                    checked={checked}
                    checkedChildren="Registro"
                    unCheckedChildren="Login"
                    onChange={onChange}
                />
                {showForm ? <LoginForm /> : <RegisterForm />}
            </Modal>
        </>
    )
}