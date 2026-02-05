import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token
    localStorage.removeItem("token");

    // Redirect to login
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white">
      <h1 className="text-xl font-semibold text-gray-900">
        Crypto Portfolio
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
