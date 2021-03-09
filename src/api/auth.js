import { base_path, apiVersion } from '../api/config';
import jwtDecode from 'jwt-decode';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';

export function getAccessTokenApi() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (!accessToken || accessToken === "null") {
        return null;
    }

    return willExpiredToken(accessToken) ? null: accessToken;
}

export function getRefreshTokenApi() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken || refreshToken === "null"){
        return null
    }

    return willExpiredToken(refreshToken) ? null : refreshToken;
}

export function refreshAccessTokenApi (refreshToken){
    const url = `${base_path}/${apiVersion}/refresh-access-token`;
    // Creamos el body de la petición
    const bodyObj = {
        refreshToken: refreshToken
    }
    const params = {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch(url, params)
    .then(response => {
        if(response.status !== 200){
            return null;
        }else{
            return response.json();
        }
    })
    .then(result => {
        if(!result) {
            logOut();
        }else{
            const {accessToken, refreshToken} = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
        }
    })
}

export function logOut (){
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN)
}
function willExpiredToken(token) {
    const seconds = 60;
    const metaToken = jwtDecode(token)
    const { expToken } = metaToken;
    const now = (Date.now() + seconds) / 1000;

    return now > expToken
}