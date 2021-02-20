import { apiVersion, base_path } from "./config";

export function UpdateCard(data) {
    const url = `${base_path}/${apiVersion}/:id`;
    const params = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
}