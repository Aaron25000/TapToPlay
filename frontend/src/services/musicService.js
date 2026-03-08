const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export const getSongNotes = async (song_name) => {
  try {
    const res = await fetch(`${BASE_URL}/notes/${song_name}`);
    if (!res.ok) throw new Error("Not found");
    return await res.json();
  } catch (error) {
    throw error;
  }
};