import axios from "axios";


// Cro una istanza di tipo Axios
export const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

apiClient.interceptors.request.use()
apiClient.interceptors.response.use()