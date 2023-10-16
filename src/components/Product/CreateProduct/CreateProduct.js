import axios from "axios";
import React, { useEffect, useState } from "react";
import RenderError from "../RenderError";
function CreateProduct() {
  const [input, setInput] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    status: "",
    sale:"",
    detail: "",
  });
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [file, setFile] = useState([]);
  const [error, setError] = useState({});



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

  function handleFile(e) {
    let fileVal = e.target.files;
    setFile((state) => [...state, fileVal]);
  }

  function handleInput(e) {
    let inputName = e.target.name;
    let inputVal = e.target.value;
    setInput((state) => ({ ...state, [inputName]: inputVal }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    let imgTypeArr = ["png", "jpg", "jpeg", "PNG", "JPG"];
    let errorsSubmit = {};
    let flag = true;

    //check file
    if (file.length === 0) {
      errorsSubmit.type = "vui long chon file hinh anh";
      flag = false;
    }
    else {
      file.map((value, key) => {
        console.log(value.length)
        if(value.length < 4){
          Object.keys(value).map((key,index) => {
            console.log(value[key])
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

    if (!flag) {
      setError(errorsSubmit);
    } else {
      const userDataCheck = localStorage.getItem("UserData");
      if (userDataCheck !== null) {
        let userData = JSON.parse([userDataCheck]);
        let accessToken = userData.token;
        let url =
          "https://localhost/laravel8/laravel8/public/api/user/product/add";
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
        formData.append("category", input.category);
        formData.append("brand", input.brand);
        formData.append("company", "samsung");
        formData.append("status", input.status);
        formData.append("sale", input.sale);
        formData.append("detail", input.detail);
        file.map((value,key) => {
          Object.keys(value).map((key,index) => {
            formData.append("file[]",value[key])
          })
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

  return (
    <>
      <div style={{display:"flex",width:"500px",gap:"10px"}}>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            onChange={handleInput}
            placeholder="Name"
          />
          <input
            name="price"
            type="text"
            onChange={handleInput}
            placeholder="Price "
          />
          <select value={input.category} name="category" id="cars" onChange={handleInput}>
            <option disabled selected value="">
              Category
            </option>
            {renderCategory()}
          </select>
          <select value={input.brand} name="brand" id="cars" onChange={handleInput}>
            <option disabled selected value="">
              Brand
            </option>
            {renderBrand()}
          </select>
          <select value={input.status} name="status" onChange={handleInput}>
            <option>choose status</option>
            <option value={1}>new</option>
            <option value={0}>sale</option>
          </select>
          {input.status === "0" ? (
            <input name="sale" onChange={handleInput} type="number" placeholder="0" />
          ) : null}
          <input
            name="product-image"
            type="file"
            multiple
            onChange={handleFile}
          />
          <textarea placeholder="Detail" onChange={handleInput} name="detail"></textarea>
          <button type="submit" className="btn btn-default">
            Create
          </button>
        </form>
        <RenderError errors={error} />
      </div>
    </>
  );
}

export default CreateProduct;
