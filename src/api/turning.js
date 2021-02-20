import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
import { useState } from 'react';
import { UpdateCard } from "./updateCard";




async function update(data) {
    const result = await UpdateCard(data);
}
// function turns the card to the left
function turnLeft(array) {
    var currVal = 0;
    const newArray = [];
    while (currVal < array.length) {
        if (currVal === array.length - 1) {
            newArray[array.length - 1] = array[0]
        } else {
            newArray[currVal] = array[currVal + 1]
        }
        currVal += 1;
    }
    return newArray;
}
// function turns the card to the right
function turnRight(array) {
    var currVal = 0;
    const newArray = []
    while (currVal < array.length) {
        if (currVal === 0) {
            newArray[0] = array[array.length - 1];
        } else {
            newArray[currVal] = array[currVal - 1]
        }
        currVal += 1;
    }
    return newArray;

}

function FlipCard(numCard, arrayCards) {

    const [data, setData] = useState({
        id: Number,
        values: [Number],
        state: Boolean
    })
   
    if (numCard === 0) {
        const updateCards = flipRightCard(numCard, arrayCards, setData());
        updateCards.concat(flipDownCard(numCard, arrayCards, setData()));
    }
}

// return card status (true: white, false: black)
function flipRightCard(numCard, arrayCards, setData) {
    // arrayCards is the main card list
    numCard -= 1;
    // obtenemos la carta de la lista
    const card = arrayCards[numCard]
    // carta derecha, siempre será card +1
    const rightCard = arrayCards[numCard + 1]
   // const updateCards = [];
    if (card.status !== rightCard.status && rightCard.values[3] !== 0 && card.values[1] > rightCard.values[3]) {
        arrayCards.setData({ id: rightCard.id, values: rightCard.values, state: !rightCard.state });
        flipRightCard(rightCard.id, arrayCards, setData);   
    }
    return arrayCards;
}

function flipLeftCard(numCard, arrayCards, setData) {
    // arrayCards is the main card list
    numCard -= 1;
    // obtenemos la carta de la lista
    const card = arrayCards[numCard]
    // carta izquierda, siempre será card -1
    const leftCard = arrayCards[numCard - 1]
    const updateCards = [];
    if (card.status !== leftCard.status && leftCard.values[1] !== 0 && card.values[3] > leftCard.values[1]) {
        updateCards.push(setData({ id: leftCard.id, values: leftCard.values, state: !leftCard.state }));
        flipLeftCard(leftCard.id, arrayCards, setData);
    }
    return updateCards;

}
function flipUpCard(numCard, arrayCards, setData) {
    // arrayCards is the main card list
    numCard -= 1;
    // obtenemos la carta de la lista
    const card = arrayCards[numCard]
    // carta arriba, siempre será card -6
    const upCard = arrayCards[numCard - 6]
    const updateCards = [];
    if (card.status !== upCard.status && upCard.values[2] !== 0 && card.values[0] > upCard.values[2]) {
        updateCards.push(setData({ id: upCard.id, values: upCard.values, state: !upCard.state }));
        flipLeftCard(upCard.id, arrayCards, setData);
    }
    return updateCards;
}

function flipDownCard(numCard, arrayCards, setData) {
    // arrayCards is the main card list
    numCard -= 1;
    // obtenemos la carta de la lista
    const card = arrayCards[numCard]
    // carta abajo, siempre será card +6
    const downCard = arrayCards[numCard + 6]
    const updateCards = [];
    if (card.status !== downCard.status && downCard.values[0] !== 0 && card.values[2] > downCard.values[0]) {
        updateCards.push(setData({ id: downCard.id, values: downCard.values, state: !downCard.state }));
        flipLeftCard(downCard.id, arrayCards, setData);
    }
    return updateCards;
}

module.exports = {
    turnRight,
    turnLeft,
    flipRightCard
}

