import { useRef, useState } from "react";
import "../stylesheets/App.css";
import animals from "../assets/chicken-rabbit.jpg";
import Dropdown from "./Dropdown";

function App() {
  const [showdropdown, setdropdown] = useState(false);
  let coordinates = useRef();
  const [message, setMessage] = useState("");

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
        console.log(res);
        if (res.message === "Coordinates not in range") {
          setMessage(res.message);
        } else {
          setMessage(res.message);
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
      </div>
      <p className="message">{message}</p>
    </>
  );
}

export default App;
