import React, { useState, useEffect } from 'react';
import { Switch, List, Avatar, Button } from 'antd';
import { EditOutlined as EditIcon, DeleteOutlined as DeleteIcon, StopOutlined as StopIcon, CheckOutlined as CheckIcon } from '@ant-design/icons';
import NoAvatar from '../../../../assets/img/png/avatar_logo.png';
import Modal from '../../Modal';
import EditUserForm from '../EditUserForm';
import { getAvatarApi } from '../../../../api/user';

import "./ListUsers.scss"

export default function ListUsers(props) {

    const { active, inactive, setReloadUser } = props;
    const [viewUsersActive, setViewUsersActive] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    return (
        <div className="list-users">
            <div className="list-users__switch">
                <Switch
                    defaultChecked
                    onChange={() => setViewUsersActive(!viewUsersActive)}
                />
                <span>
                    {viewUsersActive ? "Usuarios Activos" : "Usuarios Inactivos"}
                </span>
            </div>
            {viewUsersActive ? (
                <UsersActive
                    userActive={active}
                    setIsVisibleModal={setIsVisibleModal}
                    setModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                    setReloadUser={setReloadUser}
                ></UsersActive>
            ) : (
                <UsersInactive userInactive={inactive}></UsersInactive>)}

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    )
}
function UsersActive(props) {
 
    const { userActive, setIsVisibleModal, setModalTitle, setModalContent, setReloadUser } = props;

    const editUser = user => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.name ? user.name : '...'} ${user.lastname ? user.lastname : '...'}`)
        setModalContent(<EditUserForm setReloadUser={setReloadUser} setIsVisibleModal={setIsVisibleModal} user={user} />)
    }

    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={userActive}
            // renderizará cada elemento de la array que le llegue
            renderItem={user => <UserActive user={user} editUser={editUser} />}
        />
    )
}

function UserActive(props) {
    const { user, editUser } = props;
    const [avatar, setAvatar] = useState(null);
    
    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar)
                .then(response => {
                    setAvatar(response)
                })
        } else {
            setAvatar(null)
        }
    }, [user])

    return (
        <List.Item
            actions={[
                <Button
                    type="primary"
                    onClick={() => editUser(user)}>
                    <EditIcon />
                </Button>,
                <Button
                    type="danger"
                    onClick={() => console.log("Desactivar usuario")}>
                    <DeleteIcon />
                </Button>,
                <Button
                    type="danger"
                    onClick={() => console.log("Borrar usuario")}>
                    <StopIcon />
                </Button>
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
                title={`
                    ${user.name ? user.name : '...'}
                    ${user.lastname ? user.lastname : '...'}
                    `}
                description={user.email}
            />
        </List.Item>
    )
}


function UsersInactive(props) {
    const { userInactive } = props;

    return (
        <List
            className="users-inactive"
            itemLayout="horizontal"
            dataSource={userInactive}
            // renderizará cada elemento de la array que le llegue
            renderItem={user => <UserInactive user={user} />}
        />
    )
}

function UserInactive (props){
    const {user} = props;
    const [avatar, setAvatar] = useState(null);

    useEffect (() => {
        if(user.avatar){
            getAvatarApi(user.avatar)
            .then(response=> {
                setAvatar(response)
            });
        }else {
            setAvatar(null)
        }
    },[user])

    return (
        <List.Item
        actions={[
            <Button
                type="primary"
                onClick={() => console.log("Activar usuario")}>
                <CheckIcon />
            </Button>,
            <Button
                type="danger"
                onClick={() => console.log("Borrar usuario")}>
                <StopIcon />
            </Button>
        ]}
    >
        <List.Item.Meta
            avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
            title={`
        ${user.name ? user.name : '...'}
        ${user.lastName ? user.lastName : '...'}
        `}
            description={user.email}
        />
    </List.Item>
    )
}



