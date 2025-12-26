import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/api";

function Portfolio() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    apiFetch("/portfolio")
      .then((data) => console.log(data))
      .catch(() => navigate("/login"));
  }, []);

  return <h1>My Portfolio</h1>;
}

export default Portfolio;
