import "../stylesheets/Marker.css";

export default function Marker({ marker }) {
  return (
    <>
      {marker.whiteChicken ? <div className="marker whiteChicken">X</div> : ""}
      {marker.brownChicken ? <div className="marker brownChicken">X</div> : ""}
      {marker.rabbit ? <div className="marker rabbit">X</div> : ""}
    </>
  );
}
