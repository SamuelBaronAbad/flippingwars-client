import { apiVersion, base_path } from "./config";

export function findOneUser(data) {
    const url = `${base_path}/${apiVersion}/user/find/${data}`;

    return fetch(url)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(result => {
            console.log(result);
            return result;
        })
        .catch(err => {
            return err.message;
        })
}

export function signInApi(data) {
    const url = `${base_path}/${apiVersion}/user/sign-in`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }
    console.log(data);
    return fetch(url, params)
    .then(response => {
        return response.json()
    })
    .then(result => {
        console.log(result);
        return result
    })
    .catch(err => {
        return err.message;
    })
}

export function signUpApi(data) {
    const url = `${base_path}/${apiVersion}/user/sign-up`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        if(result.user){
            return {
                ok: true,
                message: "Usuario registrado correctamente"
            }
        }else {
            return {
                ok: false,
                message: result.message
            };
        }
    })
    .catch(err => {
        return {
            ok: false,
            message: err.message
        };
    })
}