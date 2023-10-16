import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../MyContext";

function WishlistIndex() {
  const [data, setData] = useState([])
  const dataContext = useContext(DataContext)

  let tempDataArr = [...data]

  useEffect(() => {
    axios
      .get("https://localhost/laravel8/laravel8/public/api/product/wishlist")
      .then((res) => {
         let localWish = localStorage.getItem("wishlist")
         if(localWish !== null){
          let wish = JSON.parse(localWish)
          let dataArr = res.data.data
          //tạo mảng rỗng 
          let tempArr = []
          wish.map((value,key) => {
            //lọc ra những phần tử có id trùng với value rồi dùng push thêm phần tử đó vào mảng tempDataArr
            return tempArr.push(...dataArr.filter((e) => e.id === value))
          })
          setData(tempArr);
         }
      })
      .catch((error) => console.log(error));
  }, []);

  function deleteWish(e){
    let productId = parseInt(e.target.id)
    let localWish = localStorage.getItem("wishlist")
    let totalLocalWish = localStorage.getItem("totalWish")
    let tempArr = []
    if(localWish !== null && totalLocalWish !== null){
      let wish = JSON.parse(localWish)
      let totaWish = JSON.parse(totalLocalWish)
      tempArr.push(...wish.filter(e => e !== productId))
      totaWish = totaWish - 1
      let totalWishJson = JSON.parse(totaWish)
      localStorage.setItem("totalWish", totalWishJson)
      dataContext.getWishQty(totaWish)
    }
    let tempArrJson = JSON.stringify(tempArr);
    localStorage.setItem("wishlist", tempArrJson)
    let temp = tempDataArr.filter(e => e.id !== productId)
    setData(temp)
  }

  function renderData() {
    if (data.length > 0) {
      return data.map((value, key) => {
        let productImage = JSON.parse(value.image);
        return (
          <div key={key} className="col-sm-4">
            <div className="product-image-wrapper">
              <div className="single-products">
                <div className="productinfo text-center">
                  <img
                    src={
                      "https://localhost/laravel8/laravel8/public/upload/product/" +
                      value.id_user +
                      "/" +
                      productImage[0]
                    }
                    alt=""
                  />
                  <h2>${value.price}</h2>
                  <p>{value.name}</p>
                  <button
                    name="id"
                    //onClick={handleClick}
                    id={value.id}
                    className="btn btn-default add-to-cart"
                  >
                    <i className="fa fa-shopping-cart"></i>Add to cart
                  </button>
                </div>
              </div>
              <div className="choose">
                <ul className="nav nav-pills nav-justified">
                  <li>
                    <button id={value.id} onClick={deleteWish}>
                      <i className="fa fa-plus-square"></i>remove wish
                    </button>
                  </li>
                  <li>
                    <Link to={"/product/detail/" + value.id}>
                      <i className="fa fa-plus-square"></i>Detail
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  return (
    <>
      <div className="col-sm-9 padding-right">
        <div className="features_items">
          <h2 className="title text-center">Wish Items</h2>
          {renderData()}
        </div>
      </div>
    </>
  );
}

export default WishlistIndex;
