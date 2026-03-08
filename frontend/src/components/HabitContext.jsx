import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createCluster,
  createHabit,
  createHabitLog,
  deleteHabit,
  deleteHabitLog,
  getAllClusters,
  getAllHabitLogs,
  getAllHabits,
  getHabitById,
  updateClusterById,
  updateHabitById,
  deleteCluster,
} from "../api";

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [habitLogs, setHabitLogs] = useState([]);

  useEffect(() => {
    async function loadHabits() {
      try {
        const data = await getAllHabits();
        setHabits(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load habits:", err);
      }
    }

    loadHabits();
  }, []);

  useEffect(() => {
    async function loadClusters() {
      try {
        const data = await getAllClusters();
        setClusters(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load clusters:", err);
      }
    }

    loadClusters();
  }, []);

  const loadHabitLogs = useCallback(async () => {
    try {
      const data = await getAllHabitLogs();
      const logs = Array.isArray(data) ? data : [];
      setHabitLogs(logs);
      return logs;
    } catch (err) {
      console.error("Failed to load habit logs:", err);
      throw err;
    }
  }, []);

  const toggleHabitCompletion = async (habitId, dateKey) => {
    const existingLog = habitLogs.find(
      (log) => log.habit_id === habitId && log.log_date === dateKey,
    );

    try {
      if (existingLog) {
        await deleteHabitLog(habitId, dateKey);
        setHabitLogs((prevLogs) =>
          prevLogs.filter(
            (log) => !(log.habit_id === habitId && log.log_date === dateKey),
          ),
        );
        return false;
      }

      const createdLog = await createHabitLog(habitId, { log_date: dateKey });
      setHabitLogs((prevLogs) => [createdLog, ...prevLogs]);
      return true;
    } catch (err) {
      console.error("Failed to toggle habit log:", err);
      throw err;
    }
  };

  const handleCreateHabit = async (habitInput) => {
    try {
      const createdHabit = await createHabit(habitInput);
      setHabits((prev) => [createdHabit, ...prev]);
      return createdHabit;
    } catch (err) {
      console.error("Failed to create new habit:", err);
      throw err;
    }
  };

  const handleDeleteHabit = async (habitId) => {
    try {
      const deletedHabit = await deleteHabit(habitId);
      setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
      setHabitLogs((prevLogs) =>
        prevLogs.filter((log) => log.habit_id !== habitId),
      );
      return deletedHabit;
    } catch (err) {
      console.error("Failed to delete habit:", err);
      throw err;
    }
  };

  const handleEditHabit = async (habitId, updatedFields) => {
    try {
      const updatedHabit = await updateHabitById(habitId, updatedFields);
      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit.id === habitId ? updatedHabit : habit,
        ),
      );
      return updatedHabit;
    } catch (err) {
      console.error("Failed to update habit:", err);
      throw err;
    }
  };

  const handleCreateCluster = async (newCluster) => {
    try {
      const createdCluster = await createCluster(newCluster);
      setClusters((prev) => [createdCluster, ...prev]);
      return createdCluster;
    } catch (err) {
      console.error("Failed to create new cluster:", err);
      throw err;
    }
  };

  const handleEditCluster = async (clusterId, updatedFields) => {
    try {
      const updatedCluster = await updateClusterById(clusterId, updatedFields);
      setClusters((prevClusters) =>
        prevClusters.map((cluster) =>
          cluster.id === clusterId ? updatedCluster : cluster,
        ),
      );
      return updatedCluster;
    } catch (err) {
      console.error("Failed to update cluster:", err);
      throw err;
    }
  };

  const handleDeleteCluster = async (clusterId) => {
    try {
      const deletedCluster = await deleteCluster(clusterId); // backend also sets related habits cluster_id to null
      // local UI update
      setClusters((prev) => prev.filter((cluster) => cluster.id !== clusterId));
      setHabits((prev) =>
        prev.map((habit) =>
          habit.cluster_id === clusterId
            ? { ...habit, cluster_id: null }
            : habit,
        ),
      );
      return deletedCluster;
    } catch (err) {
      console.error("Failed to delete cluster:", err);
      throw err;
    }
  };

  return (
    <HabitContext.Provider
      value={{
        clusters,
        habitLogs,
        habits,
        handleCreateHabit,
        handleDeleteHabit,
        handleEditHabit,
        loadHabitLogs,
        getHabitById,
        toggleHabitCompletion,
        handleCreateCluster,
        handleEditCluster,
        handleDeleteCluster,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => useContext(HabitContext);
