export interface Password {
    id: number
    site: string;
    login: string;
    password: string;
}

export interface User {
    email: string;
    password: string
}