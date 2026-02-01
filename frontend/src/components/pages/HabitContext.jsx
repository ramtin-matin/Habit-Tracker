import { createContext, useContext, useState, useEffect } from "react";
import {
  getAllClusters,
  getAllHabits,
  createHabit,
  deleteHabit,
  getHabitById,
  updateHabitById,
  getAllHabitLogs,
} from "../../api";

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  /// START OF API CALLS ///

  // React state for all habits in the app
  const [habits, setHabits] = useState([]);

  // On first mount, load habits from the backend API
  useEffect(() => {
    async function loadHabits() {
      try {
        const data = await getAllHabits();
        setHabits(data);
        console.log("Loaded habits: ", data);
      } catch (err) {
        console.error("Failed to load habits: ", err);
      }
    }

    loadHabits();
  }, []);

  const addHabit = async (habitInput) => {
    try {
      const createdHabit = await createHabit(habitInput);
      setHabits((prev) => [createdHabit, ...prev]);

      console.log("New habit created: ", createdHabit);
      return createdHabit;
    } catch (err) {
      console.error("Failed to create new habit: ", err);
      throw err;
    }
  };

  const handleDeleteHabit = async (habitId) => {
    try {
      const deletedHabit = await deleteHabit(habitId);
      setHabits((prev) => prev.filter((habit) => habit.id !== habitId));

      console.log("Habit ID deleted: ", habitId);
      return deletedHabit;
    } catch (err) {
      console.error("Failed to delete habit: ", err);
      throw err;
    }
  };

  const handleEditHabit = async (habit_id, updatedFields) => {
    try {
      const update = await updateHabitById(habit_id, updatedFields);
      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit.id === habit_id ? { ...habit, ...updatedFields } : habit,
        ),
      );
      console.log("Updated fields: ", update);
      return update;
    } catch (err) {
      console.error("Failed to update habit: ", err);
      throw err;
    }
  };

  // react state for all clusters in the app
  const [clusters, setClusters] = useState([]);

  // On first mount, load clusters from the backend API
  useEffect(() => {
    async function loadClusters() {
      try {
        const data = await getAllClusters();
        setClusters(data);
        console.log("Loaded clusters: ", data);
      } catch (err) {
        console.error("Failed to load clusters: ", err);
      }
    }

    loadClusters();
  }, []);

  /// END OF API CALLS ///

  const [activeCluster, setActiveCluster] = useState({
    id: clusters[0]?.id,
    name: clusters[0]?.name,
  });

  return (
    <HabitContext.Provider
      value={{
        habits,
        setHabits,
        clusters,
        setClusters,
        handleEditHabit,
        addHabit,
        handleDeleteHabit,
        activeCluster,
        setActiveCluster,
        getHabitById,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => useContext(HabitContext);
