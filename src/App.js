import React, { useState, useEffect } from "react";
import "./styles.css";
import Board from "./components/Board";
import Player from "./components/Player";
import { calculateWinner } from "./Helper";

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [isPlayer1, setIsPlayer1] = useState(true);
  const [gameStart, setGameStart] = useState(false);
  const [counter, setCounter] = useState(5);
  const [countdown0, setCountdown0] = useState(false);
  const [winner, setWinner] = useState("");
  const startSquares = Array(9).fill(null);

  let newSquares = [...squares];
  let gameOver = false;
  let winnerArray = calculateWinner(squares);
  //let winner = "";

  try {
    if (winnerArray.indexOf("X") >= 0 || winnerArray.indexOf("O") >= 0) {
      gameOver = true;
      if (winnerArray.indexOf("X") >= 0) {
        setWinner("Player1");
      } else {
        setWinner("Player2");
      }
    } else if (squares.indexOf(null) === -1) {
      setWinner("tie");
    } else if (countdown0 === true && gameStart === true) {
      if (isPlayer1) setWinner("Player2");
      else setWinner("Player1");
    }
  } catch (e) {
    console.log(e);
  }
  const startGameHandler = () => {
    setGameStart(true);
    setCounter(5);
    setWinner("");
  };

  const resetHandler = () => {
    setSquares(startSquares);
    newSquares = startSquares;
    setIsPlayer1(true);
    setGameStart(false);
    setCounter(5);
    setWinner("");
  };

  const handleClick = (index, event) => {
    if (squares[index] !== "X" && squares[index] !== "O" && !gameOver) {
      isX ? (newSquares[index] = "X") : (newSquares[index] = "O");
      setSquares(newSquares);
      setIsX(!isX);
      setIsPlayer1(!isPlayer1);
    }
  };

  useEffect(() => {
    if (counter === 0) {
      setCountdown0(true);
      gameOver = true;
    }

    if (gameStart === true && winner.length === 0) {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [counter, gameStart, winner]);

  useEffect(() => {
    setCounter(5);
  }, [isPlayer1]);

  return (
    <div className="App">
      <h1> Tic Tac Toe </h1>
      <button className="buttons" onClick={startGameHandler}>
        Start
      </button>
      {gameStart && !countdown0 ? (
        <div>
          <p className="para">Countdown : {counter}</p>
          <Player isPlayer1={isPlayer1} winner={winner} />
          <Board squares={squares} onClick={handleClick} />
        </div>
      ) : (
        <div>
          <p className="para">Countdown : </p>
          <Player isPlayer1={isPlayer1} winner={winner} />
          <Board squares={startSquares} onClick={() => {}} />
        </div>
      )}
      <button className="buttons" onClick={resetHandler}>
        Reset
      </button>
      {gameStart ? (
        <p className="para"> Game started </p>
      ) : (
        <p className="para"> Please start the game </p>
      )}
    </div>
  );
}
