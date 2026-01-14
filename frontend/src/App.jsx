import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Portfolio from "./pages/Portfolio";
import ProtectedRoute from "./components/ProtectedRoute";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="text-center max-w-md px-6">
        <h1 className="text-3xl font-bold mb-4">
          Crypto Portfolio Tracker
        </h1>

        <p className="text-gray-400 mb-8">
          Track your crypto investments in real-time with live price updates.
        </p>

        <Link to="/login">
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
