import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({isLoggedIn, setIsLoggedIn}) {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  async function login(e){
    e.preventDefault();

    // api req --> signup
    // https://simple-todo-backend-ten.vercel.app/register

    const user = {
      username: userName,
      password: password,
    };

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await fetch(
        "https://simple-todo-backend-ten.vercel.app/login",
        options
      );

      const data = await res.json();


      if(data.token){
        alert("Login successfull");

        localStorage.setItem("token", data.token);

        setIsLoggedIn(true)

        navigate("/");
  

      }else{
        alert("Invalid credentials. try again");
        console.log(data.error)
      }


    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  return (
    <div className="pt-16 px-20 min-h-screen w-full flex items-center justify-center">
    <div className="min-w-1/3 bg-slate-200 p-8 rounded-2xl">
      <h1 className="text-2xl font-bold text-center pb-6">Login into your account.</h1>
      <form onSubmit={login} className=" flex flex-col gap-6">
        <div className="flex gap-2 flex-col">
          <label htmlFor="username">User Name</label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
            type="text"
            id="username"
            placeholder="Enter your name"
            className="border-2 border-slate-700 rounded-sm"
          />
        </div>
        <div className="flex gap-2 flex-col">
          <label htmlFor="passowrd">Enter passowrd</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            type="password"
            id="password"
            placeholder="Enter your password"
            className="border-2 border-slate-700 rounded-sm"
          />
        </div>
        <button className="bg-green-400 hover:bg-green-600 rounded-lg py-1 text-slate-100 font-bold cursor-pointer">
          Login
        </button>
      </form>
      <p className="pt-4">
        Don't have an account? <Link to="/signup" className="text-blue-600">Singup</Link>
      </p>
    </div>
  </div>
  );
}

export default Login;
