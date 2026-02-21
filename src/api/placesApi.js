const API_KEY = "0fa7b4438cf34a44900db89236ff74e7";

export const fetchNearbyPlaces = async (lat, lng, category) => {
  const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lng},${lat},2000&limit=10&apiKey=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  return data.features;
};