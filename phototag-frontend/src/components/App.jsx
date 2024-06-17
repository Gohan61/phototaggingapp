import { useRef, useState } from "react";
import "../stylesheets/App.css";
import animals from "../assets/chicken-rabbit.jpg";
import Dropdown from "./Dropdown";
import Marker from "./Marker";

function App() {
  const [showdropdown, setdropdown] = useState(false);
  let coordinates = useRef();
  const [message, setMessage] = useState("");
  const [markers, setMarker] = useState({
    brownChicken: false,
    rabbit: false,
    whiteChicken: false,
  });

  function saveCoordinates(e, coordinates) {
    coordinates.current = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/", {
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

      <p className="message">{message}</p>
    </>
  );
}

export default App;
