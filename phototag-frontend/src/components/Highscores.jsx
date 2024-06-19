import { useEffect, useState } from "react";

export default function Highscores({ highScore, finalTime, setError }) {
  const [highscoreList, setHighScoreList] = useState([]);

  useEffect(() => {
    fetch("https://phototag-backend-odin.adaptable.app/highscores", {
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
        if (res.highscores) {
          setHighScoreList(res);
        } else {
          throw new Error("Highscores not found");
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, [highScore, finalTime]);

  if (finalTime) {
    return (
      <>
        <table className="highscoreList">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1.</th>
              <td>{highscoreList.highscores[2].username}</td>
              <td>{highscoreList.highscores[2].time}</td>
            </tr>
            <tr>
              <th>2.</th>
              <td>{highscoreList.highscores[1].username}</td>
              <td>{highscoreList.highscores[1].time}</td>
            </tr>
            <tr>
              <th>3.</th>
              <td>{highscoreList.highscores[0].username}</td>
              <td>{highscoreList.highscores[0].time}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
