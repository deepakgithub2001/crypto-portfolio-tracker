const BASE_URL = "http://localhost:3000/api/v1";

export const apiFetch = async (path, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw error;
  }

  return response.json();
};
