import axios from "axios";

const api = axios.create({
    // In production, "/api" is proxied to the backend by vercel.json so the auth cookie stays first-party.
    baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "/api" : "http://localhost:3000/api"),
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
