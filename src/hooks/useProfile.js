import { useQuery } from "@tanstack/react-query";
import api from "../api/axios.js"

const fetchProfile = async () => {
const res = await api.get("/users/me");
return res.data
}

export const useProfile = () => {
    return useQuery({
        queryKey:["profile"],
        queryFn:fetchProfile,
        retry:false, // auth handled by interceptor
    })
}