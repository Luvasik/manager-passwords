    import axios from "axios";

    export const authInstance = axios.create({
        baseURL: "http://localhost:3000/api/users",
        withCredentials: true
    });

    export const passwordInstance = axios.create({
        baseURL: "http://localhost:3000/api/passwords",
        withCredentials: true
    });