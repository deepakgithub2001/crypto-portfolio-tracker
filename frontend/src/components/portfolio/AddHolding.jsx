import { useState, useEffect } from "react";
import { apiFetch } from "../../api/api";

const AddHolding = ({ onSuccess, editingHolding, onCancelEdit }) => {
  const [coin, setCoin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingHolding) {
      setCoin(editingHolding.coin);
      setQuantity(editingHolding.quantity);
      setBuyPrice(editingHolding.buy_price);
    } else {
      setCoin("");
      setQuantity("");
      setBuyPrice("");
    }
  }, [editingHolding]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingHolding) {
        await apiFetch(`/holdings/${editingHolding.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            holding: {
              quantity: Number(quantity),
              buy_price: Number(buyPrice),
            },
          }),
        });
      } else {
        await apiFetch("/holdings", {
          method: "POST",
          body: JSON.stringify({
            holding: {
              coin_id: coin,
              quantity: Number(quantity),
              buy_price: Number(buyPrice),
            },
          }),
        });
      }

      onSuccess();
      onCancelEdit();
    } catch (err) {
      console.error(err);
      alert("Failed to save holding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm flex flex-wrap gap-4 items-end"
    >
      {/* Header */}
      <div className="w-full mb-2">
        <h3 className="text-lg font-semibold text-gray-900">
          {editingHolding ? "✏️ Edit Holding" : "➕ Add New Holding"}
        </h3>
      </div>

      {/* Coin */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Coin</label>
        <input
          className="bg-white border border-gray-300 px-3 py-2 rounded w-32
                     text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500
                     disabled:bg-gray-100 disabled:text-gray-500"
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
          disabled={!!editingHolding}
          required
        />
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Quantity</label>
        <input
          type="number"
          className="bg-white border border-gray-300 px-3 py-2 rounded w-32
                     text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>

      {/* Buy Price */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Buy Price</label>
        <input
          type="number"
          className="bg-white border border-gray-300 px-3 py-2 rounded w-32
                     text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          required
        />
      </div>

      {/* Submit */}
      <button
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded
                   transition disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : editingHolding
          ? "Update Holding"
          : "Add Holding"}
      </button>

      {/* Cancel */}
      {editingHolding && (
        <button
          type="button"
          onClick={onCancelEdit}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded transition"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default AddHolding;
