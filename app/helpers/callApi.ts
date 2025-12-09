// اصلاح شده callApi.ts
import axios from "axios";
import ValidationErrors from "../exceptions/validationErroe";

const callApi = () => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:5000/api",
       
        
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            config.withCredentials = true;  // ← ← خیلی مهم
            return config;
        },
        error => { throw error; }
    );

    axiosInstance.interceptors.response.use(
        res => {
            console.log('API RESPONSE:*******************************', res);
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
