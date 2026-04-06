import { API_URL } from "./api";

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/api/Users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

export const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/api/Users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

export const addUser = async (user) => {
  const response = await fetch(`${API_URL}/api/Users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const updateUser = async (user) => {
  const response = await fetch(`${API_URL}/api/Users/${user.userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/api/Users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};