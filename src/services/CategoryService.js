import { API_URL } from "./api";

export const getCategories = async () => {
  const response = await fetch(`${API_URL}/api/Categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

export const addCategory = async (category) => {
  const response = await fetch(`${API_URL}/api/Categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const updateCategory = async (category) => {
  const response = await fetch(`${API_URL}/api/Categories/${category.Id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const deleteCategory = async (id) => {
  const response = await fetch(`${API_URL}/api/Categories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};