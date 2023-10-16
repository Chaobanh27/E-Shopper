import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

function ProductDetail() {
  let params = useParams();
  const [data, setData] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(
        "https://localhost/laravel8/laravel8/public/api/product/detail/" +
          params.id
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => console.log(error));
  }, [params.id]);

  function renderData() {
    if (Object.keys(data).length > 0) {
      let productImage = JSON.parse(data.image);
      let allProductImage = productImage.map((value, key) => {
        return (
          <img
            key={key}
            src={
              "https://localhost/laravel8/laravel8/public/upload/product/" +
              data.id_user +
              "/" +
              value
            }
            style={{ width: "150px" }}
            class="newarrival"
            alt=""
          />
        );
      });
      return (
        <>
          <div class="col-sm-7">
            <div class="product-information">
              <div style={{ display: "flex" }}>{allProductImage}</div>
              <h2>{data.name}</h2>
              <p>Web ID: 1089772</p>
              <img alt="" />
              <span>
                <span>US ${data.price}</span>
                <label>Quantity:</label>
                <input type="text" value="3" />
                <button type="button" class="btn btn-fefault cart">
                  <i class="fa fa-shopping-cart"></i>
                  Add to cart
                </button>
              </span>
              <p>
                <b>Availability:</b> In Stock
              </p>
              <p>
                <b>Condition:</b> New
              </p>
              <p>
                <b>Brand:</b> E-SHOPPER
              </p>
              <a href="">
                <img
                  src="images/product-details/share.png"
                  class="share img-responsive"
                  alt=""
                />
              </a>
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
      {renderData()}
    </>
  );
}

export default ProductDetail;
