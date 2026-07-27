import React, { createContext, useContext } from "react";
import type { Password } from "../types/types";
import { usePasswordActions } from "../hooks/usePasswordActions";
import { usePasswordModal } from "../hooks/usePasswordModal";
import { toast } from "d9-toast";

type PasswordContextType = {
    passwords: Password[];
    editingPassword: Password | null;

    loading: boolean;
    error: string;
    loadPasswords: () => Promise<void>
    addPassword: (data: Omit<Password, "id">) => Promise<void>
    editPassword: (data: Password) => Promise<void>;
    deletePassword: (id: number) => Promise<void>;

    isOpen: boolean;
    openEdit: (id: number) => void;
    openAdd: () => void;
    onClose: () => void
} | undefined

const PasswordContext = createContext<PasswordContextType>(undefined);

export const PasswordContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const actions = usePasswordActions();
    const modal = usePasswordModal(actions.passwords);

    const addPassword = async (data: Omit<Password, "id">) => {
        try {
            await actions.addPassword(data);
            modal.onClose();
            toast.success("Пароль успешно добавлен", {
                className: "success"
            })
        } catch(e) {
            toast.error("Ошибка при добавлении пароля", {
                className: "error"
            })
        }
    }

    const deletePassword = async (id: number) => {
        try {
            await actions.deletePassword(id);
            toast.success("", {
                className: "success"
            })
        } catch(e) {
            toast.error("Ошибка при обновлении пароля", {
                className: "error"
            })
        }
    }

    const editPassword = async (data: Password) => {
        try {
            await actions.editPassword(data);
            toast.success("Пароль успешно обновлен", {
                className: "success"
            });
            modal.onClose();
        } catch(e) {
            toast.error("", {
                className: "error"
            })
        }
    }

    return (
        <PasswordContext.Provider 
            value={{ 
                ...actions,
                addPassword,
                deletePassword,
                editPassword,
                ...modal
            }}
        >
            {children}
        </PasswordContext.Provider>
    )
}

export const usePasswordContext = () => {
    const context = useContext(PasswordContext);
    if (!context) throw new Error("Ошибка в password контексте");
    return context;
}