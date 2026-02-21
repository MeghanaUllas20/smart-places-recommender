import { useState } from "react";
import Header from "./components/Header";
import MoodSelector from "./components/MoodSelector";
import LocationButton from "./components/LocationButton";
import PlacesList from "./components/PlacesList";
import "./styles/app.css";

function App() {
  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState(null);
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="app-container">
        <Header />

        {/* DARK MODE TOGGLE */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => setDark(!dark)}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <h1 className="title">Smart Nearby Places Recommender</h1>

        <p className="subtitle">
          Select your mood and find places near you 😄
        </p>

        <MoodSelector onMoodSelect={setCategory} />
        <LocationButton onLocation={setLocation} />
        <PlacesList location={location} category={category} />
      </div>
    </div>
  );
}

export default App;