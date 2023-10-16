import React from "react";
import CreateProduct from "./CreateProduct/CreateProduct";

function ProductIndex() {
  return (
    <>
      <div style={{ marginBottom: "50px" }} className="col-sm-4">
        <div className="signup-form">
          <h2>Create product</h2>
          <CreateProduct />
        </div>
      </div>
    </>
  );
}

export default ProductIndex;
