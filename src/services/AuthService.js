import { API_URL } from "./api"

export const login = async (data) => {
  const response = await fetch(`${API_URL}/api/Auth/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "فشل تسجيل الدخول")
  }

  return result
}

export const register = async (data) => {
  const response = await fetch(`${API_URL}/api/Auth/Register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
    }),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "فشل إنشاء الحساب")
  }

  return result
}

export const forgotPassword = async (data) => {
  const response = await fetch(`${API_URL}/api/Auth/ForgotPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "فشل إرسال طلب استعادة كلمة المرور")
  }

  return result
}

export const getProfile = async () => {
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("لا يوجد مستخدم مسجل دخول حالياً")
  }

  const response = await fetch(`${API_URL}/api/Auth/Profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  const contentType = response.headers.get("content-type")
  let result

  if (contentType && contentType.includes("application/json")) {
    result = await response.json()
  } else {
    result = await response.text()
  }

  if (!response.ok) {
    throw new Error(
      typeof result === "string" ? result : result.message || "فشل جلب بيانات المستخدم"
    )
  }

  return result
}