import React from 'react'

const PlayersScoreHeader = ({ playerOneSum, playerTwoSum, turnScore }) => {
    return (
        <div>
            <p>
                Player One:
        {playerOneSum}
            </p>
            <p>
                Player Two:
        {playerTwoSum}
            </p>
            <p className="turn">
                Turn score:
                 {turnScore}
            </p>
        </div>
    )
}

export default PlayersScoreHeader;