import { apiFetch } from "./api";

export const fetchPortfolio = () => {
  return apiFetch("/portfolio");
};

export const addHolding = (data) => {
  return apiFetch("/holdings", {
    method: "POST",
    body: JSON.stringify({
      holding: data,
    }),
  });
};