import React, { useCallback, useState, useEffect } from 'react';
import { Avatar, Form, Input, Button, Select, DatePicker, Row, Col, notification } from 'antd';
import { UserOutlined as UserIcon, MailOutlined as MailIcon, LockOutlined as LockIcon } from '@ant-design/icons';
import { useDropzone } from 'react-dropzone';
import NoAvatar from '../../../../assets/img/png/avatar_logo.png';
import { getAvatarApi, uploadAvatarApi, updateUsersApi } from "../../../../api/user";
import { getAccessTokenApi } from '../../../../api/auth';
import moment from 'moment';

import './EditUserForm.scss';


export default function EditUserForm(props) {
    const { user, setIsVisibleModal, setReloadUser } = props;

    const [avatar, setAvatar] = useState(null);
    const [userData, setUserData] = useState({})

    useEffect(() => {
        setUserData({
            name: user.name,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            birthDate: user.birthDate,
            role: user.role,
            avatar: user.avatar
        });
    }, [user])

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

    useEffect(() => {
        if (avatar) {
            setUserData({ ...userData, avatar: avatar.file })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [avatar])

    const updateUser = e => {
        const token = getAccessTokenApi();
        let userUpdate = userData;
        if (userUpdate.password || userUpdate.rePassword) {
            if (userUpdate.password !== userUpdate.rePassword) {
                notification["error"]({
                    message: "Las contraseñas tienen que ser iguales"
                });
            }
            // Este return es para que pare la ejecución, para que no continue
            return;
        }

        if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
            notification["error"]({
                message: "El nombre, apellido y email son obligatorios"
            });
            return;
        }

        if (typeof userUpdate.avatar === "object") {
            uploadAvatarApi(token, userUpdate.avatar, user._id)
                .then(response => {
                    userUpdate.avatar = response.avatarName;
                    updateUsersApi(token, userUpdate, user._id)
                        .then(result => {
                            notification["success"]({
                                message: result.message
                            });
                        });
                        setIsVisibleModal(false);
                        setReloadUser(true);
                });
        } else {
            updateUsersApi(token, userUpdate, user._id)
            .then(result => {
                notification["success"]({
                    message: result.message
                });
                setIsVisibleModal(false);
                setReloadUser(true);
            });
        }
        
    }

    return (
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar}></UploadAvatar>
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser} />
        </div>
    )
}

function UploadAvatar(props) {
    const { avatar, setAvatar } = props;
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        if (avatar) {
            if (avatar.preview) {
                setAvatarUrl(avatar.preview)
            } else {
                setAvatarUrl(avatar)
            }
        } else {
            setAvatarUrl(null)
        }
    }, [avatar])

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file) })
        }, [setAvatar]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    return (
        //...getRootProps() para poder arrastrar las imagenes
        // isDragActive si tenemos una imagen por encima o no
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />

            {isDragActive ? (
                <Avatar size={150} src={NoAvatar} />
            ) : (
                <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
            )}

        </div>
    )
}

function EditForm(props) {
    const { userData, setUserData, updateUser } = props;
    const { Option } = Select;
    const date = moment.utc(userData.birthDate).format('DD-MM-YYYY');
    const dateFormat = "DD-MM-YYYY";

    return (
        <Form className="form-edit" onFinish={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            className="form-edit__input"
                            prefix={<UserIcon />}
                            placeholder="Nombre"
                            value={userData.name}
                            onChange={e => setUserData({ ...userData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            className="form-edit__input"
                            prefix={<UserIcon />}
                            placeholder="Apellido"
                            value={userData.lastname}
                            onChange={e => setUserData({ ...userData, lastname: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            className="form-edit__input"
                            prefix={<MailIcon />}
                            placeholder="Correo electrónico"
                            value={userData.email}
                            onChange={e => setUserData({ ...userData, email: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            className="form-edit__input"
                            prefix={<UserIcon />}
                            placeholder="Username"
                            value={userData.username}
                            onChange={e => setUserData({ ...userData, username: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <DatePicker
                            placeholder={date}
                            defaultPickerValue={moment(date, dateFormat)}
                            format={dateFormat}
                            allowClear={false}
                            onChange={e => setUserData({ ...userData, birthDate: e })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Selecciona un role"
                            onChange={e => setUserData({ ...userData, role: e })}
                            value={userData.role}
                        >
                            <Option value="Admin">Admin</Option>
                            <Option value="User">User</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            className="form-edit__input"
                            prefix={<LockIcon />}
                            placeholder="Contraseña"
                            value={userData.password}
                            onChange={e => setUserData({ ...userData, password: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            className="form-edit__input"
                            prefix={<LockIcon />}
                            placeholder="Repetir Contraseña"
                            value={userData.rePassword}
                            onChange={e => setUserData({ ...userData, rePassword: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit" >
                    Actualizar usuario
                </Button>
            </Form.Item>
        </Form>
    )
}