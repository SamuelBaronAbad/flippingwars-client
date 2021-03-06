import React from 'react';
import { Layout} from 'antd';
import MenuTop from '../components/MenuTop';
import {Route} from 'react-router-dom';

import './layoutBasic.scss'

const { Header, Content, Footer } = Layout;

export default function LayoutBasic() {

    return (
        <Layout className="layout-basic">
            <Header>
               <MenuTop />
            </Header>
            <Content className="layout-basic__content">
                <h1>Aqui to el contenido</h1>
            </Content>
            <Footer className="layout-basic__footer">
                <h4 style={{ textAlign: 'center' }}>DayDreamsGames 2021 Created by Samuel Baron Abad</h4>
            </Footer>

        </Layout>
    )
}

