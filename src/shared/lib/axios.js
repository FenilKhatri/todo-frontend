import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getErrorMessage = (error, fallback = "Something went wrong") => {
    const data = error?.response?.data;
    if (data?.errors?.length) return data.errors[0].message;
    return data?.message || error?.message || fallback;
};

export default api;
