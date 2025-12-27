import { useEffect, useState } from "react";
import { fetchPortfolio } from "../api/portfolio";
import PortfolioSummary from "../components/portfolio/PortfolioSummary";
import PortfolioTable from "../components/portfolio/PortfolioTable";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio()
      .then((response) => {
        setPortfolio(response.portfolio.portfolio);
        setSummary(response.portfolio.summary);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!summary) return <p className="text-center mt-10">No data</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">My Portfolio</h1>

      <PortfolioSummary summary={summary} />
      <PortfolioTable portfolio={portfolio} />
    </div>
  );
};

export default Portfolio;
