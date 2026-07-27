import { useState } from "react";
import { type Password } from "../types/types";
import { createPassword, deletePasswordApi, getPasswords, updatePassword } from "../axios/passwordApi";

export const usePasswordActions = () => {
    const [passwords, setPasswords] = useState<Password[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const loadPasswords = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await getPasswords();
            setPasswords(data || []);
        } catch(e) {
            setError("Ошибка получения паролей")
        } finally {
            setLoading(false);
        }
    }

    const addPassword = async (data: Omit<Password, "id">) => {
        try {
            setLoading(true);
            setError("");

            const createdPassword = await createPassword(data);
            setPasswords(prev => [createdPassword, ...prev]);
        } catch(e) {
            console.error(e);
            setError("Ошибка при попытке добавить пароль");
        } finally {
            setLoading(false);
        }
    }

    const editPassword = async (data: Password) => {
        try {
            setLoading(true);
            setError("");
            const {id, ...passwordData} = data;
           
            const editedPassword = await updatePassword(id, passwordData);
            
            setPasswords(prev => 
                prev.map(p => p.id === id ? editedPassword : p));
        } catch(e) {
            console.error("Ошибка редактирования", e)
            setError("Ошибка при редактировании")
        } finally {
            setLoading(false)
        }
    }

    const deletePassword = async (id: number) => {
        try {
            setLoading(true);
            setError("");
            await deletePasswordApi(id);
            setPasswords(prev => prev.filter(p => p.id !== id));
        } catch(e) {
            setError("Ошибка при попытке удаления");
            console.error("Ошибка при удалении", e);
        } finally {
            setLoading(false);
        }
    }

    return {
        passwords,
        loading,
        error,
        loadPasswords,
        addPassword,
        deletePassword,
        editPassword
    }
}