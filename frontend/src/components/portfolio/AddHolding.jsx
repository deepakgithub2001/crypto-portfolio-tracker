import { useState } from "react";
import { apiFetch } from "../../api/api";

const AddHolding = ({ onSuccess }) => {
  const [coin, setCoin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await apiFetch("/holdings", {
        method: "POST",
        body: JSON.stringify({
          holding: {
          coin_id: coin,
          quantity: Number(quantity),
          buy_price: Number(buyPrice),
        }
        }),
      });

      // reset form
      setCoin("");
      setQuantity("");
      setBuyPrice("");

      // tell parent to reload portfolio
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to add holding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-6 flex gap-4 items-end"
    >
      <div>
        <label className="block text-sm mb-1">Coin</label>
        <input
          className="border px-3 py-2 rounded w-32"
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Quantity</label>
        <input
          type="number"
          className="border px-3 py-2 rounded w-32"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Buy Price</label>
        <input
          type="number"
          className="border px-3 py-2 rounded w-32"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          required
        />
      </div>

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default AddHolding;
