export const base_path = "http://localhost:3977/api";
export const apiVersion = "v1";
export let base_array = [];
export let game = {
    id: "",
    users: [],
    cards: [],
    status: true
}


export function RecordedGame (data){
    game = data;
    console.log(game);
}
export function ArrayMain(array) {
    base_array = array;
}