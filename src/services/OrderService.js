import { API_URL } from "./api";

export const getOrders = async () => {
  const response = await fetch(`${API_URL}/api/Orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

export const addOrder = async (order) => {
  const response = await fetch(`${API_URL}/api/Orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(order),
  });
  return response.json();
};

export const updateOrder = async (order) => {
  const response = await fetch(`${API_URL}/api/Orders/${order.orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(order),
  });
  return response.json();
};

export const deleteOrder = async (id) => {
  const response = await fetch(`${API_URL}/api/Orders/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};