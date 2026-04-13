import { API_URL } from "./api";

export const getMyTickets = async () => {
  const response = await fetch(`${API_URL}/api/Tickets/my`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.json();
};

export const bookTicket = async (bookingData) => {
  const response = await fetch(`${API_URL}/api/Tickets/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(bookingData),
  });

  return response.json();
};