import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const loggedin = !!localStorage.getItem("token");
  const navigate = useNavigate();
  function signOut () {
    localStorage.removeItem('token')
    navigate('/login')
  }



  return (
    <nav className="flex justify-around p-3 border-b border-slate-100 items-center bg-white">
      <Link to={"/"} className="text-3xl">
        <h1>PayLane</h1>
      </Link>
      <ul className="flex gap-6">
        {loggedin ? (
          <>
          
        <Link to={"/Account"}>
          <li>Account</li>
        </Link>
        <button onClick={signOut}>
          <li>SignOut</li>
        </button></>
        ): (
          <>
          
        <Link to={"/login"}>
          <li>Login</li>
        </Link>
        <Link to={"/signup"}>
          <li>Signup</li>
        </Link>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
