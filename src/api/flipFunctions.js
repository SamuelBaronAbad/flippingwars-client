

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
    console.log(newArray);
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
    console.log(newArray);
    return newArray;

}

// numCard === index base_array
function flipCard(numCard, base_array, reg) {
    console.log("Num Card: ", numCard, " Card: ", base_array[numCard]);

    var rightCard;
    if (!(base_array[numCard + 1] === base_array[6]
        || base_array[numCard + 1] === base_array[12]
        || base_array[numCard + 1] === base_array[18])
        && base_array[numCard + 1] !== undefined) {
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



    const updateArray = [];
    updateArray.push.apply(updateArray, new Array([
        ...flipRightCard(numCard, rightCard, base_array, reg),
        ...flipLeftCard(numCard, leftCard, base_array, reg),
        ...flipUpCard(numCard, upCard, base_array, reg),
        ...flipDownCard(numCard, downCard, base_array, reg)]));

    // Colocar en Board o Card, de donde llamamos a flipcard
    /* updateArray.forEach(item => {
        setData(item)
    })
 */
    console.log("dentro de flip: ", reg);
    return updateArray;
}

// return card status (true: white, false: black)
function flipRightCard(numCard, rightCard, base_array, reg) {

    const card = base_array[numCard]
    const updateArray = [];
    console.log("llamando Right");
    console.log("rightCard: ", rightCard);

    if (rightCard !== undefined) {
        if (card.status !== rightCard.status
            && rightCard.values[3] !== 0
            && card.values[1] > rightCard.values[3]) {
            updateArray.push({ id: rightCard.id, values: rightCard.values, state: !rightCard.state });
            reg += 1;
            console.log("+1 a right: ", reg);

            flipCard(numCard + 1, base_array, reg);
        }
    }
    return updateArray;
}

function flipLeftCard(numCard, leftCard, base_array, reg) {
    /*   // arrayCards is the main card list
      numCard -= 1;
      // obtenemos la carta de la lista
      const card = arrayCards[numCard]
      // carta izquierda, siempre será card -1
      const leftCard = arrayCards[numCard - 1]
       */

    const card = base_array[numCard]
    const updateArray = [];
    console.log("llamando Left");
    console.log("leftCard: ", leftCard);

    /*   console.log(card.values);
      console.log(leftCard.values); */

    if (leftCard !== undefined) {
        if (card.status !== leftCard.status
            && leftCard.values[1] !== 0
            && card.values[3] > leftCard.values[1]) {
            updateArray.push({ id: leftCard.id, values: leftCard.values, state: !leftCard.state });
            reg += 1;
            console.log("+1 a left: ", reg);

            flipCard(numCard - 1, base_array, reg);
        }
    }
    return updateArray;

}
function flipUpCard(numCard, upCard, base_array, reg) {
    /*   // arrayCards is the main card list
      numCard -= 1;
      // obtenemos la carta de la lista
      const card = arrayCards[numCard]
      // carta arriba, siempre será card -6
      const upCard = arrayCards[numCard - 6]
       */

    const card = base_array[numCard]
    const updateArray = [];
    console.log("llamando Up");
    console.log("upCard: ", upCard);

    if (upCard !== undefined) {
        if (card.status !== upCard.status
            && upCard.values[2] !== 0
            && card.values[0] > upCard.values[2]) {
            updateArray.push({ id: upCard.id, values: upCard.values, state: !upCard.state });
            reg += 1;
            console.log("+1 a up: ", reg);

            flipCard(numCard - 6, base_array, reg);
        }
    }
    return updateArray;
}

function flipDownCard(numCard, downCard, base_array, reg) {
    /*    // arrayCards is the main card list
       numCard -= 1;
       // obtenemos la carta de la lista
       const card = arrayCards[numCard]
       // carta abajo, siempre será card +6
       const downCard = arrayCards[numCard + 6]
        */

    const card = base_array[numCard]
    const updateArray = [];

    console.log("llamando Down");
    console.log("downCard: ", downCard);

    if (downCard !== undefined) {
        if (card.status !== downCard.status
            && downCard.values[0] !== 0
            && card.values[2] > downCard.values[0]) {
            updateArray.push({ id: downCard.id, values: downCard.values, state: !downCard.state });
            reg += 1;
            console.log("+1 a down: ", reg);

            flipCard(numCard + 6, base_array, reg);
        }
    }
    return updateArray;
}

module.exports = {
    turnRight,
    turnLeft,
    flipCard
}

