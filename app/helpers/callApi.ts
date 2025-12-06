// اصلاح شده callApi.ts
import axios from "axios";
import ValidationErrors from "../exceptions/validationErroe";

const callApi = () => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:5000/api",
        withCredentials: true,   // ← ← خیلی مهم
        
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            return config;
        },
        error => { throw error; }
    );

    axiosInstance.interceptors.response.use(
        res => {
            return res;
        },
        error => {
            const res = error?.response;

            if (res) {
                if (res.status === 422) {
                    throw new ValidationErrors(res.data.errors);
                }
            }

            throw error;
        }
    );

    return axiosInstance;
};

export default callApi;
