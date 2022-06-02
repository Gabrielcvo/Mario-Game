import pipe from "../../Assets/Images/pipe.png";
import mario from "../../Assets/Gifs/mario.gif";
import "./styles.scss";
import { useEffect, useState } from "react";

const pipepipe = document.querySelector(".pipeImg") as HTMLElement;
const mariomario = document.querySelector(".marioImg") as HTMLElement;

export function Game() {
  const [pulou, setPulou] = useState(false);

  const handleKeyDown = (event: any) => {
    setPulou(true);

    setTimeout(() => {
      setPulou(false);
    }, 500);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const loop = setInterval(() => {
    if (pipepipe !== null) {
      const pipePosition = pipepipe.offsetLeft;
      const marioPosition = window.getComputedStyle(mariomario).bottom;

      console.log(marioPosition);

      if (pipePosition <= 120) {
        pipepipe.style.animation = "none";
        pipepipe.style.left = `${pipePosition}px`;
      }
    }
  }, 10);

  return (
    <div className="gameBoard">
      <img className="pipeImg" src={pipe} alt="mario pipe" />
      <img
        className={pulou ? "marioImg jump" : "marioImg"}
        src={mario}
        alt="Mario"
      ></img>
    </div>
  );
}
