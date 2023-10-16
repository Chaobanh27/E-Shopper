import axios from "axios";
import React, {  useContext, useEffect, useState } from "react";
import { DataContext } from "../MyContext";

function Cart() {
  const [data, setData] = useState([]);
  const dataContext = useContext(DataContext)

  let tempData = [...data]

  useEffect(() => {
    let productGetCheck = localStorage.getItem("products");
    if (productGetCheck !== null) {
      let productGet = JSON.parse(productGetCheck);
      axios
        .post(
          "https://localhost/laravel8/laravel8/public/api/product/cart",
          productGet
        )
        .then((res) => {
          //console.log(res.data.data)
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);


  let products = {};
  function handleQtyUp(e) {
    let productId = e.target.id;
    let productGetCheck = localStorage.getItem("products");
    let totalLocalQty = localStorage.getItem("totalQty")
    if (productGetCheck !== null && totalLocalQty !== null) {
      let productGet = JSON.parse(productGetCheck);
      let totalQty = JSON.parse(totalLocalQty);
      totalQty +=1
      productGet[productId] = productGet[productId] + 1;
      products = productGet;
      let totalQtyJson = JSON.stringify(totalQty);
      localStorage.setItem("totalQty", totalQtyJson);
      dataContext.getQty(totalQty)
    }
    let productJson = JSON.stringify(products);
    localStorage.setItem("products", productJson);

    // let cartQty = document.getElementById(productId).parentElement.querySelector('.cart_quantity_input')
    // let item = data.find(item => item.id === parseInt(productId))
    // item.qty = item.qty + 1
    // cartQty.value = item.qty

    let tempItem = tempData.find(item => item.id === parseInt(productId))
    tempItem.qty = tempItem.qty + 1
    tempItem["product_total_price"] = tempItem.qty * tempItem.price
    setData(tempData)
  }

  function handleQtyDown(e) {
    let productId = e.target.id;
    let productGetCheck = localStorage.getItem("products")
    let totalLocalQty = localStorage.getItem("totalQty")
    if (productGetCheck !== null && totalLocalQty !== null) {
      let productGet = JSON.parse(productGetCheck)
      let totalQty = JSON.parse(totalLocalQty)
      totalQty -=1
      productGet[productId] = productGet[productId] - 1
      if (productGet[productId] < 1) {
        delete productGet[productId];
      }
      products = productGet
      let totalQtyJson = JSON.stringify(totalQty);
      localStorage.setItem("totalQty", totalQtyJson);
      dataContext.getQty(totalQty)
    }
    let productJson = JSON.stringify(products)
    localStorage.setItem("products", productJson)

    // let cartQty = document.getElementById(productId).parentElement.querySelector('.cart_quantity_input')
    // var item = data.find(item => item.id === parseInt(productId))
    // item.qty = item.qty - 1
    // cartQty.value = item.qty    

    let tempItem = tempData.find(item => item.id === parseInt(productId))
    tempItem.qty = tempItem.qty - 1
    tempItem["product_total_price"] = tempItem.qty * tempItem.price
    setData(tempData)
  }

  function handleProductDel(e) {
    let productId = e.target.id;
    let productGetCheck = localStorage.getItem("products");
    let totalLocalQty = localStorage.getItem("totalQty")

    if (productGetCheck !== null && totalLocalQty !== null) {
      let productGet = JSON.parse(productGetCheck);
      let totalQty = JSON.parse(totalLocalQty)
      totalQty = totalQty - productGet[productId]
      delete productGet[productId];
      products = productGet;
      let totalQtyJson = JSON.stringify(totalQty);
      localStorage.setItem("totalQty", totalQtyJson);
      dataContext.getQty(totalQty)
    }
    let productJson = JSON.stringify(products);
    localStorage.setItem("products", productJson);

    let cart = document.getElementById(productId).parentElement.parentElement.parentElement
    cart.remove()
    
  }

  function renderData() {
    if (data.length > 0) {
      return data.map((value, key) => {
        let productImage = JSON.parse(value.image);
          return (
            <tr key={key}>
              <td class="cart_product">
                <a href="">
                  <img
                    style={{width:150}}
                    src={
                      "https://localhost/laravel8/laravel8/public/upload/product/" +
                      value.id_user +
                      "/" +
                      productImage[0]
                    }
                    alt=""
                  />
                </a>
              </td>
              <td class="cart_description">
                <h4>
                  <a href="">{value.name}</a>
                </h4>
                <p>Web ID: 1089772</p>
              </td>
              <td class="cart_price">
                <p>${value.price}</p>
              </td>
              <td class="cart_quantity">
                <div class="cart_quantity_button">
                  <button
                    id={value.id}
                    class="cart_quantity_up"
                    onClick={handleQtyUp}
                  >
                    {" "}
                    +{" "}
                  </button>
                  <input
                    class="cart_quantity_input"
                    type="text"
                    name="quantity"
                    value={value.qty}
                    autocomplete="off"
                    size="2"
                  />
                  <button
                    id={value.id}
                    class="cart_quantity_down"
                    onClick={handleQtyDown}
                  >
                    {" "}
                    -{" "}
                  </button>
                </div>
              </td>
              <td class="cart_total">
                <p id={value.id} class="cart_total_price">${value.price * value.qty}</p>
              </td>
              <td class="cart_delete">
                <button
                  id={value.id}
                  onClick={handleProductDel}
                  class="cart_quantity_delete"
                >
                  X
                </button>
              </td>
            </tr>
          );
      });
    }
  }

  return (
    <>
      <section id="cart_items">
        <div class="container">
          <div class="breadcrumbs">
            <ol class="breadcrumb">
              <li>
                <a href="#">Home</a>
              </li>
              <li class="active">Shopping Cart</li>
            </ol>
          </div>
          <div class="table-responsive cart_info">
            <table class="table table-condensed">
              <thead>
                <tr class="cart_menu">
                  <td class="image">Item</td>
                  <td class="description"></td>
                  <td class="price">Price</td>
                  <td class="quantity">Quantity</td>
                  <td class="total">Total</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>{renderData()}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="do_action">
        <div class="container">
          <div class="heading">
            <h3>What would you like to do next?</h3>
            <p>
              Choose if you have a discount code or reward points you want to
              use or would like to estimate your delivery cost.
            </p>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="chose_area">
                <ul class="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping & Taxes</label>
                  </li>
                </ul>
                <ul class="user_info">
                  <li class="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li class="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li class="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a class="btn btn-default update" href="">
                  Get Quotes
                </a>
                <a class="btn btn-default check_out" href="">
                  Continue
                </a>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="total_area">
                <ul>
                  <li>
                    Cart Sub Total <span>$59</span>
                  </li>
                  <li>
                    Eco Tax <span>$2</span>
                  </li>
                  <li>
                    Shipping Cost <span>Free</span>
                  </li>
                  <li>
                    Total <span>$61</span>
                  </li>
                </ul>
                <a class="btn btn-default update" href="">
                  Update
                </a>
                <a class="btn btn-default check_out" href="">
                  Check Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
