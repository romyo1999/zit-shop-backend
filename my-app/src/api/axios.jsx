import axios from "axios"
export const axiosClient=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    headers: {
        "Content-Type": "multipart/form-data",
        'Accept': 'application/json',
     },
     withCredentials: true
});

