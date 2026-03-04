// Base URL for FastAPI backend
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
const USER_ID_KEY = "habit_tracker_user_id";

function getOrCreateUserId() {
  const existing = sessionStorage.getItem(USER_ID_KEY);
  if (existing) return existing;

  const userId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  sessionStorage.setItem(USER_ID_KEY, userId);
  return userId;
}

// helper for fetch and error handling:
// prefixes the base url, sends JSON by default, throws
// based on responses, returns parsed JSON or null
async function request(path, method = "GET", body = null) {
  const url = API_URL + path;
  const userId = getOrCreateUserId();
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": userId,
      },
      method: method,
      body: body ? JSON.stringify(body) : null,
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.detail || `Request failed: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Fetch error: ", error.message);
    throw error;
  }
}

// START OF HABITS API //

export const getAllHabits = () => request("/habits"); // returns list of habits
export const getHabitById = (habit_id) => request(`/habits/${habit_id}`, "GET");
export const createHabit = (habit) => request("/habits", "POST", habit);
export const deleteHabit = (habit_id) =>
  request(`/habits/${habit_id}`, "DELETE");
export const updateHabitById = (habit_id, updates) =>
  request(`/habits/${habit_id}`, "PATCH", updates);

// END OF HABITS API //

// START OF HABIT LOGS API //

export const getAllHabitLogs = () => request(`/habitlogs`, "GET");
export const createHabitLog = (habit_id, habit_log) =>
  request(`/habitlogs/${habit_id}`, "POST", habit_log);
export const deleteHabitLog = (habit_id, log_date) =>
  request(`/habitlogs/${habit_id}?log_date=${log_date}`, "DELETE");

// END OF HABIT LOGS API //

// CLUSTERS API //

export const getAllClusters = () => request("/clusters"); // returns list of clusters
export const createCluster = (cluster) => request(`/clusters`, "POST", cluster);
export const getClusterById = (cluster_id) =>
  request(`/clusters/${cluster_id}`, "GET");
export const deleteCluster = (cluster_id) =>
  request(`/clusters/${cluster_id}`, "DELETE");
export const updateClusterById = (cluster_id, cluster) =>
  request(`/clusters/${cluster_id}`, "PATCH", cluster);
export const getClusterHabits = (cluster_id) =>
  request(`/clusters/${cluster_id}/habits`, "GET");

// END OF CLUSTERS API //
