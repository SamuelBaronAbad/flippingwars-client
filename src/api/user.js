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

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(result => {
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
            if (result.user) {
                return {
                    ok: true,
                    message: "Usuario registrado correctamente"
                }
            } else {
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

export function findAllApi(token) {
    const url = `${base_path}/${apiVersion}/user/find-all`;
    const params = {
        method: "GET",
        headers: {
            Authorization: token
        }
    }
    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        })
}

export function findUsersActiveApi(token, status) {
    const url = `${base_path}/${apiVersion}/user/find-users-active?active=${status}`;
    const params = {
        method: "GET",
        headers: {
            Authorization: token
        }
    }
    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        })
}

export function uploadAvatarApi(token, avatar, userId) {
    const url = `${base_path}/${apiVersion}/user/upload-avatar/${userId}`;
    // Esto hay que hacerlo cuando queremos enviar una Imagen (por ejemplo) por fecth()
    const formData = new FormData();
    formData.append("avatar", avatar, avatar.name);
    const params = {
        method: "PUT",
        body: formData,
        headers: {
            Authorization: token
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json
        })
        .then(result => {
            return result
        })
        .catch(err => {
            return err.message;
        })
}

export function getAvatarApi(avatarName) {
    const url = `${base_path}/${apiVersion}/user/find-avatar/${avatarName}`;

    return fetch(url)
        .then(response => {
            return response.url;
        })
        .catch(err => {
            return err.message
        })
}

export function updateUsersApi(token, user, userId) {
 
    const url = `${base_path}/${apiVersion}/user/update-user/${userId}`;
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(user)
    }

    return fetch(url, params)
    .then(response => {
        return response.json;
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err.message;
    })
}