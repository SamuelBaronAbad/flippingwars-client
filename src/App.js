import React, { useState } from 'react';
import Board from './components/Board';
import { StartGame, newRecordGame, findGame } from './api/game';


import './App.scss';

const user = [{
  name: "samuel",
  status: true
},{
  name: "vero",
  status: false
}]



function App() {
  const [array_card, setArray_Card] = useState([]);
  const [show, setShow] = useState(false);

  async function fillBoard(e) {
    const result = await StartGame();
    const resultIdGame = await findGame();
   
    // Agregar estado para guardar el registro de la ultima partida
    newRecordGame({"id":(resultIdGame[0].id)+1, "users": user, "cards": result})
    setArray_Card(result);
    e.target.style.display = "none"
    setShow(true);

   /*// TEST FUNCIONES 
   */
}


  return (
    <div className="contenedor">
      <button onClick={(e) => fillBoard(e)} >Start Game</button>
      {show ? <Board valores={array_card} /> : null}
    </div>
  );
}

export default App;
