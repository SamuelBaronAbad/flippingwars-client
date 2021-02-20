import React, { useState } from 'react';
import Board from './components/Board';
import { StartGame } from './api/StartGame';

import './App.scss';

function App() {

  const [card, setCard] = useState([]);
  const [show, setShow] = useState(false);
  async function fillBoard(e) {
    const result = await StartGame();
    setCard(result);
    e.target.style.display = "none"
    setShow(true);
  }

  return (
    <div className="contenedor">
      <button onClick={(e) => fillBoard(e)} >Start Game</button>
      {show ? <Board valores={card} /> : null}
    </div>
  );
}

export default App;
