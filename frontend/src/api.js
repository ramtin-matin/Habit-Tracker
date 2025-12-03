// Base URL for FastAPI backend
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

// helper for fetch and error handling:
// prefixes the base url, sends JSON by default, throws
// based on responses, returns parsed JSON or null
async function request(path, options = {}) {
  const url = `${API_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  // Error handling (convert non-OK HTTP responses into errors)
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed ${res.status}: ${text}`);
  }

  // Handling 'no content' responses
  if (res.status === 204) {
    return null;
  }

  // Parse JSON and return it
  return res.json();
}

// HABITS API //
export const getHabits = () => request("/habits"); // returns list of habits
export const postHabit = (habit) =>
  request("/habits", {
    method: "POST",
    body: JSON.stringify(habit),
  }); // creates habit from JS object

// CLUSTERS API //
export const getClusters = () => request("/clusters"); // returns list of clusters
export const postCluster = (cluster) =>
  request("/clusters", {
    method: "POST",
    body: JSON.stringify(cluster),
  }); // creates cluster from JS object
