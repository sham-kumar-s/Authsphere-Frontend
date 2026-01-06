import axios from "axios";

let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
}

const api = axios.create({
    baseURL : "http://localhost:3000/api",
    withCredentials:true,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
})

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (response) => response,
    async(err) => {
        const originalRequest = err.config;

        // DO NOT refresh for auth routes
        if(
            err.response?.status === 401 && 
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/")
        ) {
            originalRequest._retry = true;

            try{
                // call refresh API (cookie sent automatically)
                const res = await api.post("/auth/refresh")

                const newAccessToken = res.data.accessToken;
                
                // update Authorization Header
                originalRequest.headers.Authorization = 
                `Bearer ${newAccessToken}`;

                return api(originalRequest);
            }catch(err){
                //Refresh failed -> Logout
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(err);
    }
)

export default api;