import { useRef, useState } from "react";
import "../stylesheets/App.css";
import animals from "../assets/chicken-rabbit.jpg";
import Dropdown from "./Dropdown";

function App() {
  const [showdropdown, setdropdown] = useState(false);
  let coordinates = useRef();

  function saveCoordinates(e, coordinates) {
    console.log(e);
    coordinates.current = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
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
        <Dropdown showdropdown={showdropdown} coordinates={coordinates} />
      </div>
    </>
  );
}

export default App;
