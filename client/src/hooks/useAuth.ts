import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, logoutUser, check } from "../axios/authApi";
import { toast } from "d9-toast";
import type { User } from "../types/types";

export const useAuth = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = async (user: User) => {
        try {
            setLoading(true);
            setError("");

            const message = await loginUser(user);

            toast.success(message, {
                className: "success",
                duration: 3000
            });

            setIsAuth(true);
            navigate("/");
        } catch (e) {
            setError("Ошибка при попытке войти в акканут");
            console.error("Ошибка в логине", e);
            toast.error("Ошибка при попытке войти в аккаунт", {
                className: "error",
                autoClose: true,
                duration: 3000
            })
        } finally {
            setLoading(false);
        }
    }

    const registration = async (user: User) => {
        try {
            setLoading(true);
            setError("");
            const message = await registerUser(user);

            toast.success(message, {
                className: "success",
                duration: 3000
            });
            navigate("/login");
        } catch (e) {
            console.error(e);
            setError("Ошибка при регистрации");
            toast.error("", {
                className: "error",
                autoClose: true,
                duration: 3000
            })
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            logoutUser();
        } catch (e) {

        }
    }

    const checkToken = async () => {
        try {
            const isToken = await check(); 
            setIsAuth(isToken)
        } catch (e) {
            console.log('Error checking token:', e);
            setIsAuth(false)
        } finally {
            setLoading(false);
        }
    }

    return {
        isAuth,
        error,
        loading,
        checkToken,
        login,
        registration,
        logout
    }
}