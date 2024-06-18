import { useState } from "react";

export default function Newhighscore({
  highScore,
  newhighScore,
  finalTime,
  setMessage,
}) {
  const [username, setUsername] = useState("");
  const [errors, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/highscore", {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        time: finalTime,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.message === "Highscore updated") {
          newhighScore(false);
          setMessage("Awesome");
        } else {
          const errorMessage = { msg: res.errors.errors.msg };
          throw { errorMessage };
        }
      })
      .catch((error) => {
        setError(error.errorMessage.msg);
      });
  };

  if (highScore) {
    return (
      <>
        <form action="" method="put">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>
        <p className="error">{errors}</p>
      </>
    );
  }
}
