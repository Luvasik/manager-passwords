import React, { createContext, useContext } from "react";
import type { User } from "../types/types";
import { useAuth } from "../hooks/useAuth";

type AuthContextType = {
    isAuth: boolean;
    loading: boolean;
    error: string;
    checkToken: () => Promise<void>
    login: (user: User) => Promise<void>
    registration: (user: User) => Promise<void>
    logout: () => Promise<void>
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth = useAuth();
    
    return (
        <AuthContext.Provider value={{ ...auth }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuthContext = () => {
    const context = useContext(AuthContext);
    
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    
    return context;
};