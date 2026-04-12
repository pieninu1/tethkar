import { API_URL } from "./api";

export const login = async (data) => {
  const response = await fetch(`${API_URL}/api/Auth/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "فشل تسجيل الدخول");
  }

  return result;
};

export const register = async (data) => {
  const response = await fetch(`${API_URL}/api/Auth/Register`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    email: data.email,
    password: data.password
  })
})

  return response.json();;
};

export const forgotPassword = async (data) => {
  const response = await fetch(`${API_URL}/api/Auth/ForgotPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "فشل إرسال طلب استعادة كلمة المرور");
  }

  return result;
};