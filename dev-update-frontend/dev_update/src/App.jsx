import { useState } from "react";
import { Link, Outlet } from "react-router-dom"; // ✅ Import Link and Outlet
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Simple Navbar */}
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#f0f0f0" }}>
        <Link to="/home">Home</Link>
        <Link to="/aisummary">AI Summary</Link>
      </nav>

      {/* Page content renders here */}
      <Outlet />
    </>
  );
}

export default App;
