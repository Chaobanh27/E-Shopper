import axios from "axios";
import React, { useState } from "react";
import RenderError from './RenderError'


function Comment(props) {
  const userDataCheck = localStorage.getItem("UserData");
  let userData
  if(userDataCheck !== null){
    userData = JSON.parse([userDataCheck])
  }
  
  const [input, setInput] = useState("");
  const [error, setError] = useState({});

  let idBlog = props.idBlog;
  let idComment = props.idComment
 

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    let tempGetCheck = localStorage.getItem("temp");
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;

    if (tempGetCheck === null) {
      errorsSubmit.post = "Vui lòng Login";
      flag = false;
    } else {
      errorsSubmit.post = "";
      if (input === "") {
        errorsSubmit.comment = "Vui lòng nhap binh luan";
        flag = false;
      } else {
        errorsSubmit.comment = "";
        flag = true;
      }
    }

    if (!flag) {
      setError(errorsSubmit);
    } 
    else {
      let accessToken = userData.token;
      let url = "https://localhost/laravel8/laravel8/public/api/blog/comment/id";
      let config = {
        headers: {
          'Authorization': "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          'Accept': "application/json"
        }
      };

      const formData = new FormData();
      formData.append("comment", input);
      formData.append("id_blog", idBlog);
      formData.append("image_user", userData.Auth.avatar);
      formData.append("id_comment", idComment ? idComment : 0);
      formData.append("id_user", userData.Auth.id);
      formData.append("name_user", userData.Auth.name);

      axios
        .post(url, formData, config)
        .then((res) => {
          //console.log(res.data.data);
          props.getCmt(res.data.data)
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  }

  return (
    <>
			<RenderError errors={error} />
      <form id="text-area" className="text-area" onSubmit={handleSubmit}>
        <div className="blank-arrow">
          <label>Your Name</label>
        </div>
        <span>*</span>
        <textarea name="message" rows="11" onChange={handleChange}></textarea>
        <button className="btn btn-primary" type="submit">
          post comment
        </button>
      </form>
    </>
  );
}

export default Comment;
