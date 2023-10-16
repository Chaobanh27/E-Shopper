import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Index() {
    const [data,setData] = useState([])
    useEffect(() => {
        axios.get("https://localhost/laravel8/laravel8/public/api/blog")
        .then(res => {
            // console.log(res.data.blog.data)
            setData(res.data.blog.data)
        })
        .catch(error => console.log(error))
    },[])


function renderData(){
    if(data.length > 0){
      return data.map((value,key) => {
        let id = value.id
        return(
            <div key={key} className="single-blog-post">
                <h3>{value.title}</h3>
                <div className="post-meta">
                  <ul>
                    <li>
                      <i className="fa fa-user"></i> Mac Doe
                    </li>
                    <li>
                      <i className="fa fa-clock-o"></i> 1:33 pm
                    </li>
                    <li>
                      <i className="fa fa-calendar"></i> DEC 5, 2013
                    </li>
                  </ul>
                  <span>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-o"></i>
                  </span>
                </div>
                <a href="">
                  <img src={"https://localhost/laravel8/laravel8/public/upload/Blog/image/" + value.image} alt="" />
                </a>
                <p>
                {value.description}
                </p>
                <Link className="btn btn-primary" to={"/blog/detail/" + id}>Read More</Link>
              </div>
        )
      })
    }
  }


  return (
    <>
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          {renderData()}
          <div className="pagination-area">
            <ul className="pagination">
              <li>
                <a href="" className="active">
                  1
                </a>
              </li>
              <li>
                <a href="">2</a>
              </li>
              <li>
                <a href="">3</a>
              </li>
              <li>
                <a href="">
                  <i className="fa fa-angle-double-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index