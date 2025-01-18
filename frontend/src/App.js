import React from 'react';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "40px" }}>
      </div>
    </div>
  );
};

export default App