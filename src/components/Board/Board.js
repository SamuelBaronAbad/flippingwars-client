import React from 'react';
import Card from '../Card';
import "./board.scss";


export default function Board(props) {

    const { valores } = props;

    return (
        <div className="board">
            <div className="board__row_1">
                {valores.filter((card, index) => index < 6)
                    .map((card, index) => (
                        <Card card={card} num={index} key={card.id} />
                    ))}

            </div>
            <div className="board__row_2">
                {valores.filter((card, index) => index > 5 && index < 12)
                    .map((card, index) => (
                        <Card card={card} num={index + 6} key={card.id} />
                    ))}

            </div>
            <div className="board__row_3">
                {valores.filter((card, index) => index > 11 && index < 18)
                    .map((card, index) => (
                        <Card card={card} num={index + 12} key={card.id} />
                    ))}
            </div>
            <div className="board__row_4">
                {valores.filter((card, index) => index > 17 && index < 24)
                    .map((card, index) => (
                        <Card card={card} num={index + 18} key={card.id} />
                    ))}
            </div>
        </div>
    )

}