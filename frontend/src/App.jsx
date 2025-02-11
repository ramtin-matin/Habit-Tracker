import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Habits from "./pages/habits/Habits";
import HabitClusters from "./pages/habit-clusters/HabitClusters";
import HabitStats from "./pages/habit-stats/HabitStats";
import Account from "./pages/account/Account";
import "./index.css";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 mx-3">
        <Routes>
          <Route path="/Habits" element={<Habits />} />
          <Route path="/Habit-Clusters" element={<HabitClusters />} />
          <Route path="/Habit-Stats" element={<HabitStats />} />
          <Route path="/Account" element={<Account />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
