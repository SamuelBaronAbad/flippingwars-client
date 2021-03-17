import React from 'react';
import {Modal as ModalAdmin} from 'antd';

export default function Modal (props){
    const {children, title, isVisible, setIsVisible} = props;
    return (
        <ModalAdmin
        title={title}
        centered
        visible={isVisible}
        onCancel={() => setIsVisible(false)}
        footer={false}
        >{children}</ModalAdmin>
    )
}