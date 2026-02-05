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

  const loadPortfolio = async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);
      const response = await fetchPortfolio();
      setPortfolio(response?.portfolio?.portfolio || []);
      setSummary(response?.portfolio?.summary || null);
    } catch (error) {
      console.error(error);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
  loadPortfolio(true);
  }, []);


  /* -------------------- POLLING (every 30s) -------------------- */

  useEffect(() => {
    const interval = setInterval(() => {
      loadPortfolio();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  /* -------------------- LIVE UPDATES (ActionCable) -------------------- */

  useEffect(() => {
    const subscription = subscribeToPortfolio((data) => {
      if (!data?.payload) return;

      setPortfolio(data.payload.portfolio || []);
      setSummary(data.payload.summary || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  /* -------------------- ACTIONS -------------------- */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this holding?")) return;

    try {
      setLoading(true);
      await apiFetch(`/holdings/${id}`, { method: "DELETE" });
      await loadPortfolio(true);
    } catch {
      alert("Failed to delete holding");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (holding) => setEditingHolding(holding);
  const handleCancelEdit = () => setEditingHolding(null);

  /* -------------------- STATES -------------------- */

  if (loading) {
    return <Loader text="Loading Portfolio..." />;
  }

  if (portfolio.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
          <div className="max-w-md text-center bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-3 text-white">
              No holdings yet 📭
            </h2>
            <p className="text-gray-400 mb-6">
              Add your first crypto to start tracking your portfolio.
            </p>
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

      <div className="min-h-screen bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">My Portfolio</h1>
            <span className="text-sm text-gray-400">
              Live market updates enabled ⚡
            </span>
          </div>

          <div className="mb-6">
            <AddHolding
              onSuccess={loadPortfolio}
              editingHolding={editingHolding}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          <div className="grid gap-6">
            <PortfolioSummary summary={summary} />
            <PortfolioTable
              portfolio={portfolio}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <TopMovers data={aggregatedData} />
            <AllocationPie data={aggregatedData} />
          </div>

          <div className="mt-8">
            <ProfitBar data={aggregatedData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
