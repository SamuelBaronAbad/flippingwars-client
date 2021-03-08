import React, { useState } from 'react';
import Card from '../Card';
import Users from '../Users';
import { updateGame } from '../../api/FlipCards/game';


import "./board.scss";
const flipFunctions = require("../../api/FlipCards/flipFunctions")
const { turnLeft, turnRight, arraySaved, checkFirstCardMoved } = flipFunctions;

export default function Board(props) {

    const { game } = props;
    const { cards, id, status, users } = game;

    const [baseArray, setBaseArray] = useState({
        id: id,
        cards: cards,
        status: status,
        users: users
    });

    function leftButton(e) {
        if (baseArray.status) {
            // HACER ESTO
            console.log("no es tu turno");
        }
        baseArray.cards[e].values = turnLeft(baseArray.cards[e])
        const resultado = checkFirstCardMoved(e, baseArray.cards);
        if (!resultado) {
            turnRight(baseArray.cards[e])
            console.log("no puedes hacer este movimiento", baseArray);
        } else {
            const finalArray = arraySaved(baseArray.cards, resultado);
            console.log();
            setBaseArray({
                "id": baseArray.id,
                "cards": finalArray,
                "status": !baseArray.status,
                "users": baseArray.users
            });
            updateGame(baseArray)
        }
    }


    function rightButton(e) {

        baseArray.cards[e].values = turnRight(baseArray.cards[e])
        const resultado = checkFirstCardMoved(e, baseArray.cards);
        if (!resultado) {
            turnLeft(baseArray.cards[e])
            console.log("no puedes hacer este movimiento");
        } else {
            const finalArray = arraySaved(baseArray.cards, resultado);
            setBaseArray({
                "id": baseArray.id,
                "cards": finalArray,
                "status": !baseArray.status,
                "users": baseArray.users
            });
            updateGame(baseArray)
        }
    }

    if (baseArray.status || !baseArray.status) {
        return (
            <>
                <Users user={users[0]} statusGame={baseArray.status} />
                <div className="board">
                    <div className="board__row_1">
                        {baseArray.cards.filter((card, index) => index < 6)
                            .map((card, index) => (
                                <Card card={card} leftButton={leftButton} rightButton={rightButton} num={index} key={card.id} />
                            ))
                        }
                    </div>
                    <div className="board__row_2">
                        {baseArray.cards.filter((card, index) => index > 5 && index < 12)
                            .map((card, index) => (
                                <Card card={card} leftButton={leftButton} rightButton={rightButton} num={index + 6} key={card.id} />
                            ))}

                    </div>
                    <div className="board__row_3">
                        {baseArray.cards.filter((card, index) => index > 11 && index < 18)
                            .map((card, index) => (
                                <Card card={card} leftButton={leftButton} rightButton={rightButton} num={index + 12} key={card.id} />
                            ))}
                    </div>
                    <div className="board__row_4">
                        {baseArray.cards.filter((card, index) => index > 17 && index < 24)
                            .map((card, index) => (
                                <Card card={card} leftButton={leftButton} rightButton={rightButton} num={index + 18} key={card.id} />
                            ))}
                    </div>
                </div>
                <Users user={users[1]} statusGame={!baseArray.status} />
            </>
        )
    }
}