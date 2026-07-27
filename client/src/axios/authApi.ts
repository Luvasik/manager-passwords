import type { User } from "../types/types";
import { authInstance } from "./instance";

export const check = async () => {
    try {
        const response = await authInstance.get("/token");
        return response.data.isToken;
    } catch(e) {
        console.error(e);
        throw e;
    }
}

export const loginUser = async (user: User) => {
    try {
        const response = await authInstance.post(`/login`, user);
        return response.data.message;
    } catch(e) {
        console.error(e);
        throw e;
    }
}

export const registerUser = async (user: User) => {
    try {
        const response = await authInstance.post("/registration", user);
        return response.data.message;
    } catch(e) {
        console.error(e);
        throw e;
    }
}

export const logoutUser = async () => {
    try {
        const response = await authInstance.get("/logout");
        response.data.message
    } catch(e) {
        console.error(e);
        throw e;
    }
}