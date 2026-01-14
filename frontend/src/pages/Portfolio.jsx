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

  /* -------------------- LOAD -------------------- */

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

  /* -------------------- LIVE UPDATES -------------------- */

  useEffect(() => {
    const subscription = subscribeToPortfolio((data) => {
      setPortfolio(data.payload.portfolio);
      setSummary(data.payload.summary);
    });

    return () => subscription.unsubscribe();
  }, []);

  /* -------------------- ACTIONS -------------------- */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this holding?")) return;

    try {
      setLoading(true);
      await apiFetch(`/holdings/${id}`, { method: "DELETE" });
      await loadPortfolio();
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
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-semibold text-white mb-3">
              No holdings yet
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
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">My Portfolio</h1>
            <span className="text-sm text-gray-400">
              Live updates enabled
            </span>
          </div>

          {/* Add Holding */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <AddHolding
              onSuccess={loadPortfolio}
              editingHolding={editingHolding}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          {/* Summary */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Portfolio Overview
            </h2>
            <PortfolioSummary summary={summary} />
          </section>

          {/* Holdings */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Holdings
            </h2>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <PortfolioTable
                portfolio={portfolio}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
          </section>

          {/* Insights */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TopMovers data={aggregatedData} />
              <AllocationPie data={aggregatedData} />
            </div>
          </section>

          {/* Performance */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Performance
            </h2>
            <ProfitBar data={aggregatedData} />
          </section>

        </div>
      </div>
    </>
  );
};

export default Portfolio;
