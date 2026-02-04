import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <Link to="/">Profile Example</Link>
        
        <Navbar />
      </header>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
