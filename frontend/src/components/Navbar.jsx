import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1️⃣ Remove token
    localStorage.removeItem("token");

    // 2️⃣ Redirect to login
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b bg-white">
      <h1 className="text-xl font-bold">Crypto Portfolio</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
