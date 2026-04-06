import { API_URL } from "./api";

export const getEvents = async () => {
  const response = await fetch(`${API_URL}/api/Events`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

export const addEvent = async (event) => {
  const response = await fetch(`${API_URL}/api/Events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(event),
  });
  return response.json();
};

export const updateEvent = async (event) => {
  const response = await fetch(`${API_URL}/api/Events/${event.eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(event),
  });
  return response.json();
};

export const deleteEvent = async (id) => {
  const response = await fetch(`${API_URL}/api/Events/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};