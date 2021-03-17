import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from "antd";
import MenuTopAdmin from '../components/Admin/MenuTopAdmin';
import MenuSider from '../components/Admin/MenuSider';
import useAuth from '../hooks/useAuth';

// Esto va a poder acceder al valor {user} del contexto AuthContext en authProvider, nos devolverá lo que contenga {user}
//import useAuth from "../hooks/useAuth"


import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
    const { routes } = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const { Header, Content, Footer } = Layout;
    const { user, isLoading } = useAuth();

    if (!user && !isLoading) {
        return (
            <>
                <Route path="/"></Route>
                <Redirect to="/"></Redirect>
            </>
        )
    }

    if (user && !isLoading){
        if(user.role !== "admin"){
            return (
                <>
                <Route path="/"></Route>
                <Redirect to="/"></Redirect>
                </>
            )
        }
    }

    return (
        <Layout>
            <MenuSider menuCollapsed={menuCollapsed}></MenuSider>
            <Layout className="layout-admin" style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}>
                <Header className="layout-admin__header">
                    <MenuTopAdmin menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed}></MenuTopAdmin>
                </Header>
                <Content className="layout-admin__content">
                    <LoadRoutes routes={routes} />
                </Content>
                <Footer className="layout-admin__footer">
                    Samuel Baron Abad 2021
                </Footer>
            </Layout>
        </Layout>
    )
}

// (props) => ({routes}) == const {routes} = props;
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