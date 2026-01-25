const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("API error");
  }

  return response.json();
};
