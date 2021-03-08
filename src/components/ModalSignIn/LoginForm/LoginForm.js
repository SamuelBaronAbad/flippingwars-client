import React, { useState } from 'react';
import { Form, Input, Checkbox, Button, notification } from 'antd';
import {
    MailOutlined as MailIcon,
    UnlockOutlined as UnlockIcon,
} from '@ant-design/icons';
import { signInApi } from '../../../api/user.js';

import './LoginForm.scss'

export default function LoginForm() {
    const { Item } = Form;
    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    const onChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const login = async () => {
        const result = await signInApi(input);
        if (result === undefined) {
            notification["error"]({
                message: "Los campos están vacios"
            })
        }
        else if (result.message) {
            notification["error"]({
                message: result.message
            })
        } else {
            notification["success"]({
                message: "Login correcto"
            });
        }
    }

    return (
        <Form className="login-form" onChange={onChange}>
            <h3>Inicia Sesion</h3>
            <Item>
                <Input
                    name="email"
                    className="login-form__input"
                    prefix={<MailIcon />}
                    placeholder="Email" />
            </Item>
            <Item>
                <Input
                    name="password"
                    type="password"
                    className="login-form__input"
                    prefix={<UnlockIcon />}
                    placeholder="Contraseña" />
            </Item>
            <Item
                valuePropName="checked">
                <Checkbox name="RememberMe">Recuerda mi contraseña</Checkbox>
            </Item>
            <Item>
                <Button
                    type="Submit"
                    className="login-form__button"
                    onClick={login}
                >
                    Entrar
                </Button>
            </Item>

        </Form>
    )
}