import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Header = ({ openSidebar, setOpenSidebar,connectWallet }) => {
  const[user,setUser]=useState(" ")

  useEffect(()=>{

  },[])

  return (
    <div className="header-camp flex">
      <div className="wrapWidth wrap flex items-center">
        <div className="left flex items-center">
          <Link to={"/"}>
            <img src="./images/logo.svg" className="logo-img cursor-pointer" />
          </Link>
        </div>
        <div className="right flex items-center justify-end">
          {/* <div className="items flex items-center">
            <div className="item-lbl">Home</div>
            <div className="item-lbl">Roadmap</div>
            <div className="item-lbl">Tokenomics</div>
            <div className="item-lbl">Roadmap</div>
            <div className="item-lbl">Whitepaper</div>
          </div> */}
          <div className="action flex items-center">
            <div className="btn button" onClick={()=>setUser(connectWallet)}>{user==" "?("Connect Wallet"):(user)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
