import { API_URL } from "./api";

export const getTicketTypes = async () => {
  const response = await fetch(`${API_URL}/api/TicketTypes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

export const addTicketType = async (ticketType) => {
  const response = await fetch(`${API_URL}/api/TicketTypes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(ticketType),
  });
  return response.json();
};

export const updateTicketType = async (ticketType) => {
  const response = await fetch(`${API_URL}/api/TicketTypes/${ticketType.ticketTypeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(ticketType),
  });
  return response.json();
};

export const deleteTicketType = async (id) => {
  const response = await fetch(`${API_URL}/api/TicketTypes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};