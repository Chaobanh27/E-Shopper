import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyProducts() {
    const [data,setData] = useState([])
    const userDataCheck = localStorage.getItem("UserData");


    useEffect(() => {
        if (userDataCheck !== null) {
            let userData = JSON.parse([userDataCheck]);
            let accessToken = userData.token;
            let url = "https://localhost/laravel8/laravel8/public/api/user/my-product";
            let config = {
              headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
              },
            };
            axios.get(url,config)
            .then(res => {
                setData(res.data.data)
            })
            .catch(error => console.log(error))
        }
    },[])

    function handleDelete(e){
      let getId = e.target.id
      if (userDataCheck !== null) {
        let userData = JSON.parse([userDataCheck]);
        let accessToken = userData.token;
        let url = `https://localhost/laravel8/laravel8/public/api/user/product/delete/${getId}`;
        let config = {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
        axios.get(url,config)
        .then(res => {
          console.log(res)
        })
        .catch(error => console.log(error))
      }
    }

    function renderData(){
        if(Object.keys(data).length > 0){
            return Object.keys(data).map((key,index) => {
              let productImage = JSON.parse([data[key].image]) 
              if (userDataCheck !== null){
                let userData = JSON.parse([userDataCheck]);
                return(
                  <tr key={key}>
                      <td>{data[key].id}</td>
                      <td>{data[key].name}</td>
                      <td><img style={{width:50}} src={ "https://localhost/laravel8/laravel8/public/upload/product/" + userData.Auth.id + "/" + productImage[0] } alt=""/></td>
                      <td>{data[key].price}</td>
                      <td>
                          <Link to={"/product/editProduct/" + data[key].id}  >edit</Link>
                          <button onClick={handleDelete} id={data[key].id} >delete</button>
                      </td>
                  </tr>
              )  
              }
            })
        }
    }


  return (
    <>
        <table style={{width:500}} class="table table-condensed" >
          <thead>
            <tr style={{backgroundColor:"#F09D3A",color:"white"}} class="product_menu">
              <td class="id">Id</td>
              <td class="name">Name</td>
              <td class="Image">image</td>
              <td class="Price">Price</td>
              <td class="Action">Action</td>
            </tr>
          </thead>
          <tbody>
          {renderData()}
          </tbody>
        </table>
    </>
  );
}

export default MyProducts;
