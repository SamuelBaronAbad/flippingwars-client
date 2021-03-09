import React from 'react';
import { Row, Col } from 'antd';
import { Route, Switch } from 'react-router-dom';
import MenuTop from '../components/MenuTopUser';

import './layoutBasic.scss'


export default function LayoutBasic(props) {
    const { routes } = props
return (
    <Row>
        <Col md={4} />
        <Col md={16}>
    <MenuTop>Menu Top</MenuTop>
            <LoadRoutes routes={routes} />
    <p>Footer</p>
        </Col>
        <Col md={4} />
    </Row>
)

  /*   return (
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
    ) */
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