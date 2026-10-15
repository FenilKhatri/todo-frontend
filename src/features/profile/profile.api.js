import api from "../../shared/lib/axios";

export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data.user;
};

export const updateProfile = async (data) => {
  const response = await api.patch("/profile", data);
  return response.data.user;
};

export const requestChange = async (data) => {
  const response = await api.post("/profile/change-requests", data);
  return response.data.challenge;
};

export const resendChangeOtp = async (requestId) => {
  const response = await api.post(`/profile/change-requests/${requestId}/resend`);
  return response.data.challenge;
};

export const verifyChange = async (requestId, otp) => {
  const response = await api.post(`/profile/change-requests/${requestId}/verify`, { otp });
  return response.data;
};

export const uploadAvatar = async (file) => {
  const body = new FormData();
  body.append("avatar", file);
  // Override the JSON default so axios sends multipart with a boundary.
  const response = await api.put("/profile/avatar", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.user;
};

export const removeAvatar = async () => {
  const response = await api.delete("/profile/avatar");
  return response.data.user;
};
