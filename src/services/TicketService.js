import { API_URL } from "./api";

export const getTickets = async () => {
  const response = await fetch(`${API_URL}/api/Tickets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

export const addTicket = async (ticket) => {
  const response = await fetch(`${API_URL}/api/Tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(ticket),
  });
  return response.json();
};

export const updateTicket = async (ticket) => {
  const response = await fetch(`${API_URL}/api/Tickets/${ticket.ticketId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(ticket),
  });
  return response.json();
};

export const deleteTicket = async (id) => {
  const response = await fetch(`${API_URL}/api/Tickets/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};