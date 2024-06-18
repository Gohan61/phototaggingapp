import { useEffect, useState } from "react";

export default function Highscores({ highScore, finalTime }) {
  const [highscoreList, setHighScoreList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/highscores", {
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
        setHighScoreList(res);
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
