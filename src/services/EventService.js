import { API_URL } from "./api"

const getAuthHeaders = () => ({
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

  try {
    if (contentType.includes("application/json")) {
      return await response.json()
    }

    return await response.text()
  } catch {
    return null
  }
}

export const getEvents = async () => {
  const response = await fetch(`${API_URL}/api/Event`, {
    method: "GET",
    headers: getAuthHeaders(),
  })

  return parseResponse(response)
}

export const getEventById = async (id) => {
  const response = await fetch(`${API_URL}/api/Event/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  })

  return parseResponse(response)
}

export const addEvent = async (event) => {
  const response = await fetch(`${API_URL}/api/Event`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      name: event.Name,
      startDateTime: event.StartDateTime,
      endDateTime: event.EndDateTime,
      createdAt: new Date().toISOString(),
      venue: event.Venue,
      description: event.Description,
      cardImageUrl: event.CardImageUrl,
      detailsImageUrl1: event.DetailsImageUrl1,
      detailsImageUrl2: event.DetailsImageUrl2,
      cityId: event.CityId,
      categoryId: event.CategoryId,
    }),
  })

  return parseResponse(response)
}

export const updateEvent = async (event) => {
  const response = await fetch(`${API_URL}/api/Event/${event.Id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      id: event.Id,
      name: event.Name,
      startDateTime: event.StartDateTime,
      endDateTime: event.EndDateTime,
      venue: event.Venue,
      description: event.Description,
      cardImageUrl: event.CardImageUrl,
      detailsImageUrl1: event.DetailsImageUrl1,
      detailsImageUrl2: event.DetailsImageUrl2,
      cityId: event.CityId,
      categoryId: event.CategoryId,
    }),
  })

  return parseResponse(response)
}

export const deleteEvent = async (id) => {
  const response = await fetch(`${API_URL}/api/Event/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })

  return parseResponse(response)
}