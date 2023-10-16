import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import{BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './components/Home';
import BlogIndex from './components/Blog/Index';
import MemberIndex from './components/Member/index';
import AccountIndex from './components/Account/index';
import Detail from './components/Blog/Detail';
import ProductIndex from "./components/Product/ProductIndex"
import MyProducts from './components/Product/MyProducts/MyProducts';
import EditProduct from './components/Product/EditProduct/EditProduct';
import ProductDetail from './components/Product/ProductDetail/ProductDetail';
import Cart from './components/ShoppingCart/Cart';
import WishlistIndex from './components/Wishlist/WishlistIndex';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path="/" element={<Home/>} />
          <Route path='/blog/index' element={<BlogIndex/>} />
          <Route path='/blog/detail/:id' element={<Detail/>} />
          <Route path='/account/index' element={<AccountIndex/>} />
          <Route path='/member/index' element={<MemberIndex/>} />
          <Route path='/product/productIndex' element={<ProductIndex/>} />
          <Route path='/product/myProducts' element={<MyProducts/>} />
          <Route path='/product/editProduct/:id' element={<EditProduct/>} />
          <Route path='/product/detail/:id' element={<ProductDetail/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/wishlist' element={<WishlistIndex/>} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
