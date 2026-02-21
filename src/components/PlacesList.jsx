import { useEffect, useState } from "react";
import { fetchNearbyPlaces } from "../api/placesApi";

/* DISTANCE FUNCTION */
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
};

function PlacesList({ location, category }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]); // ❤️ NEW

  useEffect(() => {
    const loadPlaces = async () => {
      if (!location || !category) return;

      setLoading(true);
      const data = await fetchNearbyPlaces(
        location.lat,
        location.lng,
        category
      );
      setPlaces(data);
      setLoading(false);
    };

    loadPlaces();
  }, [location, category]);

  /* TOGGLE FAVORITE */
  const toggleFavorite = (place) => {
    const exists = favorites.find(
      (p) => p.properties.place_id === place.properties.place_id
    );

    if (exists) {
      setFavorites(
        favorites.filter(
          (p) => p.properties.place_id !== place.properties.place_id
        )
      );
    } else {
      setFavorites([...favorites, place]);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      {/* LOADING */}
      {loading && <p>⏳ Loading places...</p>}

      {/* EMPTY */}
      {!loading && places.length === 0 && category && (
        <p style={{ color: "#777" }}>
          No places found nearby 😢 Try another mood!
        </p>
      )}

      {/* RESULTS */}
      {places.length > 0 && !loading && <h3>Recommended Places:</h3>}

      {places.map((place, i) => {
        const lat2 = place.geometry.coordinates[1];
        const lon2 = place.geometry.coordinates[0];

        const distance = getDistance(
          location.lat,
          location.lng,
          lat2,
          lon2
        );

        const isFav = favorites.some(
          (p) => p.properties.place_id === place.properties.place_id
        );

        return (
          <div
            key={i}
            style={{
              background: "#ffffff",
              borderRadius: "12px",
              color: "#111",
              padding: "15px",
              marginBottom: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              textAlign: "left",
              position: "relative",
            }}
          >
            {/* HEART BUTTON */}
            <button
              onClick={() => toggleFavorite(place)}
              style={{
                position: "absolute",
                right: "15px",
                top: "15px",
                border: "none",
                background: "transparent",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              {isFav ? "💖" : "🤍"}
            </button>

            <strong>
              {place.properties.name || "Unnamed Place"}
            </strong>

            <p style={{ color: "#555" }}>
              {place.properties.formatted}
            </p>

            <p style={{ fontSize: "13px", color: "#888" }}>
              📍 {distance} km away
            </p>
          </div>
        );
      })}

      {/* FAVORITES SECTION */}
      {favorites.length > 0 && (
        <div style={{ marginTop: "40px", textAlign: "left" }}>
          <h3>❤️ Your Favorites</h3>
          {favorites.map((fav, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              • {fav.properties.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlacesList;