import { useState } from "react";
import "../stylesheets/App.css";
import animals from "../assets/chicken-rabbit.jpg";
import Dropdown from "./Dropdown";

function App() {
  const [showdropdown, setdropdown] = useState(false);

  return (
    <>
      <h1>Tag the animals</h1>
      <img
        src={animals}
        alt="Two chickens and a rabbit on a lawn"
        width={600}
        onClick={() => (showdropdown ? setdropdown(false) : setdropdown(true))}
      />
      <Dropdown showdropdown={showdropdown} />
    </>
  );
}

export default App;
