import axios from "axios";
const axiosAPI = axios.create({
    baseURL : "http://localhost:3000/api/"
  });

  const apiRequest = async (method: string, url: string, request: any, auth = false) => {
    const headers = {
        authorization: auth ? localStorage.getItem('jwt') : ""
    };
    //using the axios instance to perform the request that received from each http method
    try {
      const res = await axiosAPI({
        method,
        url,
        data: request,
        headers
      });
      return await Promise.resolve({status: res.status, data: res.data});
    } catch (err: any) {
      return await Promise.reject(err);
    }
};

// function to execute the http get request
const get = (url: string, request: any) => apiRequest("get",url,request);

// function to execute the http delete request
const deleteRequest = (url: string, request: any) =>  apiRequest("delete", url, request);

// function to execute the http post request
const post = (url: string, request: any) => apiRequest("post", url, request);

// function to execute the http put request
const put = (url: string, request: any) => apiRequest("put", url, request);

// function to execute the http path request
const patch = (url: string, request: any) =>  apiRequest("patch", url, request);

// expose your method to other services or actions
const API = {
    get,
    delete: deleteRequest,
    post,
    put,
    patch
};
export default API;