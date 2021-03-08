import { apiVersion, base_path, ArrayMain, RecordedGame} from "../config";


//const {cards, users, id, status} = game;

// Grabar registro de nueva partida
export function RecordingGame(data) {
    
    const url = `${base_path}/${apiVersion}/`;
    const params = {
        method: "POST",
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
            console.log("Partida Creada");
            RecordedGame(result);
        })
        .catch(err => {
            return err.message
        })
}

// Funcion para llamar las cartas y colocarlas
export function StartGame() {
    const url = `${base_path}/${apiVersion}/`;
    return fetch(url)
        .then(response => {
            return response.json();
        }).then(data => {
            //console.log("Dentro del fetch: ", data);
            ArrayMain(data)
            return shuffle(data);
        })
        .catch(err => {
            return err.message;
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

    // Ponemos las cartas con status alternos
    array.forEach((cards, index) => {
        if (index < 6 || (index > 11 && index < 18)) {
            if (index % 2 !== 0) {
                cards.status = false;
            }
        } else if ((index > 5 && index < 12) || (index > 17 && index < 24)) {
            if (index % 2 === 0) {
                cards.status = false;
            }
        }
    })
    return array;
}

// Encontrar la partida
export function findGame() {
    const url = `${base_path}/${apiVersion}/partida/partida`;
    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {

            return data;
        })
        .catch(err => {
            return err.message
        })
}

export function updateGame(data) {
    console.log(data);
    const url = `${base_path}/${apiVersion}/partida/partida`;
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
            console.log(("partida actualizada"));
            return result;
        })
}
export function cardsStatus (array) {
    const arrayStatus = [];
    for (let index = 0; index < array.length; index++) {
        arrayStatus.push(array[index]);
    }
    return arrayStatus;
}

