
function sum(dice) {
    return dice.reduce((prev, curr) => prev + curr);
}

//returns the frequency of numbers in the 6 dice
function freq(dice) {
    const freqs = new Map();
    for (let d of dice) freqs.set(d, (freqs.get(d) || 0) + 1)
    return Array.from(freqs)
}
//check if 5 or 1 includes in the dice
function oneOrFive(dice) {
    return ((dice.includes(5) || dice.includes(1)));
}

//check if there isnt 5 or 1 includes in the dice
function cheackIfOnlyOneOrFive(dice) {
    return ((dice.includes(2) || dice.includes(3) || dice.includes(4) || dice.includes(6)));
}

//check if the player has a legal play.
function canPlayerRollOrPass(dice) {
    if ((threeOfAkind(dice) || fourOfAkind(dice) || threePairs(dice) || twoThrees(dice) || straight(dice) || fiveOfAkind(dice) || sixOfAkind(dice)) || (oneOrFive(dice) && !cheackIfOnlyOneOrFive(dice))) {
        return true;
    } else {
        return false;
    }
}

//check if the player has a legal play.
function ligalMoves(dice) {
    if ((ifthreeOfAkind(dice) || ifFourOfAkind(dice) || threePairs(dice)) || straight(dice) || fiveOfAkind(dice) || (oneOrFive(dice) && !cheackIfOnlyOneOrFive(dice) || oneOrFive(dice))) {
        return true;
    } else {
        return false;
    }
}

function ifthreeOfAkind(dice) {
    const arr = freq(dice);
    for (let i = 0; i < arr.length; i++) {
        const temp = arr[i];
        if (temp[1] === 3) {
            return true
        }
    }
    return false;
}

function ifFourOfAkind(dice) {
    const arr = freq(dice);
    for (let i = 0; i < arr.length; i++) {
        const temp = arr[i];
        if (temp[1] === 4) {
            return true
        }
    }
    return false;
}

function threeOfAkind(dice) {
    let boltemp = 0;
    let tempIdx = { counterOne: 0, counterFive: 0, threeIndex: 0 };
    const arr = freq(dice);
    if (dice.length < 3) {
        return false;
    } else {
        if (arr.length === 2) {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] !== 3 && (temp[0] !== 5 && temp[0] !== 1)) {
                    return false;
                } else if (temp[1] === 3) {
                    boltemp++;
                    tempIdx.threeIndex = temp[0];
                } else {
                    if (temp[0] === 1) {
                        tempIdx.counterOne = temp[1];
                    } else if (temp[0] === 5) {
                        tempIdx.counterFive = temp[1];

                    }
                }
            }
            if (boltemp >= 1) {
                return tempIdx;
            } else {
                return false;
            }
        } else if (arr.length > 2) {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] !== 3 && (temp[0] !== 5 && temp[0] !== 1)) {
                    return false
                } else if (temp[1] === 3) {
                    boltemp++;
                    tempIdx.threeIndex = temp[0];
                } else if (temp[0] === 1) {
                    tempIdx.numNotPartOfTheThree = 1;  //add how many times this num
                    tempIdx.counterOne = temp[1]
                } else if (temp[0] === 5) {
                    tempIdx.numNotPartOfTheThreeIsFive = 5;
                    tempIdx.counterFive = temp[1]
                }
            }
            if (boltemp >= 1) {
                return tempIdx;
            } else {
                return false;
            }
        }
        else {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] === 3) {
                    tempIdx.threeIndex = temp[0];
                    return tempIdx;
                }
            }
        }
        return false;
    }
}

function fourOfAkind(dice) {
    let isFour = 0;
    let tempIdxFourOfAkind = { counterOne: 0, counterFive: 0 };
    const arr = freq(dice);
    if (dice.length < 3) {
        return false;
    } else {
        if (arr.length === 1) {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] !== 4 && (temp[0] !== 5 && temp[0] !== 1)) {
                    return false
                } else if (temp[1] === 4) {
                    isFour++;
                }
            }
            if (isFour >= 1) {
                return tempIdxFourOfAkind;
            } else {
                return false;
            }
        } else if (arr.length > 1) {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] !== 4 && (temp[0] !== 5 && temp[0] !== 1)) {
                    return false
                } else if (temp[1] === 4) {
                    isFour++;
                } else if (temp[0] === 1) {
                    tempIdxFourOfAkind.counterOne = temp[1]
                } else if (temp[0] === 5) {
                    tempIdxFourOfAkind.counterFive = temp[1]
                }
            }
            if (isFour >= 1) {
                return tempIdxFourOfAkind;
            } else {
                return false;
            }
        } else {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] === 4) {
                    return tempIdxFourOfAkind
                }
            }
        }
        return false;
    }
}


function fiveOfAkind(dice) {
    let boltemp = 0;
    let tempIdxFiveOfAkind = { numNotPartOfTheFive: 0 };
    const arr = freq(dice);
    if (dice.length < 5) {
        return false;
    } else {
        if (arr.length === 1) {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] !== 5 && (temp[0] !== 5 && temp[0] !== 1)) {
                    return false
                } else if (temp[1] === 5) {
                    boltemp++;
                }
            }
            if (boltemp >= 1) {
                return tempIdxFiveOfAkind;
            } else {
                return false;
            }
        } else if (arr.length > 1) {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] !== 5 && (temp[0] !== 5 && temp[0] !== 1)) {
                    return false
                } else if (temp[1] === 5) {
                    boltemp++;
                } else if (temp[0] === 1) {
                    tempIdxFiveOfAkind.numNotPartOfTheFive = 100;
                } else if (temp[0] === 5) {
                    tempIdxFiveOfAkind.numNotPartOfTheFive = 50;
                }
            }
            if (boltemp >= 1) {
                return tempIdxFiveOfAkind;
            } else {
                return false;
            }
        }
        return false;
    }
}

function threePairs(dice) {
    const arr = freq(dice);
    if (arr.length === 3) {
        for (let i = 0; i < arr.length; i++) {
            const temp = arr[i];
            if (temp[1] !== 2) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function twoThrees(dice) {
    const arr = freq(dice);
    if (arr.length === 2) {
        for (let i = 0; i < arr.length; i++) {
            const temp = arr[i];
            if (temp[1] !== 3) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function sixOfAkind(dice) {
    if (dice.length < 6) {
        return false;
    }
    for (let i = 0; i < dice.length - 1; i++) {
        if (dice[i] !== dice[i + 1]) {
            return false
        }
    }
    return true;
}

function straight(dice) {
    const arr = freq(dice);
    if (arr.length === 6) {
        return true
    }
    return false;
}

function canculateThreeOfAkind(threeOfAkindObject) {
    if (threeOfAkindObject.threeIndex === 1) {
        return (300 + (50 * threeOfAkindObject.counterFive) + (100 * threeOfAkindObject.counterOne));
    } else {
        return ((threeOfAkindObject.threeIndex * 100) + (50 * threeOfAkindObject.counterFive) + (100 * threeOfAkindObject.counterOne));
    }
}

function canculateFourOfAkind(fourOfAkindObject) {
    return (1000 + (50 * fourOfAkindObject.counterFive) + (100 * fourOfAkindObject.counterOne));
}

function canculateFiveOfAkind(fiveOfAkindObject) {
    return (2000 + fiveOfAkindObject.numNotPartOfTheFive)
}

function canculateJustFiveOrOne(presedDice) {
    let temp = 0;
    for (let i = 0; i < presedDice.length; i++) {
        if (presedDice[i] === 1) {
            temp += 100
        } else if (presedDice[i] === 5) {
            temp += 50
        }
    }
    return temp;
}

function canculateScore(presedDice) {

    // some of the functions returns object because i had to canculate what is the extra number (1 = 100 || 5 = 50) besides the rule. 
    let threeOfAkindObject = threeOfAkind(presedDice);
    let fourOfAkindObject = fourOfAkind(presedDice);
    let fiveOfAkindObject = fiveOfAkind(presedDice);

    if (threeOfAkindObject && !twoThrees(presedDice)) {
        return canculateThreeOfAkind(threeOfAkindObject);
    }
    else if (fourOfAkind(presedDice)) {
        return canculateFourOfAkind(fourOfAkindObject);

    } else if (fiveOfAkind(presedDice)) {
        return canculateFiveOfAkind(fiveOfAkindObject);

    } else if (twoThrees(presedDice)) {
        return 2500;
    } else if (straight(presedDice)) {
        return 1500;
    } else if (threePairs(presedDice)) {
        return 1500;
    } else if (sixOfAkind(presedDice)) {
        return 3000;
    } else {
        return canculateJustFiveOrOne(presedDice)
    }
}

function unpresedDiceArr(dice, unpresedDice) {
    const temp = dice.concat().sort();
    const temp2 = unpresedDice.sort();
    const temp3 = [];
    for (let i = 0, j = 0; i <= temp.length - 1; i++) {
        if (j > temp2.length - 1) {
            temp3.push(temp[i]);
        }
        if (temp[i] > temp2[i]) {
            temp3.push(temp2[j])
            j++;
        } else if (temp[i] < temp2[j]) {
            temp3.push(temp[i])
            j--
        }
        j++;
    }
    return temp3
}

export default { canPlayerRollOrPass, ligalMoves, canculateScore, unpresedDiceArr };

