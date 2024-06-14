import { useState } from "react";
import "../stylesheets/App.css";
import animals from "../assets/chicken-rabbit.jpg";

function App() {
  return (
    <>
      <h1>Tag the animals</h1>
      <img
        src={animals}
        alt="Two chickens and a rabbit on a lawn"
        width={600}
      />
    </>
  );
}

export default App;
