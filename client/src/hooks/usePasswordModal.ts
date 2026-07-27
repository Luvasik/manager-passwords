import { useState } from "react";
import { type Password } from "../types/types";

export const usePasswordModal = (passwords: Password[]) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editingPassword, setEditingPassword] = useState<Password | null>(null);

    const openAdd = () => {
        setEditingPassword(null);
        setIsOpen(true)
    }
    
    const openEdit = (id: number) => {
        setIsOpen(true);
        const data = passwords.find(password => password.id === id);
        if (data) {
            setEditingPassword(data);
        }
    }

    const onClose = () => setIsOpen(false);

    return {
        isOpen,
        editingPassword,
        openAdd,
        openEdit,
        onClose
    }
}