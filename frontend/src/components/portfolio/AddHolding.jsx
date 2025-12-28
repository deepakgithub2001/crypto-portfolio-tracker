import { useState } from "react";
import { addHolding } from "../../api/portfolio";

const AddHolding = ({ onSuccess }) => {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!symbol || !quantity || !price) return;

    setLoading(true);

    try {
      await addHolding({
        symbol: symbol.toUpperCase(),
        quantity: Number(quantity),
        price: Number(price),
      });

      // ✅ Clear form
      setSymbol("");
      setQuantity("");
      setPrice("");

      // ✅ Refresh portfolio
      onSuccess();
    } catch (err) {
      console.error("Failed to add holding", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-4 mb-6 flex flex-wrap gap-4 items-end"
    >
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Symbol</label>
        <input
          className="border rounded px-3 py-2 w-32"
          placeholder="BTC"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Quantity</label>
        <input
          type="number"
          step="any"
          className="border rounded px-3 py-2 w-32"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Buy Price</label>
        <input
          type="number"
          step="any"
          className="border rounded px-3 py-2 w-32"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default AddHolding;
