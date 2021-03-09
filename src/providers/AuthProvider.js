import React, { useState, useEffect, createContext } from 'react';
import { getAccessTokenApi, getRefreshTokenApi, refreshAccessTokenApi, logOut } from '../api/auth';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export default function AuthProvider(props) {
    // children es toda la pag web, ver en App.js
    const { children } = props;
    const [user, setUser] = useState({
        user: null,
        isLoading: true
    });
    useEffect(() => {
        checkUserLogin(setUser)
    }, [])

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

// Recibe el setUser para actualizar el usuario, cada vez que cargue la pagina llevará consigo lo que hay dentro
function checkUserLogin(setUser) {
    const accessToken = getAccessTokenApi();
    if (!accessToken) {
        const refreshToken = getRefreshTokenApi();
        if (!refreshToken) {
            logOut();
            setUser({
                user: null,
                isLoading: false
            })
        }else {
            refreshAccessTokenApi(accessToken);
        }
    }else{
        console.log(jwtDecode(accessToken));
        setUser({
            user: jwtDecode(accessToken),
            isLoading: false
        })
    }
}