import axios from "axios";
import React, { useState } from "react";
import RenderError from "./RenderError";

function Register() {
  const [error, setError] = useState({});
  const [file, setFile] = useState("");
  const [avatar, setAvatar] = useState("");
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  function handleInput(e) {
    let nameInput = e.target.name;
    let inputVal = e.target.value;
    setInput((state) => ({ ...state, [nameInput]: inputVal }));
  }
  function handleFile(e) {
    let fileVal = e.target.files;
    let reader = new FileReader()
    reader.onload = (e) => {
      setAvatar(e.target.result)  //gui qua API
      setFile(fileVal[0]);        //de check type va size cua file
    }
    reader.readAsDataURL(fileVal[0])
  }
  function handleSubmit(e) {
    e.preventDefault();
    let emailRegex = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
    let imgTypeArr = ["png", "jpg", "jpeg", "PNG", "JPG"];
    let errorsSubmit = {};
    let flag = true;

    //check file
    if (file === "") {
      errorsSubmit.type = "vui long chon file hinh anh";
      flag = false;
    } else {
      let fileType = file.name.split(".").pop();
      if (!imgTypeArr.includes(fileType)) {
        errorsSubmit.file = "Hay chon dung kieu file hinh anh";
        flag = false;
      } else if (file.size > 1024 * 1024) {
        errorsSubmit.file = "File khong duoc lon hon 1 mb";
        flag = false;
      } else {
        errorsSubmit.type = "";
        flag = true;
      }
    }

    //check name
    if (input.name === "") {
      errorsSubmit.name = "name Không được để trống";
      flag = false;
    } else {
      errorsSubmit.name = "";
      flag = true;
    }

    //check email
    if (input.email === "") {
      errorsSubmit.email = "email Không được để trống";
      flag = false;
    } else if (!emailRegex.test(input.email)) {
      errorsSubmit.email = "email phai co dinh dang gmail";
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

    //check phone
    if (input.phone === "") {
      errorsSubmit.phone = "phone Không được để trống";
      flag = false;
    } else {
      errorsSubmit.phone = "";
      flag = true;
    }

    //check address
    if (input.address === "") {
      errorsSubmit.address = "address Không được để trống";
      flag = false;
    } else {
      errorsSubmit.address = "";
      flag = true;
    }

    if (flag) {
      const data = {
        name: input.name,
        email: input.email,
        password: input.password,
        phone: input.phone,
        address: input.address,
        avatar:avatar,
        level:0
      };
      axios
        .post("https://localhost/laravel8/laravel8/public/api/register", data)
        .then((res) => {
          res.data.errors ? setError(res.data.errors) : console.log(res)
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
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input name="name" type="text" onChange={handleInput} placeholder="name" />
        <input name="email" type="email" onChange={handleInput} placeholder="email " />
        <input name="password" onChange={handleInput} placeholder="password" />
        <input name="phone" type="tel" onChange={handleInput} placeholder="phone" />
        <input name="address" type="text" onChange={handleInput} placeholder="address" />
        <input name="avatar" type="file" onChange={handleFile}  />
        <input name="level" type="number" readOnly />
        <button type="submit" className="btn btn-default">
          Sign up
        </button>
      </form>
    </>
  );
}

export default Register;
