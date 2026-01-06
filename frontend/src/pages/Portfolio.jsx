import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { fetchPortfolio } from "../api/portfolio";
import { apiFetch } from "../api/api";

import PortfolioSummary from "../components/portfolio/PortfolioSummary";
import PortfolioTable from "../components/portfolio/PortfolioTable";
import AddHolding from "../components/portfolio/AddHolding";
import Loader from "../components/portfolio/Loader";

import { aggregateByCoin } from "../utils/aggregatePortfolio";
import AllocationPie from "../components/portfolio/AllocationPie";
import ProfitBar from "../components/portfolio/ProfitBar";
import TopMovers from "../components/portfolio/TopMovers";

import { subscribeToPortfolio } from "../cable/portfolioChannel";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingHolding, setEditingHolding] = useState(null);

  /* -------------------- INITIAL LOAD -------------------- */

  const loadPortfolio = async () => {
    try {
      setLoading(true);
      const response = await fetchPortfolio();
      setPortfolio(response.portfolio.portfolio);
      setSummary(response.portfolio.summary);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  /* -------------------- WEBSOCKET (LIVE UPDATES) -------------------- */

  useEffect(() => {
    const subscription = subscribeToPortfolio();

    const handler = (event) => {
      setPortfolio(event.detail.portfolio);
      setSummary(event.detail.summary);
    };

    window.addEventListener("portfolio:update", handler);

    return () => {
      window.removeEventListener("portfolio:update", handler);
      subscription.unsubscribe();
    };
  }, []);

  /* -------------------- ACTIONS -------------------- */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this holding?")) return;

    try {
      setLoading(true);
      await apiFetch(`/holdings/${id}`, { method: "DELETE" });
      await loadPortfolio(); // temporary, ok for now
    } catch (error) {
      console.error(error);
      alert("Failed to delete holding");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (holding) => {
    setEditingHolding(holding);
  };

  const handleCancelEdit = () => {
    setEditingHolding(null);
  };

  /* -------------------- STATES -------------------- */

  if (loading) {
    return <Loader text="Loading Portfolio..." />;
  }

  if (portfolio.length === 0) {
    return (
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto text-center mt-24 text-gray-600">
          <h2 className="text-2xl font-semibold mb-2">
            No holdings yet 📭
          </h2>
          <p>Add your first crypto to start tracking your portfolio.</p>
          <div className="mt-6">
            <AddHolding onSuccess={loadPortfolio} />
          </div>
        </div>
      </>
    );
  }

  const aggregatedData = aggregateByCoin(portfolio);

  /* -------------------- UI -------------------- */

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">My Portfolio</h1>

        <AddHolding
          onSuccess={loadPortfolio}
          editingHolding={editingHolding}
          onCancelEdit={handleCancelEdit}
        />

        <PortfolioSummary summary={summary} />

        <PortfolioTable
          portfolio={portfolio}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        <TopMovers data={aggregatedData} />
        <AllocationPie data={aggregatedData} />
        <ProfitBar data={aggregatedData} />
      </div>
    </>
  );
};

export default Portfolio;
