import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
// В консоли браузера
console.log(import.meta.env);

export const authInstance = axios.create({
    baseURL: `${API_URL}/api/users`,
    withCredentials: true
});

export const passwordInstance = axios.create({
    baseURL: `${API_URL}/api/passwords`,
    withCredentials: true
});