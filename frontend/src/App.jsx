import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/sidebar";
import Home from "./pages/dashboard/Home";
import Habits from "./pages/dashboard/habits";
import HabitClusters from "./pages/dashboard/HabitClusters";
import HabitStats from "./pages/dashboard/HabitStats";
import Account from "./pages/dashboard/Account";
import './index.css';

const App = () => {

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 mx-3">
        <Routes>
          <Route path="/Home" element={<Home />} />
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
