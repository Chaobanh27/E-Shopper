import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "./images/home/logo.png";

function Header() {

  const navigate = useNavigate()

  let totalQty = JSON.parse(localStorage.getItem("totalQty"))
  let totalWish = JSON.parse(localStorage.getItem("totalWish"))

  let tempGetCheck = localStorage.getItem("temp")
  let tempGet
  if(tempGetCheck !== null){
    tempGet = JSON.parse(tempGetCheck)
  }

  
  function renderLogin(){
    let htmlEl

    if(tempGet){
      htmlEl = <li><Link to="/member/index" onClick={logout}>Logout</Link></li>
    }
    else{
      htmlEl = <li><Link to="/member/index">Login</Link></li>
    }
    return htmlEl
  }
  
  function logout(){
    localStorage.removeItem("temp")
    navigate("/member/index")
  }

  function checkAccountlogin(){
    let htmlEl
    if(tempGet){
      htmlEl = <li><Link to="/account/index">Account</Link></li>
    }
    else{
      htmlEl = <li><Link to="/member/index">Account</Link></li>
    }
    return htmlEl
  }

  return (
    <>
      <header id="header">
        <div className="header_top">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="contactinfo">
                  <ul className="nav nav-pills">
                    <li>
                      <a href="https://www.google.com/">
                        <i className="fa fa-phone"></i> +2 95 01 88 821
                      </a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">
                        <i className="fa fa-envelope"></i> info@domain.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="social-icons pull-right">
                  <ul className="nav navbar-nav">
                    <li>
                      <a href="https://www.google.com/">
                      <i class="fa-brands fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">
                      <i class="fa-brands fa-twitter"></i>

                      </a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">
                      <i class="fa-brands fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">
                      <i class="fa-brands fa-dribbble"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">
                      <i class="fa-brands fa-google-plus"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <a href="index.html">
                    <img src={logo} alt="" />
                  </a>
                </div>
                <div className="btn-group pull-right clearfix">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      USA
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="https://www.google.com/">Canada</a>
                      </li>
                      <li>
                        <a href="https://www.google.com/">UK</a>
                      </li>
                    </ul>
                  </div>

                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      DOLLAR
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="https://www.google.com/">Canadian Dollar</a>
                      </li>
                      <li>
                        <a href="https://www.google.com/">Pound</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-8 clearfix">
                <div className="shop-menu clearfix pull-right">
                  <ul className="nav navbar-nav">
                    <li>
                      {checkAccountlogin()}
                    </li>
                    <li>
                      <Link to="/wishlist">
                        Wishlist
                        <span id="total-quantity">{totalWish !== null ? totalWish : 0}</span> 
                        </Link>
                    </li>
                    <li>
                      <a href="checkout.html">
                        <i className="fa fa-crosshairs"></i> Checkout
                      </a>
                    </li>
                    <li>
                      <Link to="/cart" >
                        <i className="fa fa-shopping-cart"></i> Cart
                        <span id="total-quantity">{totalQty !== null ? totalQty : 0}</span>
                      </Link>
                    </li>
                    <li>
                        {renderLogin()}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle"
                    data-toggle="collapse"
                    data-target=".navbar-collapse"
                  >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>
                <div className="mainmenu pull-left">
                  <ul className="nav navbar-nav collapse navbar-collapse">
                    <li>
                      <Link to="/">Home</Link>

                    </li>
                    <li className="dropdown">
                      <Link to="/blog/index" >Blog</Link>

                      <ul role="menu" className="sub-menu">
                        <li>
                          <a href="/blog/index">Blog list</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="404.html">404</a>
                    </li>
                    <li>
                      <a href="contact-us.html">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="search_box pull-right">
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
