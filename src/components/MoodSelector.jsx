function MoodSelector({ onMoodSelect }) {
  const moods = [
  { label: "💼 Work", category: "catering.cafe" },
  { label: "❤️ Date", category: "catering.restaurant" },
  { label: "🍔 Quick Bite", category: "catering.fast_food" },
  { label: "💸 Budget", category: "catering.fast_food" },
];

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {moods.map((mood, index) => (
        <button
          key={index}
          onClick={() => onMoodSelect(mood.category)}
          style={{
  margin: "8px",
  padding: "12px 16px",
  fontSize: "15px",
  borderRadius: "20px",
  border: "none",
  background: "#ffffff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  cursor: "pointer",
  transition: "0.2s",
}}
        >
          {mood.label}
        </button>
      ))}
    </div>
  );
}

export default MoodSelector;