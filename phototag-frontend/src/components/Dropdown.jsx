export default function Dropdown({ showdropdown }) {
  if (showdropdown) {
    return (
      <>
        <div className="dropDown">
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
