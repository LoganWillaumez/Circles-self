import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: true,
  headers: { "content-type": "application/json", }
});

const apiRequest = async (
  method: string,
  url: string,
  request: any,
  cookies?: any
) => {
  const accessToken = cookies?.get('accessToken') || '';
  const refreshToken = cookies?.get('refreshToken') || '';

  const headers: any = {};
  
  if (accessToken && refreshToken) {
    headers.authorization = `${accessToken}`;
  } else if (refreshToken) {
    headers.authorization = `${refreshToken}`;
  }
  
    if (accessToken || refreshToken) {
      headers.cookie = '';
      
      if (accessToken) {
        headers.cookie += `accessToken=${accessToken}; `;
      }
      
      if (refreshToken) {
        headers.cookie += `refreshToken=${refreshToken};`;
      }
    }

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
const get = (url: string, request?: any, cookies?: any) => apiRequest('get', url, request, cookies);

// function to execute the http delete request
const deleteRequest = (url: string, request?: any,  cookies?: any) =>
  apiRequest('delete', url, request, cookies);

// function to execute the http post request
const post = (url: string, request: any,  cookies?: any) => apiRequest('post', url, request, cookies);

// function to execute the http put request
const put = (url: string, request: any,  cookies?: any) => apiRequest('put', url, request, cookies);

// function to execute the http path requesta
const patch = (url: string, request: any,  cookies?: any) => apiRequest('patch', url, request, cookies);

// expose your method to other services or actions
const API = {
  get,
  delete: deleteRequest,
  post,
  put,
  patch
};

export default API;