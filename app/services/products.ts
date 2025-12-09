import callApi from "../helpers/callApi";

export async function GetProducts({page=1, per_page=5}) {
    let res=await callApi().get(`/products?page=${page}&per_page=${per_page}`);
    
   
    return res?.data?.data;
}