import { useState } from "react";

function LocationButton({ onLocation }) {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      setLocation(coords);
      onLocation(coords);
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <button
  onClick={getLocation}
  style={{
    padding: "12px 18px",
    fontSize: "15px",
    borderRadius: "10px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer",
    marginTop: "15px",
  }}
>
  📍 Use My Location
</button>

      {location && (
        <p>
          Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
        </p>
      )}
    </div>
  );
}

export default LocationButton;