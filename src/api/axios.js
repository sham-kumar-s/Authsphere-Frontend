import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000/api",
    withCredentials:true,
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (response) => response,
    async(err) => {
        const originalRequest = err.config;

        // If access token expired
        if(
            err.response?.status === 401 && 
            !originalRequest._retry
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