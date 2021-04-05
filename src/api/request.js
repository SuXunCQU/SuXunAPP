import axios from "axios";
import Toast from "../utils/Toast";
import Store from "../redux/store"

const BASE_URI = "http://38621w81b8.wicp.vip"

const instance = axios.create({
    baseURL: BASE_URI,
});

const {state} = Store.getState();

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    Toast.showLoading("请求中");
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    Toast.hideLoading();
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default {
    get: instance.get,
    post: instance.post,
    put: instance.put,
    patch:instance.patch,
    delete:instance.delete,
    privateGet: (url, data = {}, options = {}) => {
        const token = state.token;
        const headers = options.headers || {};
        return instance.get(url, {
            ...options,
            params: data,
            headers: {
                "Authorization": `Bearer ${token}`,
                ...headers,
            },
        });
    },
    // post 自动带上token
    privatePost: (url, data = {}, options = {}) => {
        console.log(state);
        const token = state.token;
        const headers = options.headers || {};
        return instance.post(url, data, {
            ...options,
            headers: {
                "Authorization": `Bearer ${token}`,
                ...headers,
            },
        });
    },
};
