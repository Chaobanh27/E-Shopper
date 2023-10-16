import gallery1 from "./images/home/gallery1.jpg";
import gallery2 from "./images/home/gallery2.jpg";
import gallery3 from "./images/home/gallery3.jpg";
import gallery4 from "./images/home/gallery4.jpg";
import recommend1 from "./images/home/recommend1.jpg";
import recommend2 from "./images/home/recommend2.jpg";
import recommend3 from "./images/home/recommend3.jpg";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataContext } from "./MyContext";

function HomeContent() {
  const [data, setData] = useState([]);
  const [wish,setWish] = useState([])
  
  const dataContext = useContext(DataContext)


  useEffect(() => {
    axios
      .get("https://localhost/laravel8/laravel8/public/api/product")
      .then((res) => {
        //console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function getTotalQty(e) {
    let sum = 1;
    Object.keys(e).map((key, index) => {
      return sum += e[key]
    });
    return sum;
  }

  let products = {}
  function handleClick(e) {
    const productId = e.target.id
    let productGetCheck = localStorage.getItem("products")

    if (productGetCheck !== null) {
      let productsGet = JSON.parse(productGetCheck);
      const totalQty = getTotalQty(productsGet);

      dataContext.getQty(totalQty)

      if (productsGet[productId] !== undefined) {
        productsGet = {...productsGet,[productId]: productsGet[productId] + 1}
      } 
      else {
        productsGet = {...productsGet,[productId]: 1}
      }
      let qtyJson = JSON.stringify(totalQty)
      localStorage.setItem("totalQty", qtyJson)
      products = productsGet
    } else {
      products = {
        [productId]: 1,
      };
      dataContext.getQty(1)
      localStorage.setItem("totalQty", 1)
    }

    let productJson = JSON.stringify(products)
    localStorage.setItem("products", productJson)
  }

  function addToWish(e){
    let wishLength
    let productId = parseInt(e.target.id) 
    let wishLocal = localStorage.getItem("wishlist")
    if(wishLocal !== null){
      let wish = JSON.parse(wishLocal)
      if(!wish.includes(productId)){
        wishLength = wish.length + 1
        dataContext.getWishQty(wishLength)
        setWish(state => {
          let newWist = [...state,productId]
          let wishJson = JSON.stringify(newWist)
          localStorage.setItem("wishlist", wishJson)
          return newWist
        })
        let wishJson = JSON.stringify(wishLength)
        localStorage.setItem("totalWish", wishJson)
      }
    }
    else{
      wishLength = wish.length + 1
      dataContext.getWishQty(wishLength)
      setWish(state => {
        let newWist = [...state,productId]
        let wishJson = JSON.stringify(newWist)
        localStorage.setItem("wishlist", wishJson)
        return newWist
      })
      let wishJson = JSON.stringify(wishLength)
      localStorage.setItem("totalWish", wishJson)
    }

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
                    onClick={handleClick}
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
                    <button id={value.id} onClick={addToWish}>
                      <i className="fa fa-plus-square"></i>Add to wishlist
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
          <h2 className="title text-center">Features Items</h2>
          {renderData()}
        </div>

        <div className="category-tab">
          <div className="col-sm-12">
            <ul className="nav nav-tabs">
              <li className="active">
                <a href="https://www.google.com/tshirt" data-toggle="tab">
                  T-Shirt
                </a>
              </li>
              <li>
                <a href="https://www.google.com/blazers" data-toggle="tab">
                  Blazers
                </a>
              </li>
              <li>
                <a href="https://www.google.com/sunglass" data-toggle="tab">
                  Sunglass
                </a>
              </li>
              <li>
                <a href="https://www.google.com/kids" data-toggle="tab">
                  Kids
                </a>
              </li>
              <li>
                <a href="https://www.google.com/poloshirt" data-toggle="tab">
                  Polo shirt
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade active in" id="tshirt">
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src={gallery1} alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button className="btn btn-default add-to-cart">
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src={gallery2} alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src={gallery3} alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src={gallery4} alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="blazers">
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src={gallery4} alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src={gallery3} alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src={gallery3} alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="sunglass">
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery3.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery4.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery2.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="kids">
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery2.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery3.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery4.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="poloshirt">
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery2.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery4.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery3.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a
                        href="https://www.google.com/"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="recommended_items">
          <h2 className="title text-center">recommended items</h2>

          <div
            id="recommended-item-carousel"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="item active">
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src={recommend1} alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a
                          href="https://www.google.com/"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src={recommend2} alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a
                          href="https://www.google.com/"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src={recommend3} alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a
                          href="https://www.google.com/"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a
                          href="https://www.google.com/"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a
                          href="https://www.google.com/"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a
                          href="https://www.google.com/"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="left recommended-item-control"
              href="https://www.google.com/recommended-item-carousel"
              data-slide="prev"
            >
              <i className="fa fa-angle-left"></i>
            </a>
            <a
              className="right recommended-item-control"
              href="https://www.google.com/recommended-item-carousel"
              data-slide="next"
            >
              <i className="fa fa-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeContent;

// Đầu tiên, chúng ta import useContext từ React và DataContext từ nguồn tài nguyên của bạn.

// Hàm getTotalQty nhận đối tượng e (giỏ hàng) và sử dụng Object.values(e) để lấy danh sách các giá trị (số lượng sản phẩm). Sau đó, chúng ta sử dụng reduce để tính tổng các giá trị đó và trả về kết quả.

// Trong hàm handleClick, chúng ta bắt đầu bằng cách lấy productId từ sự kiện click.

// Tiếp theo, chúng ta kiểm tra xem giỏ hàng đã tồn tại trong localStorage hay chưa bằng cách sử dụng localStorage.getItem("products"). Nếu tồn tại, chúng ta parse chuỗi JSON thành đối tượng productsGet.

// Tiếp theo, chúng ta tính tổng số lượng sản phẩm trong productsGet bằng cách gọi hàm getTotalQty và lưu vào biến totalQty.

// Sử dụng useContext để lấy dataContext từ DataContext và gọi phương thức getQty của dataContext để cập nhật tổng số lượng sản phẩm.

// Tiếp theo, chúng ta kiểm tra xem productId đã tồn tại trong productsGet hay chưa. Nếu đã tồn tại, chúng ta tạo một bản sao của productsGet bằng cách sử dụng toán tử spread (...) và thay đổi giá trị của thuộc tính productId bằng cách sử dụng computed property name ([productId]). Điều này đảm bảo rằng chúng ta không làm thay đổi trực tiếp đối tượng ban đầu mà tạo ra một đối tượng mới với các thuộc tính đã được cập nhật.

// Nếu productId chưa tồn tại trong productsGet, chúng ta tạo một đối tượng mới với thuộc tính productId và giá trị là 1.

// Sau đó, chúng ta lưu trữ đối tượng products vào biến productJson dưới dạng chuỗi JSON bằng cách sử dụng JSON.stringify.

// Cuối cùng, chúng ta cập nhật localStorage với giá trị mới của products.
