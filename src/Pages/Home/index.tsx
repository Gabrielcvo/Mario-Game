import { Link } from "react-router-dom";

import marioLogoImg from "../../Assets/Images/marioLogo.png";
import playImg from "../../Assets/Images/play.png";
import recordImg from "../../Assets/Images/record.png";
import background from "../../Assets/Images/background.jpg";

import "./styles.scss";
import { useLayoutEffect, useState } from "react";

export interface IHomeProps {
  recordPontuation: number;
}

export default function Home() {
  const [record, setRecord] = useState(0);

  function handleRecord() {
    const storedRecord = localStorage.getItem("record");
    if (storedRecord) {
      setRecord(JSON.parse(storedRecord));
    }
  }

  useLayoutEffect(() => {
    handleRecord();
  });

  return (
    <div className="background">
      <img className="background" src={background} alt="background" />

      <div className="content">
        <img className="marioLogoImg" src={marioLogoImg} alt="MarioLogo" />
        <div className="card">
          <nav>
            <Link to="/game">
              <img src={playImg} alt="fonte-de-super-mario" />
            </Link>
          </nav>

          <span className="record">
            <img src={recordImg} alt="fonte-de-super-mario" />:{" "}
            <span style={{ marginBottom: 10 }}>{record}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
