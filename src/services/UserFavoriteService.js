import { API_URL } from "./api"

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
})

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") || ""

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`

    try {
      if (contentType.includes("application/json")) {
        const errorData = await response.json()
        errorMessage =
          errorData?.message ||
          errorData?.title ||
          JSON.stringify(errorData) ||
          errorMessage
      } else {
        const errorText = await response.text()
        if (errorText) errorMessage = errorText
      }
    } catch {
      // keep fallback
    }

    throw new Error(errorMessage)
  }

  if (response.status === 204) return null

  if (contentType.includes("application/json")) {
    return await response.json()
  }

  return await response.text()
}

export const toggleFavorite = async (eventId) => {
  const response = await fetch(`${API_URL}/api/UserFavorite/${eventId}`, {
    method: "POST",
    headers: getHeaders(),
  })

  return parseResponse(response)
}

export const getUserFavorites = async () => {
  const response = await fetch(`${API_URL}/api/UserFavorite`, {
    method: "GET",
    headers: getHeaders(),
  })

  return parseResponse(response)
}

export const getUserFavoriteIds = async () => {
  const favorites = await getUserFavorites()
  return favorites.map((event) => event.id)
}