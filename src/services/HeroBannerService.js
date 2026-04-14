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

  if (contentType.includes("application/json")) {
    return await response.json()
  }

  return await response.text()
}

export const getHeroBanners = async () => {
  const response = await fetch(`${API_URL}/api/HeroBanner`, {
    method: "GET",
    headers: getAuthHeaders(),
  })

  return parseResponse(response)
}

export const addHeroBanner = async (banner) => {
  const response = await fetch(`${API_URL}/api/HeroBanner`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      title: banner.Title,
      subtitle: banner.Subtitle,
      imageUrl: banner.ImageUrl,
      buttonText: banner.ButtonText,
      buttonLink: banner.ButtonLink,
      displayOrder: Number(banner.DisplayOrder),
      isActive: banner.IsActive,
    }),
  })

  return parseResponse(response)
}

export const updateHeroBanner = async (banner) => {
  const response = await fetch(`${API_URL}/api/HeroBanner/${banner.Id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      id: banner.Id,
      title: banner.Title,
      subtitle: banner.Subtitle,
      imageUrl: banner.ImageUrl,
      buttonText: banner.ButtonText,
      buttonLink: banner.ButtonLink,
      displayOrder: Number(banner.DisplayOrder),
      isActive: banner.IsActive,
    }),
  })

  return parseResponse(response)
}

export const deleteHeroBanner = async (id) => {
  const response = await fetch(`${API_URL}/api/HeroBanner/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })

  return parseResponse(response)
}