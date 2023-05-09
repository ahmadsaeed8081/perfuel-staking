import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import Select from "react-select";
import DropDownIcon from "../assets/DropDownIcon";
import Web3 from "web3";
// import Time from "../components/Countdown/CountDown"

import { InvestABI,InvestAddress,stakeToken_address,stakeABI} from "../config";
// import CountDown from "../components/Countdown/CountDown";
import { defaultStyles } from "react-modal";

const Main = () => {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);


  const [investment, setInvestment] = useState(false);

  const [_address, setAddress] = useState(null);
  const [isWalletConnected, setisWalletConnected] = useState(false);
  const [IDs, setNetworkID] = useState(false);

  const [totlaInvestment, setTotalInvestment] = useState(0);
  const [totalReward, setwithrawableAmount] = useState("0");
  const [ref_data, set_Ref_data] = useState("0");
  const [ref_data1, set_Ref_data1] = useState("0");
  const [balance, setBalance] = useState(0);


  const [totalbusiness, setbusiness] = useState("0");
  const [total_investors, set_total_investors] = useState("0");
  const [maxStake, setmaxStake] = useState("0");

  const [totalReferrals, settotalReferrals] = useState(0);
  const [total_withdraw_reward, set_total_withdraw_reward] = useState("0");
  const [curr_time, set_curr_time] = useState(0);
  const [allInvestments, set_investmentList] = useState([]);
  const [deadline, set_deadline] = useState(0);
  const [x, set_x] = useState("");
  const [y, set_y] = useState(0);





  // var deadline;

    const [state, setState] = useState({
        days: 0,
        minutes: 0,
        hours: 0,
        seconds: 0,
        time_up: "",
        // bid_time: selectedAmount,
    })
    useEffect(() => {
        console.log("raja g  ");
        start();
        if(selectedAmount){
          console.log("helllooo "+selectedAmount);
          set_deadline(selectedAmount[1] * 1000);
          // if(deadline!=null){
            count(selectedAmount[1] * 1000);

          // }
          // clearInterval(x);

      //  x = setInterval(count(selectedAmount[1] * 1000), 1000);


        }
    }, [selectedAmount])

  

    const count = (_deadline=deadline) => {
        var now = new Date().getTime();
        var t = _deadline - now;
        console.log(" its count "+_deadline+ "   "+now+"   "+t);
        // console.log(deadline)
        var dd = Math.floor(t / (1000 * 60 * 60 * 24));
        var hh = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var mm = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var ss = Math.floor((t % (1000 * 60)) / 1000);

        var days = dd < 10 ? "0" + dd : dd;
        var hours = hh < 10 ? "0" + hh : hh;
        var minutes = mm < 10 ? "0" + mm : mm;
        var seconds = ss < 10 ? "0" + ss : ss;

        setState({ days, minutes, hours, seconds });
        console.log("innu8ni "+dd)

        if (t < 0) {

            setState({
                days: 0,
                minutes: 0,
                hours: 0,
                seconds: 0,
                time_up: "TIME IS UP",
            });
            console.log("interval end");
            clearInterval(x);
            // var today = new Date();
            // today.setDate(today.getDate(Date) + 2);
            // deadline = today.getTime(Date);
            // return
        }
    }
 



  const amountList = [
    { numb: "65,000", days: "11 Days Left" },
    { numb: "66,000",  days: "15 Days Left" },
    { numb: "67,000",  days: "11 Days Left" },
    { numb: "68,000",days: "11 Days Left" },
  ];
  const [selectedTab, setSelectedTab] = useState({
    name: "STAKE",
    slug: "STAKE SMC",
  });
  const optionsList = [
    { name: "STAKE", slug: "STAKE SMC" },
    { name: "UNSTAKE", slug: "UNSTAKE" },
    { name: "REWARD", slug: "Reward" },
  ];

//   useEffect(() => {
//     start();
// console.log("reloaded "+ selectedTab.name);
//     document.addEventListener("click", () => {
//       setHide(false);
      
      
//     });
//   }, [selectedAmount]);

//    useEffect(() => {
//     start();

//     document.addEventListener("click", () => {
//       setHide(false);
//     });
//   }, [selectedAmount]);

  const CHAIN_ID = "80001";
  const CHAIN_ID1 = "0x13881";

  async function connectWallet() {
    if (!window.ethereum) {
      alert(
        "it looks like that you dont have metamask installed,please install"
      );
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const networkId = await window.ethereum.request({
        method: "net_version",
      });
      setNetworkID(networkId);
      console.log(
        "id from async func is: " + CHAIN_ID + "hellggg " + networkId.toString()
      );

      // console.log(IDs)
      if (networkId == CHAIN_ID) {
        setisWalletConnected(true);
        console.log("its in net" + isWalletConnected);

        setAddress(window.ethereum.selectedAddress);
        mount();
        // return accounts[0].toString();
      } else {
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CHAIN_ID1 }],
        });
      }
    } catch (err) {
      alert("Something went wrong.");
    }
  }


  // setInterval(() => {
  //   if(isWalletConnected)
  //   {
  //     console.log('This will run every second!');
  //     set_x(count(deadline));

  //   }

  // }, 10000);




  async function start() {
    try {
      // Get network provider and web3 instance.
      const web3 = new Web3(window.ethereum);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      const contract = new web3.eth.Contract(InvestABI, InvestAddress);
      console.log("hello brosswews");

      const total_inv = await contract.methods.totalDUSDInvestors().call(); //get stake

        const business = await contract.methods.totalbusiness().call();
        const curr_time = await contract.methods.get_currTime().call();


 


   
      set_total_investors(total_inv);
      set_curr_time(curr_time);
      setbusiness(business);
 
   

    } catch (error) {
      // Catch any errors for any of the above operations.

      console.error(error);
    }
  }



  async function unStake() {
    if (isWalletConnected) {
      try {
        let web3;
        // Get network provider and web3 instance.
        if (window.ethereum) {
          web3 = new Web3(window.ethereum);
          const id = await window.ethereum.request({ method: "eth_chainId" });
          console.log("id from async func is: " + id);
          if (CHAIN_ID1 != id.toString()) {
            alert("please change your network to binance");
            return;
          }
        } else {
          alert(
            "its look like you dont have metmask extension installed in you browser"
          );
          return;
        }
        if (selectedAmount[0] == 0) {
          alert("you dont have staked tokens");
          return;
        }

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        // const tokenContract = tokenContractAddress;
        //const investContract = InvestAddress;

        const contract = new web3.eth.Contract(InvestABI, InvestAddress);
console.log("ijinknunu"+selectedAmount[3]);
        const result = await contract.methods
          .unStake(selectedAmount[3])
          .send({ from: accounts[0] });
        if (result) {
          mount();       
         }
      } catch (error) {
        // Catch any errors for any of the above operations.
        // alert(
        //   `Failed to load web3, accounts, or contract. Check console for details.`
        // );
        console.error(error);
      }
    } else {
      alert("kindly connect your wallet");
    }
  }



  async function GetReward() {
    try {
      console.log("hello mount");
      // Get network provider and web3 instance.
      const web3 = new Web3(window.ethereum);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();


      const contract = new web3.eth.Contract(InvestABI, InvestAddress);
      let totalReward = await contract.methods
        .getReward()
        .call({ from: accounts[0].toString() });

 

    
//  console.log(allInvestments[0][1]+" this is it");
      const contract1 = new web3.eth.Contract(stakeABI, stakeToken_address);

      let balance = await contract1.methods.balanceOf(accounts[0]).call();
      console.log("edsf "+balance);



      const total_inv = await contract.methods.totalDUSDInvestors().call(); //get stake
      const totalInvest = await contract.methods
        .getTotalInvestmentDUSD()
        .call({ from: accounts[0].toString() });

        const total_withdraw_reward = await contract.methods
        .total_withdraw_reaward()
        .call({ from: accounts[0].toString() });
        



        const business = await contract.methods
        .totalbusiness()
        .call();
 
      totalReward = web3.utils.fromWei(totalReward, "ether");
      balance = web3.utils.fromWei(balance, "ether");
      
      try{
        // var x =selectedAmount[1];
        // count(deadline);
      }
      catch{

      }

      console.log("hiiii" + balance);

      setTotalInvestment(totalInvest);
      setwithrawableAmount(parseFloat(totalReward).toFixed(2));
      // setminStake(min_stake);
      // setmaxStake(max_stake)
      set_total_investors(total_inv);
      setBalance(parseFloat(balance).toFixed(2));
      setAddress(window.ethereum.selectedAddress);
      setbusiness(business);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      //this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.

      console.error(error);
    }
  }

  if(isWalletConnected){
    var y1=setInterval(GetReward,1000);
    // set_x(y1);

  }




  async function mount() {
    try {
      console.log("hello mount");
      // Get network provider and web3 instance.
      const web3 = new Web3(window.ethereum);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      // const tokenContract = tokenContractAddress;
      //const investContract = InvestAddress;

      const contract = new web3.eth.Contract(InvestABI, InvestAddress);
      let totalReward = await contract.methods
        .getReward()
        .call({ from: accounts[0].toString() });

        let allInvestments = await contract.methods
        .getAllDUSDinvestments()
        .call({ from: accounts[0].toString() });
        console.log("hello bro   "+allInvestments);

        const array=allInvestments.map((row)=>{

          if(!row[5]){
            return{
              "numb":row[0],
              "days":row[1],
              "num":row[3]
  
            } ;
          }

        })
        console.log("hello janu");

        set_investmentList(allInvestments);
        setSelectedAmount(allInvestments[0]);
//  console.log(allInvestments[0][1]+" this is it");
      const contract1 = new web3.eth.Contract(stakeABI, stakeToken_address);

      let balance = await contract1.methods.balanceOf(accounts[0]).call();
      console.log("edsf "+balance);

      const ref_from = await contract.methods
        .DUSDinvestor(accounts[0].toString())
        .call();

      const total_inv = await contract.methods.totalDUSDInvestors().call(); //get stake
      const totalInvest = await contract.methods
        .getTotalInvestmentDUSD()
        .call({ from: accounts[0].toString() });

        let total_withdraw_reward = await contract.methods
        .total_withdraw_reaward()
        .call({ from: accounts[0].toString() });
        
        total_withdraw_reward = web3.utils.fromWei(total_withdraw_reward, "ether");



        const business = await contract.methods
        .totalbusiness()
        .call();
      const totalReferral = await contract.methods
        .DUSDTotalReferrals()
        .call({ from: accounts[0].toString() });
      // balance = balance/10**8;
      totalReward = web3.utils.fromWei(totalReward, "ether");
      balance = web3.utils.fromWei(balance, "ether");
      try{
        set_deadline(allInvestments[0][1]* 1000);
        count(allInvestments[0][1]* 1000)

      }
      catch{

      }
      
     
      console.log("hiiii" + balance);

      setTotalInvestment(totalInvest);
      setwithrawableAmount(parseFloat(totalReward).toFixed(2));
      // setminStake(min_stake);
      // setmaxStake(max_stake)
      set_total_investors(total_inv);
      setBalance(parseFloat(balance).toFixed(2));
      setisWalletConnected(true);
      setAddress(window.ethereum.selectedAddress);
      setbusiness(business);
      set_total_withdraw_reward(parseFloat(total_withdraw_reward).toFixed(2));

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      //this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.

      console.error(error);
    }
  }


  async function Max() {
    if (isWalletConnected) {
      try {
        let web3;
        // Get network provider and web3 instance.
        if (window.ethereum) {
          web3 = new Web3(window.ethereum);
          const id = await window.ethereum.request({ method: "eth_chainId" });
          console.log("id from async func is: " + id);
          if (CHAIN_ID1 != id.toString()) {
            alert("please change your network to binance smart chain");
            return;
          }
        } else {
          alert(
            "its look like you dont have metmask extension installed in you browser"
          );
          return;
        }

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        // const tokenContract = tokenContractAddress;
        //const investContract = InvestAddress;

        const contract = new web3.eth.Contract(stakeABI, stakeToken_address);

        let balance = await contract.methods.balanceOf(accounts[0]).call();
        if (balance == 0) {
          alert("you dont have SMC tokens to stake ");
        } else {
          balance = balance / 10 ** 18;
          setInvestment(balance);
        }
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    } else {
      alert("kindly connect your wallet");
    }
  }




  async function stake() {
    if(!isWalletConnected)
    {
      alert("kindly connect your wallet")
      return;
    }
    if (investment > 0) {
      try {
        let web3;
        // Get network provider and web3 instance.
        if (window.ethereum) {
          web3 = new Web3(window.ethereum);
          const id = await window.ethereum.request({ method: "eth_chainId" });
          console.log(
            "id from async func is: " + CHAIN_ID + "hello" + id.toString()
          );
          if (CHAIN_ID1 != id.toString()) {
            console.log("done");
            alert("please change your network to binance smart chain");
            return;
          }
        } else {
          alert(
            "its look like you dont have metmask extension installed in you browser"
          );
          return;
        }

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        // const tokenContract = tokenContractAddress;
        //const investContract = InvestAddress;

        const contractStake = new web3.eth.Contract(
          stakeABI,
          stakeToken_address
        );
        const temp=web3.utils.toWei(investment.toString(),"ether");
        let balance = await contractStake.methods
          .approve(InvestAddress, temp)
          .send({ from: accounts[0] });
          const contract = new web3.eth.Contract(InvestABI, InvestAddress);
          const result = await contract.methods
            .Stake(investment)
            .send({ from: accounts[0] });
          if (result) {
            alert("Your investment is successfully done");
            mount();
          }
      
        
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    } else if (investment <= 0 || investment == "") {
      alert("please write amount ");
    }
  }
try
{
  window.ethereum.on("chainChanged", hello);
  window.ethereum.on("accountsChanged", hello);

}catch{

}


 

  function hello() {
    window.location.reload();
  }

  async function WithdrawReward() {
 
    try {

      if(!isWalletConnected)
      {
        alert("kindly connect your wallet")
        return;
      }
      let web3;
      // Get network provider and web3 instance.
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        const id = await window.ethereum.request({ method: "eth_chainId" });
        console.log("id from async func is: " + id);
        if (CHAIN_ID1 != id.toString()) {
          alert("please change your network to Ropsten");
          return;
        }
      } else {
        alert(
          "its look like you dont have metmask extension installed in you browser"
        );
        return;
      }
      if(totalReward<=0)
      {
        alert("you dont have reward to withdraw");
        return;
      }

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      // const tokenContract = tokenContractAddress;
      //const investContract = InvestAddress;

      const contract = new web3.eth.Contract(InvestABI, InvestAddress);

      const result = await contract.methods
        .withdrawReward()
        .send({ from: accounts[0] });
      if (result) {
        alert("your investment is successfully done");
        mount();
      }
    } catch (error) {

      console.error(error);
    }
  }


  if(selectedAmount!=null){
    //   console.log("helllooo "+selectedAmount);
    //  deadline = s[1] * 1000;
    //  count();
    console.log("papu  "+deadline);
  //  let y= setInterval(count(deadline), 1000);
  //  set_x(y);


  }


  return (
    <div>
    <div className="header-camp flex">
      <div className="wrapWidth wrap flex items-center">
      <div className="left flex items-center">
            <Link to={"/"}>
              <img
                src="./images/logo.svg"
                className="logo-img cursor-pointer"
              />
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
            <div className="btn button" onClick={connectWallet}>{_address==null?("Connect Wallet"):(_address.slice(0,4)+"..."+_address.slice(39,42))}</div>
          </div>
        </div>
      </div>
    </div>

    <div className="home-page flex flex-col rel">
        <div className="overlay-bg abs"></div>
        <div className="overlay flex  ">
          <video
            autoPlay
            className={`bg-img`}
            muted
            title="Video Preview"
            // src="./images/bg.mp4"
            loop
          />
        </div>
    
    <div className="home-page flex flex-col">
      <div className="hero-sec flex ">
        <div className="wrap wrapWidth flex justify-center">
          <div className="_block flex items-center">
            <div className="left-side flex ">
              <div className="box flex flex-col">
                <div className="box-tag">STATS </div>
                <div className="meta-block">
                  <div className="meta-item flex flex-col items-start justify-center">
                    <div className="lbl">Total Staked Perfuel</div>
                    <div className="val">{totalbusiness} </div>
                  </div>
                  <div className="meta-item flex flex-col items-start justify-center">
                    <div className="lbl">APY</div>
                    <div className="val">6%</div>
                  </div>
                  <div className="meta-item flex flex-col items-start justify-center">
                    <div className="lbl">No. Of Stakers</div>
                    <div className="val">{total_investors}</div>
                  </div>
                  <div className="meta-item flex flex-col items-start justify-center">
                    <div className="lbl">My Staked Perfuel</div>
                    <div className="val">{totlaInvestment}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-side flex flex-col">
              <div className="options-tabs">
                {optionsList.map((item, index) => (
                  <div
                    key={index}
                    className={`btn ${
                      item.name === selectedTab.name ? "active" : ""
                    }`}
                    onClick={(e) => setSelectedTab(item)}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              <div className="box flex flex-col">
                <div className="box-tag">{selectedTab?.slug}</div>
                <div className="selection-block flex">
                  {selectedTab.name === "STAKE" ? (
                    <div className="stack_block flex flex-col">
                      <div className="input-field flex flex-col">
                        <div className="input-hdr flex items-center justify-between">
                          <div className="i-tag">Staking Amount</div>
                          <div className="i-val">
                            <span>Balance:</span> {balance+" PRF"}
                          </div>
                        </div>
                        <div className="input-box flex items-center py-[6px] px-2">
                          <input
                            type="number"
                            value={investment}
                            min={0}
                            onChange={(e)=>setInvestment(e.target.value)}
                            className="txt cleanbtn"
                          />
                          <div className="input-tags flex items-center">
                            <div className="lbl">PRF</div>
                            <div className="btn-tag cursor-pointer" onClick={Max}>MAX</div>
                          </div>
                        </div>
                        <div className="input-hdr flex items-center justify-between">
                          <div className="i-tag"></div>
                          <div className="i-val">
                            
                          </div>
                        </div>
                      </div>
                      {isWalletConnected?(<div className="stack-btn button" onClick={stake}>STAKE PRF NOW</div>):(<div className="stack-btn button" onClick={connectWallet}>Connect Wallet</div>)}
                    </div>
                  ) : selectedTab.name === "UNSTAKE" ? (
                    <div className="stack_block flex flex-col">
                      <div className="input-field flex flex-col">
                        <div className="input-hdr flex items-center justify-between">
                          <div className="i-tag">UnStake Amount</div>
                          <div className="i-val"></div>
                        </div>
                        <div className="dropDown flex aic jc flex-col rel flex-[0.3]">
                          <div className="category flex aic">
                            <div
                              className="cbox cleanbtn flex aic rel pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setHide(!hide);
                              }}
                            >
                              <div className="slt flex aic w-full">
                                <div className="unit-name flex aic font s14 b4 w-full justify-between">
                                  <span
                                    className="unit-eng flex aic s16 b5"
                                    placeholder="Singapore"
                                  >
                                    {selectedAmount
                                      ? selectedAmount[0]
                                      : "0"}
                                  </span>
                                  <span
                                    className="unit-eng flex aic font s14 b4"
                                    placeholder="Singapore"
                                  >
                                    {selectedAmount?.type
                                      ? selectedAmount?.type
                                      : "SMC"}
                                  </span>
                                </div>
                              </div>

                              <div className="icon-arrow flex items-center justify-center">
                                <DropDownIcon />
                              </div>
                            </div>
                          </div>
                          <div
                            className={`block flex aic abs ${
                              hide ? "show" : ""
                            }`}
                          >
                            <div className="manue flex aic col anim">
                              {allInvestments.map((item, index) => (
                                <div
                                  key={index}
                                  className="slt flex aic"
                                  onClick={(e) => {
                                    setHide(!hide);
                                    setSelectedAmount(item);
                                  }}
                                >
                                  <div className="unit-name flex aic font s14 b4 justify-between w-full"  >
                                    <span className="unit-eng flex aic font s16 b5"  >
                                      {item[0]}
                                    </span>
                                    {/* <span className="unit-type flex aic font s14 b4">
                                      {item[1]}
                                    </span> */}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="input-hdr flex items-center justify-between">
                          <div className="i-tag"></div>
                          <div className="i-val">
                                <div  >
      
                <span style={{ color :"yellow" , paddingLeft : 10}} className="text">{state.days}</span>
                <span style={{ color :"white" , paddingLeft :10 }} className="text">Days</span>

        
              <span style={{ color :"yellow", paddingLeft : 10 }} id="hour">{state.hours}</span>
              <span style={{ color :"white" , paddingLeft : 10}} className="text">Hours</span>
       
 
              <span  style={{ color :"yellow" , paddingLeft : 10}} id="minute">{state.minutes}</span>
              <span style={{ color :"white" , paddingLeft : 10}} className="text">Minutes</span>
    

              <span style={{ color :"yellow", paddingLeft : 10 }} id="second">{state.seconds}</span>
              <span style={{ color :"white" , paddingLeft : 10}} className="text">Second</span>
    </div>
                          {/* {selectedAmount?(<CountDown withdrawTime={selectedAmount[1]} />):(<CountDown withdrawTime={0} />)}                             */}
                          {/* <span>Time In UnStake: </span>{selectedAmount?(selectedAmount[1]):("0")} */}
                          </div>
                        </div>
                      </div>
                      {selectedAmount?(Number (curr_time)>Number(selectedAmount[1])?(<div className="stack-btn button" onClick={unStake} >UNSTAKE PRF NOW</div>):( <div className="stack-btn button" style={{ backgroundColor:"gray", border:"0px" }} >UNSTAKE PRF NOW</div> )):( <div className="stack-btn button" onClick={connectWallet} >Connect Wallet</div> 
)}
                   </div>
                  ) : selectedTab.name === "REWARD" ? (
                    <div className="stack_block flex flex-col">
                      <div className="input-field flex flex-col">
                        <div className="input-hdr flex items-center justify-between">
                          <div className="i-tag">Claimable Reward</div>
                          <div className="i-val"></div>
                        </div>
                        <div className="input-box flex items-center py-[12px] px-2">
                          <input
                            type="text"
                            value={totalReward}
                            className="txt cleanbtn"
                          />
                          <div className="input-tags flex items-center">
                            <div className="lbl">Perfuel</div>
                          </div>
                        </div>
                        <div className="input-hdr flex items-center justify-between">
                          <div className="i-tag"></div>
                          <div className="i-val">
                            <span>Claimed Reward:</span> {total_withdraw_reward}
                          </div>
                        </div>
                      </div>
                      {isWalletConnected?( <div className="stack-btn button" onClick={WithdrawReward}>Claim Reward Now</div>):(                      <div className="stack-btn button" onClick={connectWallet}>Connect Wallet</div>
)}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        {/* <SelectToken setOpen={setOpen} setSelectedToken={setSelectedToken} /> */}
      </Modal>
    </div>
    </div>
    </div>
  );
};

export default Main;
