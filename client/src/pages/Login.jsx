import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const formData = {
    username,password
  }

  const api = "http://localhost:3001";

  useEffect(() => {}, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(api + "/login", formData);
      const token = response.data.token
      alert("login successs");
      navigate("/account");
      window.location.reload()
      localStorage.setItem('token',JSON.stringify(token))
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="w-full h-screen py-10">
      <div className="flex justify-center items-center">
        <form
          className="text-center border rounded-lg w-[500px] h-[400px] p-9"
          onSubmit={handleLogin}
        >
          <h1 className="text-4xl">Sign In</h1>
          <br />
          <br />
          <label>UserName</label>
          <br />
          <input
            type="text"
            className="border w-[400px] h-[40px] border-slate-500 rounded-xl  px-3 sm:
            w-[350px]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            className="border w-[400px] h-[40px] border-slate-500 rounded-xl  px-3 sm:
            w-[350px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <button className="w-[200px] h-[50px] border-slate-500 border rounded-md ">
            Sign In
          </button>

          <p id="msg" className="text-red-700"></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
