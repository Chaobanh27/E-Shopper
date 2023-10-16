import axios from "axios";
import React, { useState } from "react";
import RenderError from "./RenderError";
import { useNavigate } from "react-router-dom";

function Login() {
  const [error,setError] = useState({})
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate()

  function handleInput(e) {
    let inputVal = e.target.value;
    let nameInput = e.target.name;
    setInput(state => ({...state,[nameInput]:inputVal}));
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;
    
    //check email
    if (input.email === "") {
      errorsSubmit.email = "email Không được để trống";
      flag = false;
    } else {
      errorsSubmit.email = "";
      flag = true;
    }

    //check password
    if (input.password === "") {
      errorsSubmit.password = "password Không được để trống";
      flag = false;
    } else {
      errorsSubmit.password = "";
      flag = true;
    }

    if (flag) {
      const data = {
        email: input.email,
        password: input.password,
        level:0
      };
      axios
        .post("https://localhost/laravel8/laravel8/public/api/login", data)
        .then((res) => {
          if(res.data.errors){
            setError(res.data.errors)
          }
          else{
            console.log(res)
            let userData = res.data
            let userDataJson = JSON.stringify(userData)
            localStorage.setItem("UserData",userDataJson)
            let temp = true
            localStorage.setItem("temp",temp)
            navigate("/")
          }
        })
        .catch(function (errors){
          console.log(errors)
        })
    } 
    else {
      setError(errorsSubmit);
    }
  }

  return (
    <>
      <RenderError errors={error} />
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          onChange={handleInput}
        />
        <input name="password" type="text" placeholder="Password" onChange={handleInput} />
        <span>
          <input type="checkbox" className="checkbox" />
          Keep me signed in
        </span>
        <button type="submit" className="btn btn-default">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
