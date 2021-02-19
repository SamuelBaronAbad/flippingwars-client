import { apiVersion, base_path } from "./config";

// Funcion para llamar las cartas y colocarlas

export function startGame() {
    const url = `${base_path}/${apiVersion}/`;
    return fetch(url)
        .then(response => {
            return response.json();
        }).then(data => {
            //console.log("Dentro del fetch: ", data);
            return shuffle(data);
        })
}

// Funcion para barajar las cartas

function shuffle(array) {
    var currIndex = array.length;
    var temp, randomIndex;
    while (0 !== currIndex) {
        randomIndex = Math.floor(Math.random() * currIndex);
        currIndex -= 1;
        temp = array[currIndex];
        array[currIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}
