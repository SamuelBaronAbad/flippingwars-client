import React, { useState } from 'react';
import { startGame } from "../../api/StartGame"

import "./card.scss";



export default function Card(props) {
    const {card} = props;
    const {id, values, status} = card;
   
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