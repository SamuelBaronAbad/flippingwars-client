import React from 'react';
import {base_array} from "../../api/config"


import "./card.scss";

/* const flip = require("../../api/turning")

function activate (e) {
    flip.turnRight(e.values);
    flip.FlipCard()

} */



export default function Card(props) {
    const {card} = props;
    const {values} = card;
    
   
    return (
        <div className="card">
        <div className="card__bottom">
            <div className="card__bottom-row_1">
                <span>{values[0]}</span>
            </div>
            <div className="card__bottom-row_2">
                <span>{values[1]}</span>
                <span>{values[2]}</span>
            </div>
            <div className="card__bottom-row_3">
                <span>{values[3]}</span>
            </div>
        </div>
        <div className="card__top">
            <button className="card__top-button">Giro IZQ</button>
            <button className="card__top-button">Giro DER</button>
        </div>
    </div>
    )
}