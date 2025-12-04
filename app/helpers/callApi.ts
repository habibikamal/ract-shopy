// اصلاح شده callApi.ts
import axios from "axios";

const callApi = () => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:5000/api",
        
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            // می‌توانید توکن یا هدرهای لازم را اینجا اضافه کنید
            return config;
        },
        error => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        res => {
            return res;
        },
        error => Promise.reject(error)
    );

    // این خط اضافه شد - باید axiosInstance را برگرداند
    return axiosInstance;
};

export default callApi;