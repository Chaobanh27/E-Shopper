import React, { useState } from 'react';
import './App.css';
import MenuLeftAcc from './components/Account/MenuLeftAcc/MenuLeftAcc';
import Footer from './components/Footer';
import Header from './components/Header';
import MenuLeft from './components/MenuLeft';
import { useLocation } from 'react-router-dom';
import { DataContext } from './components/MyContext';


function App(props) {
  let params1 = useLocation()
  
  const [tongQty,setTongQty] = useState(0)
  const [totalWish,setTotalWish] = useState(0)

  function getQty(data){
    //console.log(data)
    setTongQty(data)
  }

  function getWishQty(data){
    //console.log(data)
    setTotalWish(data)
  }

  function renderMenuLeft(){
    if(params1["pathname"].includes("account") || params1["pathname"].includes("product") || params1["pathname"].includes("myProducts")){
      return <MenuLeftAcc/>
    }
    else if(params1["pathname"].includes("cart")){
      return null
    }
    else{
      return <MenuLeft/> 
    }
  }


  return (
    <>
    <DataContext.Provider value={
      {tongQty:tongQty,getQty:getQty,totalWish:totalWish,getWishQty:getWishQty}
    }  >
      <Header/>
          <section>
              <div className='container'>
                <div className='row' >
                  {renderMenuLeft()}
                  {props.children}
                </div>
              </div>
          </section>
          <Footer/>
    </DataContext.Provider>


    </>
  );
}

export default App;
