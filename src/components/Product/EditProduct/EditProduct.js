import React, { useState, useEffect } from "react";
import RenderError from "../RenderError";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditProduct() {
  let params = useParams();
  const [input, setInput] = useState({
    name: "",
    price: "",
    id_category: "",
    id_brand: "",
    status: "",
    sale: "",
    detail: "",
  });


  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [image,setImage] = useState([])
  const [file,setFile] = useState([])
  const [error, setError] = useState({});
  const userDataCheck = localStorage.getItem("UserData");
  const [avatarCheckBox,setAvatarCheckBox] = useState([])



  //get danh sach category va brand
  useEffect(() => {
    axios
      .get("https://localhost/laravel8/laravel8/public/api/category-brand")
      .then((res) => {
        setCategory(res.data.category);
        setBrand(res.data.brand);
      })
      .catch((error) => console.log(error));
  }, []);

  function renderCategory() {
    if (category.length > 0) {
      return category.map((value, key) => {
        return (
          <option key={key} value={value.id}>
            {value.category}
          </option>
        );
      });
    }
  }

  function renderBrand() {
    if (brand.length > 0) {
      return brand.map((value, key) => {
        return (
          <option key={key} value={value.id}>
            {value.brand}
          </option>
        );
      });
    }
  }

  //get thong tin product voi id
  useEffect(() => {
    if (userDataCheck !== null) {
      let userData = JSON.parse([userDataCheck]);
      let accessToken = userData.token;
      let url =
        "https://localhost/laravel8/laravel8/public/api/user/product/" +
        params.id;
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      axios
        .get(url, config)
        .then((res) => {
          setInput(res.data.data);
          console.log(res.data.data)
          setImage(res.data.data.image)
        })
        .catch((error) => console.log(error));
    }
  }, [params.id, userDataCheck]);

  //quản lý hình ảnh cần xóa
  function handleCheckBox(e){
    if(e.target.checked) {
      let checkBoxVal = e.target.value
      setAvatarCheckBox(state => [...state,checkBoxVal])
    }
    else{
      let checkBoxVal = e.target.value
      setAvatarCheckBox(avatarCheckBox.filter((value) => value !== checkBoxVal))
    }
  }

  //render hinh anh cua product ra 
  function renderImage(){
    if(image.length > 0){
      return image.map((value,key) => {
        if (userDataCheck !== null) {
        let userData = JSON.parse([userDataCheck]);
        return (
          <div key={key} >
              <img style={{width:100}} src={"https://localhost/laravel8/laravel8/public/upload/product/" + userData.Auth.id + "/" + value} alt="" />
              <input onChange={handleCheckBox} value={value} type="checkbox" />
          </div>
        )
        }
      })
    }
  }



  //quản lý file đầu vào
  function handleFile(e) {
    let fileVal = e.target.files;
    setFile((state) => [...state, fileVal]);
  }

  //quản lý ô nhập liệu đầu vào
  function handleInput(e) {
    let inputName = e.target.name;
    let inputVal = e.target.value;
    setInput((state) => ({ ...state, [inputName]: inputVal }));
  }

  // kiểm tra ô nhập liệu đầu vào và submit
  function handleSubmit(e) {
    e.preventDefault();
    let imgTypeArr = ["png", "jpg", "jpeg", "PNG", "JPG"];
    let errorsSubmit = {};
    let flag = true;



    //check name
    if (input.name === "") {
      errorsSubmit.name = "name Không được để trống";
      flag = false;
    } else {
      errorsSubmit.name = "";
      flag = true;
    }

    //check price
    if (input.price === "") {
      errorsSubmit.price = "price Không được để trống";
      flag = false;
    } else {
      errorsSubmit.price = "";
      flag = true;
    }

    //check category
    if (input.category === "") {
      errorsSubmit.category = "category Không được để trống";
      flag = false;
    } else {
      errorsSubmit.category = "";
      flag = true;
    }

    //check brand
    if (input.brand === "") {
      errorsSubmit.brand = "brand Không được để trống";
      flag = false;
    } else {
      errorsSubmit.brand = "";
      flag = true;
    }

    //check brand
    if (input.status === "") {
      errorsSubmit.status = "status Không được để trống";
      flag = false;
    } else {
      errorsSubmit.status = "";
      flag = true;
    }

    //check detail
    if (input.detail === "") {
      errorsSubmit.detail = "detail Không được để trống";
      flag = false;
    } else {
      errorsSubmit.detail = "";
      flag = true;
    }

    //check file
    if (file.length === 0) {
      errorsSubmit.type = "vui long chon file hinh anh";
      flag = false;
    }
    else {
      file.map((value, key) => {
        if(value.length < 4){
          Object.keys(value).map((key,index) => {
            let fileType = value[key].name.split(".").pop();
            if (!imgTypeArr.includes(fileType)) {
              errorsSubmit.file = "Hay chon dung kieu file hinh anh";
              flag = false;
            } else if (value[key].size > 1024 * 1024) {
              errorsSubmit.file = "File khong duoc lon hon 1 mb";
              flag = false;
            } 
            else {
              errorsSubmit.type = "";
              flag = true;
            }
          })
        }
        else{
          errorsSubmit.file = "upload khong qua 3 anh";
          flag = false;
        }
      });
    }

    if (!flag) {
      setError(errorsSubmit);
    } 
    else {
      if(avatarCheckBox.length + file[0].length < 4){
        const userDataCheck = localStorage.getItem("UserData");
        if (userDataCheck !== null) {
          let userData = JSON.parse([userDataCheck]);
          let accessToken = userData.token;
          let url ="https://localhost/laravel8/laravel8/public/api/user/product/update/" + input.id;
          let config = {
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
          };
  
          const formData = new FormData();
          formData.append("name", input.name);
          formData.append("price", input.price);
          formData.append("category", input.id_category);
          formData.append("brand", input.id_brand);
          formData.append("company", "samsung");
          formData.append("status", input.status);
          formData.append("sale", input.sale);
          formData.append("detail", input.detail);
          file.map((value,key) => {
            Object.keys(value).map((key,index) => {
              console.log(value[key].length)
              formData.append("file[]",value[key])
            })
          })
            avatarCheckBox.map((value,key) => {
              formData.append("avatarCheckBox[]",value)
            })
          axios
            .post(url, formData, config)
            .then((res) => {
              res.data.errors ? setError(res.data.errors) : console.log(res)
            })
            .catch((errors) => {
              console.log(errors);
            });
        }
      }

    }
  }

  return (
    <>
      <div style={{ marginBottom: "50px" }} className="col-sm-4">
        <div className="signup-form">
          <h2>Edit product</h2>
          <div style={{ display: "flex", width: "500px", gap: "10px" }}>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <input
                value={input.name}
                name="name"
                type="text"
                onChange={handleInput}
                placeholder="Name"
              />
              <input
                value={input.price}
                name="price"
                type="text"
                onChange={handleInput}
                placeholder="Price "
              />
              <select
                value={input.id_category}
                name="id_category"
                id="cars"
                onChange={handleInput}
              >
                <option disabled selected value="">
                  Category
                </option>
                {renderCategory()}
              </select>
              <select value={input.id_brand} name="id_brand" id="cars" onChange={handleInput}>
                <option disabled selected value="">
                  Brand
                </option>
                {renderBrand()}
              </select>
              <select value={input.status}  name="status" onChange={handleInput}>
                <option>choose status</option>
                <option value={1}>new</option>
                <option value={0}>sale</option>
              </select>
              {input.status === "0" ? (
                <input
                  name="sale"
                  onChange={handleInput}
                  type="number"
                  placeholder="0"
                />
              ) : null}
              <input
                name="product-image"
                type="file"
                multiple
                onChange={handleFile}
              />
              <div style={{display:"flex"}}>
                {renderImage()}
              </div>
              <textarea
                placeholder="Detail"
                onChange={handleInput}
                name="detail"
                value={input.detail}
              ></textarea>
              <button type="submit" className="btn btn-default">
                Edit
              </button>
            </form>
            <RenderError errors={error} />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
