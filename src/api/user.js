import { apiVersion, base_path} from "./config";

export function findOneUser (data) {
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