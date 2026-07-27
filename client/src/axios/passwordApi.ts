import { passwordInstance } from "./instance";
import type { Password } from "../types/types";

export const getPasswords = async (): Promise<Password[]> => {
    try {
        const response = await passwordInstance.get<{ passwords: Password[] }>("/");
        return response.data.passwords || [];
    } catch(e) {
        console.error(e);
        throw e;
    }
}

export const createPassword = async (data: Omit<Password, "id">): Promise<Password> => {
    try {
        const response = await passwordInstance.post<{ newPassword: Password }>("/", data);
        return response.data.newPassword;
    } catch(e) {
        console.error(e);
        throw e
    }
}

export const updatePassword = async (id: number, data: Omit<Password, "id">) => {
    try {
        const response = await passwordInstance.put<{ updatedPassword: Password }>(`/${id}`, data);
        return response.data.updatedPassword;
    } catch(e) {
        console.error(e);
        throw e;
    }
}

export const deletePasswordApi = async (id: number): Promise<void> => {
    try {
        await passwordInstance.delete(`/${id}`);
    } catch(e) {
        console.error(e);
        throw e;
    }
}