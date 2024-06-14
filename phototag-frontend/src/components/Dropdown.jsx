import "../stylesheets/dropdown.css";

export default function Dropdown({ showdropdown, coordinates }) {
  console.log(coordinates);
  if (showdropdown) {
    return (
      <>
        <div
          className="dropDown"
          style={{
            top: coordinates.current["y"] - 200,
            left: coordinates.current["x"] - 100,
          }}
        >
          <form action="">
            <select name="animals" id="animals">
              <option value="select">Choose an animal</option>
              <option value="brown-chicken">Brown chicken</option>
              <option value="white-chicken">White chicken</option>
              <option value="rabbit">Rabbit</option>
            </select>
          </form>
        </div>
      </>
    );
  }
}
