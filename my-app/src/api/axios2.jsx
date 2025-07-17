import axios from "axios"
export const axiosClient2=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
     },
     withCredentials: true
});

