import axios, { type InternalAxiosRequestConfig } from "axios";


export const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const method = config.method?.toUpperCase ?? 'GET'

        const token = 'lkdhgladhghdghv'
        config.headers['Authorization'] = token

        return config
    },

    (error) => {
        return Promise.reject(error);
    }
)