import { API_URL } from "./api";

export const getMyTickets = async () => {
  const response = await fetch(`${API_URL}/api/Tickets/my`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return response.json();
};

export const bookTicket = async (bookingData) => {
  const response = await fetch(`${API_URL}/api/Tickets/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    let errorMessage = "تعذر إتمام الحجز.";

    try {
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        errorMessage = errorData?.message || errorData?.title || errorMessage;
      } else {
        const errorText = await response.text();
        if (errorText) errorMessage = errorText;
      }
    } catch {
    }

    throw new Error(errorMessage);
  }

  const contentType = response.headers.get("content-type");

  if (response.status === 204) {
    return null;
  }

  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
};