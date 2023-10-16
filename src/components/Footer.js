import iframe1 from "./images/home/iframe1.png";
import iframe2 from "./images/home/iframe2.png";
import iframe3 from "./images/home/iframe3.png";
import iframe4 from "./images/home/iframe4.png";

function Footer() {
    return (
      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-sm-2">
                <div className="companyinfo">
                  <h2>
                    <span>e</span>-shopper
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed
                    do eiusmod tempor
                  </p>
                </div>
              </div>
              <div className="col-sm-7">
                <div className="col-sm-3">
                  <div className="video-gallery text-center">
                    <a href="https://www.google.com/">
                      <div className="iframe-img">
                        <img src={iframe1} alt="" />
                      </div>
                      <div className="overlay-icon">
                        <i className="fa fa-play-circle-o"></i>
                      </div>
                    </a>
                    <p>Circle of Hands</p>
                    <h2>24 DEC 2014</h2>
                  </div>
                </div>
  
                <div className="col-sm-3">
                  <div className="video-gallery text-center">
                    <a href="https://www.google.com/">
                      <div className="iframe-img">
                        <img src={iframe2} alt="" />
                      </div>
                      <div className="overlay-icon">
                        <i className="fa fa-play-circle-o"></i>
                      </div>
                    </a>
                    <p>Circle of Hands</p>
                    <h2>24 DEC 2014</h2>
                  </div>
                </div>
  
                <div className="col-sm-3">
                  <div className="video-gallery text-center">
                    <a href="https://www.google.com/">
                      <div className="iframe-img">
                        <img src={iframe3} alt="" />
                      </div>
                      <div className="overlay-icon">
                        <i className="fa fa-play-circle-o"></i>
                      </div>
                    </a>
                    <p>Circle of Hands</p>
                    <h2>24 DEC 2014</h2>
                  </div>
                </div>
  
                <div className="col-sm-3">
                  <div className="video-gallery text-center">
                    <a href="https://www.google.com/">
                      <div className="iframe-img">
                        <img src={iframe4} alt="" />
                      </div>
                      <div className="overlay-icon">
                        <i className="fa fa-play-circle-o"></i>
                      </div>
                    </a>
                    <p>Circle of Hands</p>
                    <h2>24 DEC 2014</h2>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="address">
                  <img src="images/home/map.png" alt="" />
                  <p>505 S Atlantic Ave Virginia Beach, VA(Virginia)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="footer-widget">
          <div className="container">
            <div className="row">
              <div className="col-sm-2">
                <div className="single-widget">
                  <h2>Service</h2>
                  <ul className="nav nav-pills nav-stacked">
                    <li>
                      <a href="https://www.google.com/">Online Help</a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">Contact Us</a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">Order Status</a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">Change Location</a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">FAQ’s</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="single-widget">
                  <h2>Quock Shop</h2>
                  <ul className="nav nav-pills nav-stacked">
                    <li>
                      <a href="https://www.google.com/">T-Shirt</a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">Mens</a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">Womens</a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">Gift Cards</a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">Shoes</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="single-widget">
                  <h2>Policies</h2>
                  <ul className="nav nav-pills nav-stacked">
                    <li>
                      <a href="https://www.google.com/">Terms of Use</a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">Privecy Policy</a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">Refund Policy</a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">Billing System</a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">Ticket System</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="single-widget">
                  <h2>About Shopper</h2>
                  <ul className="nav nav-pills nav-stacked">
                    <li>
                      <a href="https://www.google.com/">Company Information</a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">Careers</a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">Store Location</a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">Affillate Program</a>
                    </li>
                    <li>
                      <a href="https://www.google.com/">Copyright</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3 col-sm-offset-1">
                <div className="single-widget">
                  <h2>About Shopper</h2>
                  <form action="https://www.google.com/" className="searchform">
                    {/* <input type="text" placeholder="Your email address" /> */}
                    <button type="submit" className="btn btn-default">
                      <i className="fa fa-arrow-circle-o-right"></i>
                    </button>
                    <p>
                      Get the most recent updates from <br />
                      our site and be updated your self...
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <p className="pull-left">
                Copyright © 2013 E-SHOPPER Inc. All rights reserved.
              </p>
              <p className="pull-right">
                Designed by{" "}
                <span>
                  <a href="http://www.themeum.com">Themeum</a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  