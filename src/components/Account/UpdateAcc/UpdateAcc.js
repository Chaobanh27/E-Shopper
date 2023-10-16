import axios from "axios";
import React, { useEffect, useState } from "react";
import RenderError from './RenderError'

function UpdateAcc() {


  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    pass: "",
  });
  const [error,setError] = useState({})


  useEffect(() => {
    const userDataCheck = localStorage.getItem("UserData");
    if (userDataCheck !== null) {
      let userData = JSON.parse([userDataCheck])
      setUser({
        name: userData.Auth.name,
        email: userData.Auth.email,
        address: userData.Auth.address,
        phone: userData.Auth.phone,
      })
    }
  },[])

  function handleInput(e) {
    let nameInput = e.target.name;
    let inputVal = e.target.value;
    setUser((state) => ({ ...state, [nameInput]: inputVal }));
  }

  function handleSubmit(e){
    e.preventDefault()
    let emailRegex = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
    // let imgTypeArr = ["png", "jpg", "jpeg", "PNG", "JPG"];
    let errorsSubmit = {};
    let flag = true;

    //check name
    if (user.name === "") {
      errorsSubmit.name = "name Không được để trống";
      flag = false;
    } else {
      errorsSubmit.name = "";
      flag = true;
    }

    //check email
    if (user.email === "") {
      errorsSubmit.email = "email Không được để trống";
      flag = false;
    } else if (!emailRegex.test(user.email)) {
      errorsSubmit.email = "email phai co dinh dang gmail";
      flag = false;
    } else {
      errorsSubmit.email = "";
      flag = true;
    }

    //check password
    if (user.password === "") {
      errorsSubmit.password = "password Không được để trống";
      flag = false;
    } else {
      errorsSubmit.password = "";
      flag = true;
    }

    //check phone
    if (user.phone === "") {
      errorsSubmit.phone = "phone Không được để trống";
      flag = false;
    } else {
      errorsSubmit.phone = "";
      flag = true;
    }

    //check address
    if (user.address === "") {
      errorsSubmit.address = "address Không được để trống";
      flag = false;
    } else {
      errorsSubmit.address = "";
      flag = true;
    }

    if (flag) {
      const userDataCheck = localStorage.getItem("UserData");
      let userData 
      if(userDataCheck !== null){
        userData = JSON.parse([userDataCheck])
      }
      let accessToken = userData.token;
      let baseUrl = "https://localhost/laravel8/laravel8/public/api/user/update/" + userData.Auth.id
      let config = {
        headers: {
          'Authorization': "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          'Accept': "application/json"
        }
      };
      
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("pass", user.pass);
      formData.append("email", user.email);
      formData.append("password", user.pass);
      formData.append("phone", user.address);
      formData.append("address", user.address);

      axios
        .post(baseUrl, formData , config)
        .then((res) => {
          res.data.errors ? setError(res.data.errors) : console.log(res.data.Auth)
          if(userDataCheck !== null){
            userData = JSON.parse([userDataCheck])
            userData.Auth.name = res.data.Auth.name
            userData.Auth.address = res.data.Auth.address
            userData.Auth.phone = res.data.Auth.phone
            let userDataJson = JSON.stringify(userData)
            localStorage.setItem("UserData",userDataJson)
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
      <RenderError errors={error}/>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          onChange={handleInput}
          placeholder="name"
          value={user.name}
        />
        <input
          name="email"
          type="email"
          onChange={handleInput}
          placeholder="email "
          value={user.email}
          readOnly
        />
        <input name="password" onChange={handleInput} placeholder="password" />
        <input
          name="phone"
          type="tel"
          onChange={handleInput}
          placeholder="phone"
          value={user.phone}
        />
        <input
          name="address"
          type="text"
          onChange={handleInput}
          placeholder="address"
          value={user.address}
        />
        {/* <input name="avatar" type="file" onChange={handleFile} /> */}
        <button type="submit" className="btn btn-default">
          Update
        </button>
      </form>
    </>
  );
}

export default UpdateAcc;
