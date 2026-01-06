import { useContext, useState } from "react";
import api from "../api/axios.js";
import { AuthContext } from "../auth/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setAccessToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setAccessToken(res.data.accessToken);

      navigate("/dashboard");
    } catch (err) {
      if(err.response?.status === 401){
        alert("Invalid Credentials")
      }else{
        alert("Something Went Wromg")
      }
    }
  };

  return (
    <>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </>
  );
};

export default Login;
