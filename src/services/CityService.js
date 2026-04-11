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
      // keep fallback
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) return null;

  try {
    if (contentType.includes("application/json")) {
      return await response.json();
    }

    return await response.text();
  } catch {
    return null;
  }
};

export const getCities = async () => {
  const response = await fetch(`${API_URL}/api/Cities`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return parseResponse(response);
};

export const addCity = async (city) => {
  const response = await fetch(`${API_URL}/api/Cities`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(city),
  });

  return parseResponse(response);
};

export const updateCity = async (city) => {
  const response = await fetch(`${API_URL}/api/Cities/${city.Id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(city),
  });

  return parseResponse(response);
};

export const deleteCity = async (id) => {
  const response = await fetch(`${API_URL}/api/Cities/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return parseResponse(response);
};