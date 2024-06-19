import { useEffect, useMemo, useRef, useState } from "react";
import "../stylesheets/App.css";
import animals from "../assets/chicken-rabbit.jpg";
import Dropdown from "./Dropdown";
import Marker from "./Marker";
import Newhighscore from "./Newhighscore";
import Highscores from "./Highscores";

function App() {
  const [showdropdown, setdropdown] = useState(false);
  let coordinates = useRef();
  const [message, setMessage] = useState("");
  const [markers, setMarker] = useState({
    brownChicken: false,
    rabbit: false,
    whiteChicken: false,
  });
  const [finalTime, setFinalTime] = useState("");
  const [newGame, setNewGame] = useState(false);
  const [highScore, newhighScore] = useState(false);
  const [errors, setError] = useState("");
  let timeID = useRef();

  function saveCoordinates(e, coordinates) {
    coordinates.current = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://phototag-backend-odin.adaptable.app/", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        x: coordinates.current.x,
        y: coordinates.current.y,
        animal: e.target.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.message === "Coordinates not in range") {
          setMessage("That was a miss");
        } else {
          setMessage("That was a hit");
          setMarker({ ...markers, [e.target.value]: true });
        }
      });
  };

  useEffect(() => {
    setNewGame(true);
    fetch("https://phototag-backend-odin.adaptable.app/", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.message === "Game has started") {
          setMessage(res.message);
          timeID.current = res.id;
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, [newGame]);

  if (
    markers.brownChicken === true &&
    markers.whiteChicken === true &&
    markers.rabbit === true
  ) {
    setMarker({ brownChicken: false, rabbit: false, whiteChicken: false });
    fetch(`https://phototag-backend-odin.adaptable.app/${timeID.current}`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setFinalTime(res.finalTime);
        if (res.newHighScore) {
          newhighScore(true);
        } else {
          setMessage("Better luck next time");
        }
      });
  }

  return (
    <>
      <h1>Tag the animals</h1>
      <div className="imageContainer">
        <img
          src={animals}
          alt="Two chickens and a rabbit on a lawn"
          width={600}
          className="animals"
          onClick={(e) => {
            showdropdown ? setdropdown(false) : setdropdown(true);
            saveCoordinates(e, coordinates);
          }}
        />
        <Dropdown
          setdropdown={setdropdown}
          showdropdown={showdropdown}
          coordinates={coordinates}
          handleSubmit={handleSubmit}
        />
        <Marker marker={markers} />
      </div>
      {finalTime ? <p className="time">Your time: {finalTime} seconds</p> : ""}
      <p className="message">{message}</p>
      <Newhighscore
        highScore={highScore}
        newhighScore={newhighScore}
        finalTime={finalTime}
        setMessage={setMessage}
      />
      <button className="newGame" onClick={() => setNewGame(false)}>
        New Game
      </button>
      <Highscores
        highScore={highScore}
        finalTime={finalTime}
        setError={setError}
      />
      <p className="error">{errors}</p>
    </>
  );
}

export default App;
