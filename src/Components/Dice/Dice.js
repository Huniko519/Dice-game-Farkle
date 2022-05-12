import React from 'react';
import Die from './Die'
import './dice.css';

const Dice = (props) => {
    return (
        <div>
            {props.dice.map((id, idx) =>
                <Die handleClick={props.handleClick}
                    val={id}
                    locked={props.locked[idx]}
                    idx={idx}
                    key={idx}
                    isRoled={props.isRoled}
                    disabled={props.locked[idx]}
                    ifDisable={props.disabledArr[idx]}
                />)}
        </div>

    )
}

export default Dice;