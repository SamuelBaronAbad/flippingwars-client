import React, { useState } from 'react';
import { Form, Input, Checkbox, notification, Button } from 'antd';
import {
    UserOutlined as UserIcon,
    MailOutlined as MailIcon,
    LockOutlined as LockIcon
} from '@ant-design/icons';
import { minLengthValidation, emailValidation } from '../../../utils/formValidation'
import { signUpApi } from '../../../api/user';

import './RegisterForm.scss';


export default function RegisterForm() {
    const { Item } = Form;
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
        rePassword: "",
        privacyPolicy: false
    })

    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        rePassword: false,
        privacyPolicy: false
    });

    const changeForm = e => {

        if (e.target.name === "privacyPolicy") {
            setInput({
                ...input,
                [e.target.name]: e.target.checked
            })
        } else {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        }
    }

    const inputValidation = e => {
        //Cogemos los datos del input (detectado por sus atributos Type y Name) en el que se introducen los datos
        const { type, name } = e.target;

        if (type === "email") {
            setFormValid({
                ...formValid,
                [name]: emailValidation(e.target)
            })
        }
        if (type === "password") {
            setFormValid({
                ...formValid,
                [name]: minLengthValidation(e.target, 6)
            })
        }
        if (type === "checkbox") {
            setFormValid({
                ...formValid,
                [name]: e.target.checked
            })
        }
    }

    const resetForm = () => {
        const inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove("success");
            inputs[i].classList.remove("error");
        }
        setInput({
            ...input,
            username: "",
            email: "",
            password: "",
            rePassword: "",
            privacyPolicy: false
        })

        setFormValid({
            email: false,
            password: false,
            rePassword: false,
            privacyPolicy: false
        })
        setTimeout(() => {
            setLoading(false);
        },2000)
    }

    const register = async () => {
        console.log(input);
        const emailVal = input.email;
        const passwordVal = input.password;
        const rePasswordVal = input.rePassword;
        const privacyPolicyVal = input.privacyPolicy
        setLoading(true);
        if (!emailVal || !passwordVal || !rePasswordVal || !privacyPolicyVal) {
            notification["error"]({
                message: "Email, contraseñas y política de privacidad obligatorio"
            })
        }
        else {
            if (passwordVal !== rePasswordVal) {
                setTimeout(() => {
                    notification["error"]({
                        message: "Las contraseñas deben ser iguales"
                    });
                },1000)
                
            } else {
                
                // conectar con API y registrar usuario
                // await: junto con ASYNC en la función ppal, le decimos que cuando llegue aquí que no continue hasta que termine esta función
                const result = await signUpApi(input);
                console.log(result);
                if (result.ok) {
                    setTimeout(() => {
                    notification["success"]({
                        message: result.message
                    })
                }, 1000)
                    resetForm();
                } else {
                    notification["error"]({
                        message: result.message
                    })
                }

            }
        }
        
    }


    return (
        <Form className="register-form" onChange={changeForm}>
            <h3>Resgístrate</h3>
            <Item

                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input
                    name="username"
                    className="register-form__input"
                    prefix={<UserIcon />}
                    placeholder="Nombre de Usuario"
                    value={input.username} />
            </Item>
            <Item

                rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input
                    type="email"
                    name="email"
                    className="register-form__input"
                    prefix={<MailIcon />}
                    placeholder="Email"
                    onChange={inputValidation}
                    value={input.email}
                />
            </Item>
            <Item

                rules={[{ required: true, message: 'Please input a password!' }]}>
                <Input
                    type="password"
                    name="password"
                    className="register-form__input"
                    prefix={<LockIcon />}
                    placeholder="Contraseña"
                    onChange={inputValidation}
                    value={input.password}
                />
            </Item>
            <Item

                rules={[{ required: true, message: 'Please repeat the password!' }]}>
                <Input
                    type="password"
                    name="rePassword"
                    className="register-form__input"
                    prefix={<LockIcon />}
                    placeholder="Repite contraseña"
                    value={input.rePassword}
                />
            </Item>
            <Item
            valuePropName="checked"
                rules={[{ required: true, message: 'Please accept Privacy Policy!' }]}
            >
                <Checkbox
                    name="privacyPolicy"
                    onChange={inputValidation}
                    checked={input.privacyPolicy}>
                    He leido y acepto la Política de Privacidad</Checkbox>
            </Item>
            <Item>
                <Button htmlType="submit"
                    className="register-form__button"
                    onClick={register}
                    loading={loading}
                >
                    Crear Cuenta
                </Button>
            </Item>
        </Form>
    )
}