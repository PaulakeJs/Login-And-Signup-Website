import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers();
  }, []);

  const api = "http://localhost:3001";

  async function fetchUsers() {
    const data = await axios.get(api + "/register");
    console.log(data.data);
  }
  const formData = {
    email,
    username,
    password,
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const regfunc = await axios.post(api + "/register", formData);
      document.getElementById("msg").innerText = "User Created Successfully"
      navigate("/login")
    
    } catch (error) {
      document.getElementById("msg").innerText = error;
    }
  };

  return (
    <div className="w-full h-screen py-10">
      <div className="flex justify-center items-center">
        <form
          className="text-center border rounded-lg w-[500px] h-[400px] p-9"
          onSubmit={handleRegister}
        >
          <h1 className="text-4xl">Signup</h1>
          <br />
          <label>Email</label>
          <br />
          <input
            type="email"
            className="border border-slate-500 w-[400px] h-[40px] rounded-xl px-3 sm:
            w-[350px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
            Signup
          </button>

          <p id="msg" className="text-red-700"></p>
        </form>

      </div>
    </div>
  );
}

export default SignUp;
