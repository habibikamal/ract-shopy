// اصلاح شده callApi.ts
import axios from "axios";
import ValidationErrors from "../exceptions/validationErroe";

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
        error => {
            const res=error?.response;
            if(res){
                if(res.status===422){
                    throw new ValidationErrors(res.data.errors)
                }
            }
            Promise.reject(error)
        }
    );

    // این خط اضافه شد - باید axiosInstance را برگرداند
    return axiosInstance;
};

export default callApi;