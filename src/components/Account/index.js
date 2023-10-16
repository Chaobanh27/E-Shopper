import React from "react";
import UpdateAcc from "./UpdateAcc/UpdateAcc";

function index() {
  return (
    <>
      <div style={{marginBottom:"50px"}} className="col-sm-4">
        <div className="signup-form">
          <h2>Update User</h2>
          <UpdateAcc />
        </div>
      </div>
    </>
  );
}

export default index;
