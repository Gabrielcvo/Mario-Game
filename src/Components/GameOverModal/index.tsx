import { Link } from "react-router-dom";
import gameOverImg from "../../Assets/Images/gameOver.png";
import scoreImg from "../../Assets/Images/score.png";

import "./styles.scss";

export default function GameOverModal() {
  const storedScore = localStorage.getItem("score");

  return (
    <div className="background">
      <div className="card">
        <img src={gameOverImg} alt="Game over text" />
        <div className="restart">
          <div className="score">
            <img src={scoreImg} alt="Score" />
            <span>: {storedScore}</span>
          </div>

          <div className="buttons">
            <button>
              <Link to="/">MENU</Link>
            </button>

            <button
              onClick={() => {
                document.location.reload();
              }}
            >
              RESTART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
