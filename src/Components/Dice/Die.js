import React, { useState } from 'react';
import './dice.css';

const Die = ({ locked, ifDisable, val, idx, handleClick }) => {

    const numberWords = ["one", "two", "three", "four", "five", "six"];
    let classs = `dice fas fa-dice-${numberWords[val - 1]} fa-5x `;
    locked && (classs += "dice-locked ");
    ifDisable && (classs += " dice-disabled ");

    return (
        <button
            onClick={() => handleClick(idx)}
            disabled={ifDisable}
            className="dice-btn"
        >
            <i className={classs}> </i>
        </button>

    )
}

export default Die;

