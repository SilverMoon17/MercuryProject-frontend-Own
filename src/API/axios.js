import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7100'
});

axiosInstance.interceptors.request.use(
    async config => {
        if (config && config.headers)
            config.headers["Authorization"] = localStorage.getItem("token") || sessionStorage.getItem("token")
                ? `Bearer ${localStorage.getItem("token") ?? sessionStorage.getItem("token")}`
                : undefined

        return config;
    },
    error => {
        Promise.reject(error)
});

export {axiosInstance};