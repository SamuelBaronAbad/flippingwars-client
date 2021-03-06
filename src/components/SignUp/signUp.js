import React from 'react';
import { Form, Input, Button } from 'antd';


export default function signUpForm() {
    const { Item } = Form;

    return (
        <Form>
            <Item
                label="Username"
                name="Username"
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Item>
            <Item
                label="email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input />
            </Item>
            <Item
                label="Password"
                name="Password"
                rules={[{ required: true, message: 'Please input a password!' }]}>
                <Input />
            </Item>
            <Item
                label="rePassword"
                name="rePassword"
                rules={[{ required: true, message: 'Please repeat the password!' }]}>
                <Input />
            </Item>
            <Item
                label="button"
                name="button"
            >
                <Button type="primary" htmlType="submit">
                    Enviar
            </Button>
            </Item>
        </Form>
    )
}