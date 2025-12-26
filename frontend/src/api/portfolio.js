import { apiFetch } from "./api";

export const fetchPortfolio = () => {
  return apiFetch("/portfolio");
};
