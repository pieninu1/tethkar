import { API_URL } from "./api";

export const getCities = async () => {
  const response = await fetch(`${API_URL}/api/Cities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};