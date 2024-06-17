import "../stylesheets/dropdown.css";

export default function Dropdown({
  setdropdown,
  showdropdown,
  coordinates,
  handleSubmit,
}) {
  console.log(coordinates);
  if (showdropdown) {
    return (
      <>
        <div
          className="dropDown"
          style={{
            top: coordinates.current["y"] - 70,
            left: coordinates.current["x"] - 80,
          }}
        >
          <form action="">
            <select
              name="animals"
              id="animals"
              onChange={(e) => {
                handleSubmit(e);
                setdropdown(false);
              }}
            >
              <option value="select">Choose an animal</option>
              <option value="brownChicken">Brown chicken</option>
              <option value="whiteChicken">White chicken</option>
              <option value="rabbit">Rabbit</option>
            </select>
          </form>
        </div>
      </>
    );
  }
}
