import { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.scss";
import { loginAPI } from "../services/UserServices";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("email/password is required");
      return;
    } else {
      setIsLoading(true);
      let res = await loginAPI("eve.holt@reqres.in", password);
      if (res && res.token) {
        localStorage.setItem("token", res.token);
        setIsLoading(false);
        toast.success("done");
      }
    }
  };
  return (
    <div className="login-container col-4">
      <div className="title">
        <h2>Login</h2>
      </div>
      <span className="text">Email or Username</span>
      <div className="form-input">
        <input
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          type="text"
          placeholder="Email or username..."
        />
        <input
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type={showPassword === true ? "text" : "password"}
          placeholder="password..."
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="showkey"
        >
          {showPassword ? (
            <i className="fa-regular fa-eye"></i>
          ) : (
            <i className="fa-regular fa-eye-slash "></i>
          )}
        </span>
      </div>
      <button
        onClick={() => handleLogin()}
        className={email && password ? "btn-login active" : "btn-login"}
      >
        {isLoading === true && <i className="fa-solid fa-spinner loading"></i>}
        Login
      </button>
      <div className="back">
        <span onClick={() => navigate("/")}>
          <i class="fa-solid fa-angles-left mx-1"></i>Go back
        </span>
      </div>
    </div>
  );
};
export default Login;
