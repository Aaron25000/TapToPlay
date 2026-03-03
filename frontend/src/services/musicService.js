const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080'

export const getSongNotes = async (song_name) => {
  try {
    const res = await fetch(`${BASE_URL}/notes/${song_name}`);
    if (!res.ok) throw new Error("Not found");
    return await res.json();
  } catch (error) {
    throw error;
  }
};