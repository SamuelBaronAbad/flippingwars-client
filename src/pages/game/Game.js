import React, { useState} from 'react';
import Board from '../../components/Board';

import { StartGame, RecordingGame, findGame } from '../../api/game';
import {findOneUser} from '../../api/user';

import './game.scss';

const user = [{
  name: "samuel",
  status: true
}, {
  name: "vero",
  status: false
}]

function App() {
  const [paramsGame, setParamsGames] = useState();
  const [show, setShow] = useState(false);
  const email =  "peterpunkbaron@gmail.com";
  
 
  async function fillBoard(e) {
  
    const result = await StartGame();
    const resultIdGame = await findGame();
    const userFind = await findOneUser(email)

    const params = {"id": (resultIdGame[0].id) + 1, "users": user, "cards": result, "status": true};
   // RecordingGame(params)
    RecordingGame(params);
    setParamsGames(params)
    e.target.style.display = "none"
    setShow(true);
    /*// TEST FUNCIONES 
    */
  }
  



  return (
    <div className="contenedor">
      <button onClick={(e) => fillBoard(e)} >Start Game</button>
     {show ? <Board game={paramsGame} /> : null}
     
    </div>
  );
}

export default App;