import React, { useState, useEffect } from "react";
import Dice from "../../Components/Dice/Dice";
import rules from "../../Components/RulesAndFunctions/rules";
import Instructions from "../../Components/Instructions/Instructions";
import AlertDialogSlide from "../alerts/AlertDialogSlide";
import AlertDialogSlideWinner from "../alerts/AlertDialogSlideWinner";
import Footer from "../../Components/Board/Footer";
import GitHubIcon from "@material-ui/icons/GitHub";
import StartGameComponent from "../../Components/Board/StartGameComponent";
import Header from "../../Components/Board/Header";
import PlayersHeader from "../../Components/Board/PlayersScoreHeader";
import "../Dice/dice.css";
import { Button } from "@material-ui/core";
import center from "../../assests/img/center.svg";
const Board = () => {
  const [dice, setDices] = useState(Array(6).fill(null));
  const [presedDice, setPresedDice] = useState([]);
  const [unpresedDice, setUnpresedDice] = useState([]);
  const [sumAfterRoll, setSumAfterRoll] = useState(0);
  const [sumBeforePass, setSumBeforePass] = useState(0);
  const [flagBeforePass, setFlagBeforePass] = useState(true);
  const [locked, setLocked] = useState(Array(6).fill(false));
  const [disabledArr, setDisabledArr] = useState(Array(6).fill(false));
  const [isRoled, setIsRoled] = useState(true);
  const [playerOneSum, setPlayerOneSum] = useState(0);
  const [playerTwoSum, setPlayerTwoSum] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [start, setStart] = useState(false);
  const [over1000PlayerOne, setover1000PlayerOne] = useState(false);
  const [over1000PlayerTwo, setover1000PlayerTwo] = useState(false);
  const [winner, setWinner] = useState({ win: false, player: 0 });

  // calculate score before pass and after a roll
  useEffect(() => {
    canculateScoreBeforePass();
  }, [flagBeforePass]);

  // if a player score more then 1000 points we need to open the pass btn
  useEffect(() => {
    isOver1000();
  }, [sumBeforePass]);

  // player who get more then 10000 points is the winner
  useEffect(() => {
    isWinner();
  }, [playerOneSum, playerTwoSum]);

  // we need to make a new arr of the unpressed  Dice to calculate if the player have a ligal play.
  useEffect(() => {
    isFarkle();
  }, [isRoled]);

  // when dice changd we need to to know if we should alert "lose points alert"
  useEffect(() => {
    if (dice[0] !== null && rules.ligalMoves(dice) === false) {
      farkle();
    }
  }, [dice]);

  function startGame() {
    // generate new board
    setDices(
      dice.map((dice, i) =>
        locked[i] ? dice : Math.floor(Math.random() * (6 - 1 + 1) + 1)
      )
    );
    rules.canculateScore(presedDice);
    setStart(true);
  }

  // start new game
  function startNewGame() {
    setLocked(Array(6).fill(false));
    // generate new board
    setDices(
      dice.map((dice, i) =>
        locked[i] ? dice : Math.floor(Math.random() * (6 - 1 + 1) + 1)
      )
    );
    setStart(true);
    setUnpresedDice([]);
    setDisabledArr(Array(6).fill(false));
    setSumBeforePass(0);
    setSumAfterRoll(0);
    setPlayerOneSum(0);
    setPlayerTwoSum(0);
    setPresedDice([]);
    setover1000PlayerOne(0);
    setover1000PlayerTwo(0);
  }

  function toggleLocked(idx) {
    //idx == index of the dice in the dice arr
    //dice[idx] == value of the index preesed
    setLocked([
      ...locked.slice(0, idx),
      !locked[idx],
      ...locked.slice(idx + 1),
    ]);
    if (locked[idx] === false) {
      setPresedDice([...presedDice, dice[idx]]);
      setFlagBeforePass(!flagBeforePass);
    } else {
      let tempIndex = presedDice.indexOf(dice[idx]);
      let tempArr = presedDice;
      let temp = [];
      if (tempIndex > -1) {
        temp = tempArr.splice(tempIndex, 1);
        setPresedDice(tempArr);
        setSumBeforePass(rules.canculateScore(presedDice));
        setFlagBeforePass(!flagBeforePass);
      }
    }
  }
  // generte random dice to unpressed dice
  function roll() {
    let flag = false;
    for (let i = 0; i <= locked.length - 1; i++) {
      if (locked[i] === false) {
        flag = true;
        break;
      }
    }
    if (flag === false) {
      setDices(
        dice.map((dice) => (dice = Math.floor(Math.random() * (6 - 1 + 1) + 1)))
      );
      setLocked(locked.map((lock) => lock === false));
      setDisabledArr(locked.map((lock) => false));
      setSumAfterRoll(sumBeforePass);
      setPresedDice([]);
      setIsRoled(!isRoled);
    }
    // we want to create the unpressdice arr state so we need to do it before we roll
    else {
      setDices(
        dice.map((dice, i) =>
          locked[i] ? dice : Math.floor(Math.random() * (6 - 1 + 1) + 1)
        )
      );
      setDisabledArr(locked.map((dice, i) => (locked[i] ? true : false)));
      let temp = [];
      for (let i = 0; i <= dice.length; i++) {
        if (locked[i] === true) {
          temp.push(dice[i]);
        }
      }
      setUnpresedDice(temp);
      setSumAfterRoll(sumBeforePass);
      setIsRoled(!isRoled);
    }
  }

  //pass button function
  function pass() {
    setLocked(locked.map((locke) => !locked));
    setDices(
      dice.map((dice) => (dice = Math.floor(Math.random() * (6 - 1 + 1) + 1)))
    );
    setDisabledArr(locked.map((locke) => false));

    const tempScore = sumAfterRoll + rules.canculateScore(presedDice);
    if (playerTurn) {
      setPlayerOneSum(playerOneSum + tempScore);
    } else {
      setPlayerTwoSum(playerTwoSum + tempScore);
    }
    setSumBeforePass(0);
    setSumAfterRoll(0);
    setPresedDice([]);
    setPlayerTurn(!playerTurn);
  }

  function farkle() {
    alert(`FARkLE \n You lost${" " + sumBeforePass} points!`);
    setPlayerTurn(!playerTurn);
    setLocked(locked.map((locke) => !locked));
    setDisabledArr(disabledArr.map((locke) => false));
    setDices(
      dice.map((dice) => (dice = Math.floor(Math.random() * (6 - 1 + 1) + 1)))
    );
    setSumBeforePass(0);
    setSumAfterRoll(0);
    setUnpresedDice([]);
    setPresedDice([]);
  }
  function isOver1000() {
    if (sumBeforePass >= 1000 && playerOneSum === 0 && playerTurn) {
      setover1000PlayerOne(true);
    }
    if (sumBeforePass >= 1000 && playerTwoSum === 0 && !playerTurn) {
      setover1000PlayerTwo(true);
    }
  }

  function isWinner() {
    if (playerOneSum >= 10000) {
      setWinner({ win: true, player: 1 });
    } else if (playerTwoSum >= 10000) {
      setWinner({ win: true, player: 2 });
    }
  }

  function isFarkle() {
    let temp = rules.unpresedDiceArr(dice, unpresedDice);
    // when we rool we need to to know if we should alert "lose points alert" on the unpressed dice after roll
    if (
      temp.length < 6 &&
      temp[0] !== null &&
      rules.ligalMoves(temp) === false
    ) {
      farkle();
    }
    setPresedDice([]);
  }

  function canculateScoreBeforePass() {
    setSumBeforePass(sumAfterRoll + rules.canculateScore(presedDice));
  }

  // we need to know if we can enabled button so we need to run all possible rules before

  const flag = rules.canPlayerRollOrPass(presedDice);
  const canIRool = flag;

  let rollBtn = canIRool ? (
    <button className="roll" onClick={roll}>
      Roll
    </button>
  ) : (
    <button className="disaled" disabled>
      {" "}
      Roll
    </button>
  );

  let passBtn =
    canIRool &&
    ((playerTurn && over1000PlayerOne) ||
      (!playerTurn && over1000PlayerTwo)) ? (
      <button className="pass" onClick={pass}>
        Pass
      </button>
    ) : (
      <button className="disaled" disabled>
        Pass
      </button>
    );

  let styleLinks = !start ? "links-continer" : "links-continer-after-start";

  return (
    <div className="maindiv">
      <div className="svg4">
        <img src={center} width="100px" height="100px" />
      </div>
      <Header />
      {start ? (
        <>
          <PlayersHeader
            playerOneSum={playerOneSum}
            playerTwoSum={playerTwoSum}
            turnScore={sumBeforePass}
          />
          <div className="dice-continer">
            <Dice
              dice={dice}
              locked={locked}
              handleClick={toggleLocked}
              isRoled={!isRoled}
              disabledArr={disabledArr}
            />
          </div>
          <>
            <p className="turn">
              {`player ${playerTurn ? "one" : "two"} is playing`}
            </p>
            {rollBtn}
            {passBtn}
          </>
          <div>
            <button className="newgame-button" onClick={startNewGame}>
              New Game
            </button>
          </div>
        </>
      ) : (
        <StartGameComponent startGame={startGame} />
      )}
      {winner.win && (
        <AlertDialogSlideWinner winner={winner.player} openDialog={true} />
      )}
      <Footer start={start} />
    </div>
  );
};

export default Board;
