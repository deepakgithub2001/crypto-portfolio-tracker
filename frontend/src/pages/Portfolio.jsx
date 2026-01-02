import { useEffect, useState } from "react";
import { fetchPortfolio } from "../api/portfolio";
import { apiFetch } from "../api/api";
import PortfolioSummary from "../components/portfolio/PortfolioSummary";
import PortfolioTable from "../components/portfolio/PortfolioTable";
import Navbar from "../components/Navbar";
import AddHolding from "../components/portfolio/AddHolding";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingHolding, setEditingHolding] = useState(null);

  const loadPortfolio = () => {
    setLoading(true);
    fetchPortfolio()
      .then((response) => {
        setPortfolio(response.portfolio.portfolio);
        setSummary(response.portfolio.summary);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  // ✅ SINGLE source of truth
  useEffect(() => {
    loadPortfolio();
  }, []);

  const handleDelete = async (id) => {
  if (!window.confirm("Delete this holding?")) return;

  try {
    await apiFetch(`/holdings/${id}`, {
      method: "DELETE",
    });

    // reload portfolio after delete
    loadPortfolio();
  } catch (error) {
    console.error(error);
    alert("Failed to delete holding");
  }
};

const handleEdit = (holding) => {
  setEditingHolding(holding);
};

const handleCancelEdit = () => {
  setEditingHolding(null);
};

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!summary) return <p className="text-center mt-10">No data</p>;

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">My Portfolio</h1>

        {/* STEP 5: Add Holding */}
        <AddHolding onSuccess={loadPortfolio} editingHolding={editingHolding} onCancelEdit={handleCancelEdit} />

        <PortfolioSummary summary={summary} />
        <PortfolioTable portfolio={portfolio} onDelete={handleDelete} onEdit={handleEdit}  />
      </div>
    </>
  );
};

export default Portfolio;
