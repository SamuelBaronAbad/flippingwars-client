import React, { useState } from 'react';
import Card from '../Card';
import "./board.scss";

const Turn = require('../../api/turning');


export default function Board(props) {

    const array = [1,2,3,4]
    Turn.turnRight(array);
    const { valores } = props;
    return (
        <div className="board">
            <div className="board__row_1">
                <Card card={valores[0]} />
                <Card card={valores[1]} />
                <Card card={valores[2]} />
                <Card card={valores[3]} />
                <Card card={valores[4]} />
                <Card card={valores[5]} />
            </div>
            <div className="board__row_2">

                <Card card={valores[6]} />
                <Card card={valores[7]} />
                <Card card={valores[8]} />
                <Card card={valores[9]} />
                <Card card={valores[10]} />
                <Card card={valores[11]} />
            </div>
            <div className="board__row_3">
                <Card card={valores[12]} />
                <Card card={valores[13]} />
                <Card card={valores[14]} />
                <Card card={valores[15]} />
                <Card card={valores[16]} />
                <Card card={valores[17]} />
            </div>
            <div className="board__row_4">
                <Card card={valores[18]} />
                <Card card={valores[19]} />
                <Card card={valores[20]} />
                <Card card={valores[21]} />
                <Card card={valores[22]} />
                <Card card={valores[23]} />
            </div>
        </div>
    )

}