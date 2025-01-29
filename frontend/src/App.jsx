import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/sidebar";
import Home from "./components/pages/Home";
import Habits from "./components/pages/Habits";
import HabitClusters from "./components/pages/HabitClusters";
import HabitStats from "./components/pages/HabitStats";
import Account from "./components/pages/Account";

const App = () => {

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
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
