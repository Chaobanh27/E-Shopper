import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import RenderError from "./RenderError";
import { useParams } from "react-router-dom";
import axios from "axios";

function Rate(props) {
  const [stars, setStars] = useState(0);
  const [error, setError] = useState({});
  const userDataCheck = localStorage.getItem("UserData");
  let userData
  if(userDataCheck !== null){
    userData = JSON.parse([userDataCheck])
  }

  let idBlog = props.idBlog;

  let params = useParams();

  useEffect(() => {
    axios
      .get(
        "https://localhost/laravel8/laravel8/public/api/blog/rate/" + params.id
      )
      .then((res) => {
          //console.log(res.data.data)
          let xx = res.data.data ;
          let sum = 0;
          props.votes(Object.keys(xx).length)
          if (Object.keys(xx).length > 0) {
            Object.keys(xx).map((key, index) => {
                sum = sum + xx[key].rate
            });
            setStars(sum/Object.keys(xx).length)
          }
      })
      .catch((error) => console.log(error));
  }, [params.id,stars,props]);



  function changeRating(newRating, name) {
    let tempGetCheck = localStorage.getItem("temp");
    let errorsSubmit = {};
    let flag = true;

    if (tempGetCheck === null) {
      errorsSubmit.post = "Vui lòng Login";
      flag = false;
    }

    if (!flag) {
      setError(errorsSubmit);
    } else {
      let accessToken = userData.token;
      let url = "https://localhost/laravel8/laravel8/public/api/blog/rate/id";
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };

      const formData = new FormData();
      formData.append("blog_id", idBlog);
      formData.append("user_id", userData.Auth.id);
      formData.append("rate", newRating);

      axios
        .post(url, formData, config)
        .then((res) => {
          console.log(res)
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  }
  return (
    <>
      <RenderError errors={error} />
      <StarRatings
        rating={stars}
        starRatedColor="blue"
        changeRating={changeRating}
        numberOfStars={6}
        name="rating"
      />
    </>
  );
}

export default Rate;
