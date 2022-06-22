import "./styles.scss";
import { useEffect, useLayoutEffect, useState } from "react";

import pipe from "../../Assets/Images/pipe.png";
import mario from "../../Assets/Gifs/mario.gif";
import gameOverImg from "../../Assets/Images/gameOverMario.png";
import cloudsImg from "../../Assets/Images/clouds.png";
import useInterval from "../../Hooks/useInterval";
import GameOverModal from "../../Components/GameOverModal";

export function Game() {
  const [jump, setJump] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [delayState, setDelayState] = useState<null | number>(null);
  const [record, setRecord] = useState(0);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      setJump(true);
    }

    setTimeout(() => {
      setJump(false);
    }, 500);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    setDelayState(10);

    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useInterval(() => loop(), delayState);

  useLayoutEffect(() => {
    const storedRecord = localStorage.getItem("record");
    setRecord(Number(storedRecord!));
  });

  function compareScore() {
    if (score > record) {
      localStorage.setItem("record", JSON.stringify(score));
    }
  }

  if (gameOver) {
    localStorage.setItem("score", JSON.stringify(score));
    compareScore();
  }

  function loop() {
    const pipeStyle = document.querySelector(".pipeImg") as HTMLElement;
    const marioStyle = document.querySelector(".marioImg") as HTMLElement;

    if (pipeStyle !== null) {
      const pipePosition = pipeStyle.offsetLeft;
      const marioPosition = +window
        .getComputedStyle(marioStyle)
        .bottom.replace("px", "");

      if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipeStyle.style.animation = "none";
        pipeStyle.style.left = `${pipePosition}px`;

        marioStyle.style.animation = "none";
        marioStyle.style.bottom = `${marioPosition}px`;

        marioStyle.style.width = "75px";
        marioStyle.style.marginLeft = "50px";

        setGameOver(true);
        setDelayState(null);
      } else {
        setScore(score + 1);
      }
    }
  }

  return (
    <div className="gameBoard">
      <header className="pontuacao">
        <h1>Score: {score}</h1>
      </header>
      <img className="cloudsImg" src={cloudsImg} alt="clouds" />
      <img className="pipeImg" src={pipe} alt="mario pipe" />
      <img
        className={jump ? "marioImg jump" : "marioImg"}
        src={!gameOver ? mario : gameOverImg}
        alt="Mario"
      ></img>
      {gameOver && <GameOverModal />}
    </div>
  );
}
