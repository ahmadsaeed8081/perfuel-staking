/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./css/App.scss";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { InvestABI,InvestAddress,stakeToken_address,stakeABI} from "./config";

import Main from "./Pages/Main";

import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider);

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openUserSidebar, setOpenUserSidebar] = useState(false);

  var activeUser = localStorage.getItem("_user");


  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      {/* <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} connectWallet={connectWallet} /> */}
      <Routes>
        <Route path="/" element={<Main />} exact />
      </Routes>
      {/* <Footer /> */}
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
