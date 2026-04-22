console.log("Full Env:", import.meta.env);
console.log("My API URL:", import.meta.env.VITE_API_BASE);

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const fetchSongs = async () => {
  try {
    const response = await fetch(`${API_BASE}/songs`);
    if (!response.ok) throw new Error("Failed to fetch songs");
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchSongById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/songs/${id}`);
    if (!response.ok) throw new Error("Failed to fetch song by id");
    return await response.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE}/users`);
    if (!response.ok) throw new Error("Failed to fetch users");
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const saveProgress = async (userId, progressData) => {
  try {
    const response = await fetch(`${API_BASE}/users/${userId}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(progressData),
    });
    if (!response.ok) throw new Error("Failed to save progress");
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const searchSongs = async (query, difficulty) => {
  try {
    const params = new URLSearchParams();

    if (query) params.append("q", query);
    if (difficulty) params.append("difficulty", difficulty);

    const response = await fetch(`${API_BASE}/songs/search?${params.toString()}`);
    if (!response.ok) throw new Error("Search failed");

    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const loginUser = async (pin) => {
  try {
    const response = await fetch(`${API_BASE}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });

    if (!response.ok) throw new Error("Login failed");
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const logoutUser = async () => {
  return true;
};