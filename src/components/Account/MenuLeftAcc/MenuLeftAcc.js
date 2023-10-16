import React from "react";
import { Link } from "react-router-dom";

function MenuLeftAcc() {
  return (
    <>
      <div className="col-sm-3">
        <div className="left-sidebar">
          <h2>Account</h2>
          <div className="panel-group category-products" id="accordian">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <Link
                    to="/account/index"
                  >
                    <span className="badge pull-right">
                      <i className="fa fa-plus"></i>
                    </span>
                    Account
                  </Link>
                </h4>
              </div>
              <div id="sportswear" className="panel-collapse collapse">
                <div className="panel-body"></div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <Link to="/product/productIndex"
                  >
                    <span className="badge pull-right">
                      <i className="fa fa-plus"></i>
                    </span>
                    Product
                  </Link>
                </h4>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <Link
                    to="/product/myProducts"
                  >
                    <span className="badge pull-right">
                      <i className="fa fa-plus"></i>
                    </span>
                    My Product
                  </Link>
                </h4>
              </div>
              <div id="sportswear" className="panel-collapse collapse">
                <div className="panel-body"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuLeftAcc;
