import React, { useState } from 'react';
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../../utils/constants";
import { Form, Input, Checkbox, Button, notification } from 'antd';
import {
    MailOutlined as MailIcon,
    UnlockOutlined as UnlockIcon,
} from '@ant-design/icons';
import { signInApi } from '../../../api/user.js';
import jwtDecode from 'jwt-decode';

import './LoginForm.scss'

export default function LoginForm(props) {
    const { Item } = Form;
    const {showModal, showButton} = props;
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

    const pressKey = (e) => {
        if(e.key === "Enter"){
            login();
        }
    }
    
   async function login () {

        const result = await signInApi(input);
        if (result === undefined) {
            notification["error"]({
                message: "Los campos están vacios"
            })
        }
        // Si result.message existe es que me envia un mensaje de error, ya que de otra forma enviaria los Tokens
        else if (result.message) {
            notification["error"]({
                message: result.message
            })
        } else {
            const {accessToken, refreshToken} = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
            notification["success"]({
                message: "Login correcto"
            });
      
            if(jwtDecode(accessToken).role === "admin"){
                window.location.href = "/admin"
            }else{
               // window.location.reload();
                showModal(false);
                showButton(true)
            }
    }
}

    return (
        <Form className="login-form" onChange={onChange} onKeyPress={pressKey}>
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
                    onClick={() => login()}
                >
                    Entrar
                </Button>
            </Item>

        </Form>
    )
}