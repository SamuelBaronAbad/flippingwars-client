import React, { useState } from 'react';
import { base_array } from '../../api/config';
import UpdateDB from "../../api/updateDB";
import "./card.scss";

const flipFunctions = require("../../api/flipFunctions")
const { turnLeft, turnRight, flipCard } = flipFunctions;

export default function Card(props) {

    const { card, num } = props;
    const { values, status } = card;
    const [newVal, setNewVal] = useState(values);
    const [newBaseArray, setNewBaseArray] = useState(base_array)

    // CREAR user: usuario, status: !estado de usuario, idGame: id de la partida
    //console.log(newBaseArray);

    function ButtonLeft() {
        newBaseArray[num].values = turnLeft(card);
        setNewVal(newBaseArray[num].values);
        // devuelve el array actualizado, si el status de esta carta cambia, se le da la vuelta
        const updateArray = flipCard(num, newBaseArray, 0)
        console.log(updateArray);
        setNewBaseArray(updateArray);
        UpdateDB({"card": newBaseArray})
    }
    function ButtonRight() {
        newBaseArray[num].values = turnRight(card);
        setNewVal(newBaseArray[num].values);
        // devuleve el array actualizado, si el status de esta carta cambia, se le da la vuelta
        const updateArray = flipCard(num, newBaseArray, 0);
        setNewBaseArray(updateArray);
        //UpdateDB({"id": idGame, "cards": newBaseArray, "users": user, "status": status})
    }

    return (
        <div className="card">
            <div className="card__bottom" style={status ? { backgroundColor: "white" } : { backgroundColor: "black" }}>
                <div className="card__bottom-row_1">
                    <span>{newVal[0]}</span>
                </div>
                <div className="card__bottom-row_2">
                    <span>{newVal[3]}</span>
                    <span>{newVal[1]}</span>
                </div>
                <div className="card__bottom-row_3">
                    <span>{newVal[2]}</span>
                </div>
            </div>
            <div className="card__top">
                <button className="card__top-button" onClick={() => ButtonLeft()}>Giro IZQ</button>
                <button className="card__top-button" onClick={() => ButtonRight()}>Giro DER</button>
            </div>
        </div>
    )
}