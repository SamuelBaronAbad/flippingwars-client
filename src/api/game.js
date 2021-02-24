import { apiVersion, base_path, ArrayMain } from "./config";


// Grabar registro de nueva partida
export function newRecordGame(data) {
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
      return console.log(result)
    })
    .catch(err =>{
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
export function findGame(){
    const url = `${base_path}/${apiVersion}/partida/0`;
   
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

