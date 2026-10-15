import api from "../../shared/lib/axios";

export const signup = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// Forgot password: email -> OTP -> new password.
export const requestPasswordReset = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data.challenge;
};

export const resendPasswordResetOtp = async (requestId) => {
  const response = await api.post(`/auth/forgot-password/${requestId}/resend`);
  return response.data.challenge;
};

export const verifyPasswordResetOtp = async (requestId, otp) => {
  const response = await api.post(`/auth/forgot-password/${requestId}/verify`, { otp });
  return response.data;
};

export const resetPassword = async (requestId, data) => {
  const response = await api.post(`/auth/forgot-password/${requestId}/reset`, data);
  return response.data;
};
