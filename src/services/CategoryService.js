import { API_URL } from "./api";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;

    try {
      if (contentType.includes("application/json")) {
        const errorData = await response.json();
        errorMessage =
          errorData?.message ||
          errorData?.title ||
          JSON.stringify(errorData) ||
          errorMessage;
      } else {
        const errorText = await response.text();
        if (errorText) errorMessage = errorText;
      }
    } catch {
      // keep fallback message
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  try {
    if (contentType.includes("application/json")) {
      return await response.json();
    }

    return await response.text();
  } catch {
    return null;
  }
};

export const getCategories = async () => {
  const response = await fetch(`${API_URL}/api/Categories`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return parseResponse(response);
};

export const addCategory = async (category) => {
  const response = await fetch(`${API_URL}/api/Categories`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      name: category.Name,
      imageUrl: category.ImageUrl,
    }),
  });

  return parseResponse(response);
};

export const updateCategory = async (category) => {
  const response = await fetch(`${API_URL}/api/Categories/${category.Id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      id: category.Id,
      name: category.Name,
      imageUrl: category.ImageUrl,
    }),
  });

  return parseResponse(response);
};

export const deleteCategory = async (id) => {
  const response = await fetch(`${API_URL}/api/Categories/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return parseResponse(response);
};