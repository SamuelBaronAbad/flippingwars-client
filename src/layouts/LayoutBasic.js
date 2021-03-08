import React from 'react';
import { Layout } from 'antd';
import MenuTop from '../components/MenuTop';
import { Route, Switch } from 'react-router-dom';

import './layoutBasic.scss'


const { Header, Content, Footer } = Layout;

export default function LayoutBasic(props) {
    const { routes } = props

    return (
        <Layout className="layout-basic">
            <Header>
                <MenuTop />
            </Header>
            <Content className="layout-basic__content">
                <LoadRoutes routes={routes} />
            </Content>
            <Footer className="layout-basic__footer">
                <h4 style={{ textAlign: 'center' }}>DayDreamsGames 2021 Created by Samuel Baron Abad</h4>
            </Footer>

        </Layout>
    )
}

function LoadRoutes({ routes }) {
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            ))}
        </Switch>
    )
}