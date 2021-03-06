import React from 'react';
import "./card.scss";


export default function Card(props) {

    const { card, num, leftButton, rightButton } = props;
    const { values, status } = card;    

    async function ButtonLeft() {
        leftButton(num)
    }
    async function ButtonRight() {
        rightButton(num)
    }

    return (
        <div className="card">
            <div className="card__bottom" style={status ? { backgroundColor: "white" } : { backgroundColor: "black" }}>
                <div className="card__bottom-row_1">
                    <span>{values[0]}</span>
                </div>
                <div className="card__bottom-row_2">
                    <span>{values[3]}</span>
                    <span>{values[1]}</span>
                </div>
                <div className="card__bottom-row_3">
                    <span>{values[2]}</span>
                </div>
            </div>
            <div className="card__top">
                <button className="card__top-button" onClick={(e) => ButtonLeft(e)}>Giro IZQ</button>
                <button className="card__top-button" onClick={(e) => ButtonRight(e)}>Giro DER</button>
            </div>
        </div>
    )
}