import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="text-center max-w-md px-6">
        <h1 className="text-3xl font-bold mb-4">
          Crypto Portfolio Tracker
        </h1>

        <p className="text-gray-400 mb-8">
          Track your crypto investments in real-time.
        </p>

        <Link to="/login">
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
