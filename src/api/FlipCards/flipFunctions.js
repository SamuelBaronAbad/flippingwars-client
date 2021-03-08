
var poke;

function arraySaved(baseArray, result) {
    console.log(baseArray);
    for (let i = 0; i < baseArray.length; i++) {
        for (let j = 0; j < result.length; j++) {
            if (result[j].id === baseArray[i].id) {
                if (result[j].values !== baseArray[i].values
                    || result[j].status !== baseArray[i].status) {
                    baseArray[i] = result[j];
                }
            }
        }
    }
    return baseArray;
}

// Checkean el STATE de las cartas

function checkFlipRight(numCard, rightCard, base_array) {
    const card = base_array[numCard]
    if (rightCard === undefined
        || card.status === rightCard.status
        || !(rightCard.values[3] !== 0 && card.values[1] > rightCard.values[3])) {
        console.log("es mas falso que pimpon");
        return false;
    } else {
        return true
    }
}

function checkFlipLeft(numCard, leftCard, base_array) {
    const card = base_array[numCard]
    if (leftCard === undefined
        || card.status === leftCard.status
        || !(leftCard.values[1] !== 0 && card.values[3] > leftCard.values[1])) {
        console.log("es mas falso que pimpon");
        return false;
    } else {
        return true
    }
}

function checkFlipUp(numCard, upCard, base_array) {
    const card = base_array[numCard]
    if (upCard === undefined
        || card.status === upCard.status
        || !(upCard.values[2] !== 0 && card.values[0] > upCard.values[2])) {
        console.log("es mas falso que pimpon");
        return false;
    } else {
        return true
    }
}

function checkFlipDown(numCard, downCard, base_array) {
    const card = base_array[numCard]
    if (downCard === undefined
        || card.status === downCard.status
        || !(downCard.values[0] !== 0 && card.values[2] > downCard.values[0])) {
        console.log("es mas falso que pimpon");
        return false;
    } else {
        return true
    }
}

// function turns the card to the left
function turnLeft(card) {
    const array = card.values
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
    console.log("ha girado a la izquierda");
    return newArray;
}
// function turns the card to the right
function turnRight(card) {

    const array = card.values
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
    console.log("ha girado a la derecha");
    return newArray;

}

// Giran las cartas
function checkFirstCardMoved (numCard, base_array){
    console.log("esto es poke: ", poke);
    if (numCard !== poke){
        console.log("Ha entrado y esta es poke: ", poke);
        const resultado = flipCard(numCard, base_array);
        if (!resultado) {
            return false
        }else{
        poke = numCard;
        console.log(poke);
        return resultado;
    }
    }else {
        return false;
    }
}
function flipCard(numCard, base_array) {
    
    console.log("Num Card: ", numCard, " Card: ", base_array[numCard]);
    console.log(base_array);

    var rightCard;
    if (base_array[numCard + 1] !== undefined
        && !(base_array[numCard + 1] === base_array[6]
            || base_array[numCard + 1] === base_array[12]
            || base_array[numCard + 1] === base_array[18])) {
        rightCard = base_array[numCard + 1];
    }

    var leftCard;
    if (!(base_array[numCard - 1] === base_array[5]
        || base_array[numCard - 1] === base_array[11]
        || base_array[numCard - 1] === base_array[17])
        && base_array[numCard - 1] !== undefined) {
        leftCard = base_array[numCard - 1];
    }

    var upCard;
    if (base_array[numCard - 6] !== undefined) {
        upCard = base_array[numCard - 6];
    }

    var downCard;
    if (base_array[numCard + 6] !== undefined) {
        downCard = base_array[numCard + 6];
    }

    // CHECK STATUS

    if (!checkFlipRight(numCard, rightCard, base_array)
        && !checkFlipLeft(numCard, leftCard, base_array)
        && !checkFlipUp(numCard, upCard, base_array)
        && !checkFlipDown(numCard, downCard, base_array)) {
        return false;
    } else {
        console.log("ha entrado en el flip");
        flipRightCard(numCard, rightCard, base_array)
        flipLeftCard(numCard, leftCard, base_array);
        flipUpCard(numCard, upCard, base_array);
        flipDownCard(numCard, downCard, base_array);
        return base_array;
    }

    // FLIPS FUNCTIONS PER CARD

}

function flipRightCard(numCard, rightCard, base_array) {

    console.log("llamando Right");
    console.log("rightCard: ", rightCard);

    if (checkFlipRight(numCard, rightCard, base_array)) {
        for (let index = 0; index < base_array.length; index++) {
            if (rightCard.id === base_array[index].id) {
                base_array[index] = { _id: base_array[index]._id, id: rightCard.id, values: rightCard.values, status: !rightCard.status }
            }
        }
        flipCard(numCard + 1, base_array);
    }
    return base_array;
}

function flipLeftCard(numCard, leftCard, base_array) {

    console.log("llamando Left");
    console.log("leftCard: ", leftCard);
    //const card = base_array[numCard]
    /*     if (leftCard === undefined || card.status === leftCard.status) {
            return base_array
        } else if (leftCard.values[1] !== 0 && card.values[3] > leftCard.values[1]) { */
    if (checkFlipLeft(numCard, leftCard, base_array)) {
        for (let index = 0; index < base_array.length; index++) {
            if (leftCard.id === base_array[index].id) {
                base_array[index] = ({ _id: base_array[index]._id, id: leftCard.id, values: leftCard.values, status: !leftCard.status });
            }
        }
        flipCard(numCard - 1, base_array);
    }
    return base_array;
}

function flipUpCard(numCard, upCard, base_array) {

    console.log("llamando Up");
    console.log("upCard: ", upCard);
    if (checkFlipUp(numCard, upCard, base_array)) {
        for (let index = 0; index < base_array.length; index++) {
            if (upCard.id === base_array[index].id) {
                base_array[index] = ({ _id: base_array[index]._id, id: upCard.id, values: upCard.values, status: !upCard.status });
            }
            flipCard(numCard - 6, base_array);
        }
    }
    return base_array;
}

function flipDownCard(numCard, downCard, base_array) {

    const card = base_array[numCard]
    console.log("llamando Down");
    console.log("downCard: ", downCard);

    if (downCard === undefined || card.status === downCard.status) {
        return base_array
    } else if (downCard.values[0] !== 0 && card.values[2] > downCard.values[0]) {
        for (let index = 0; index < base_array.length; index++) {
            if (downCard.id === base_array[index].id) {
                base_array[index] = ({ _id: base_array[index]._id, id: downCard.id, values: downCard.values, status: !downCard.status });
            }
        }
        flipCard(numCard + 6, base_array);
    }
    return base_array;
}



module.exports = {
    turnRight,
    turnLeft,
    arraySaved,
    checkFirstCardMoved,
    flipCard
}

