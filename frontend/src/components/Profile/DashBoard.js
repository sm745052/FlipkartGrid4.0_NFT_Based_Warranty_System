import React, { useEffect } from "react";
import CustomizedTables from "./CustomizedTables";
import Navbar from "../Extras/Header/navBar";
import Demo from "./Demo";
import Footer from "../Extras/Footer/Footer";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import OrderStatus from "./OrderStatus";
import MyTokens from './MyTokens'
import TransferNFT from "./TransferNFT";
import TransferHistory from './TransferHistory'
import { useState } from "react";
function DashBoard(props) {
  const user = useSelector((state) => state.Login.items);
  const history = useHistory();
  useEffect(() => {
    if (user.length === 0 && !localStorage.getItem("user")) {
      history.push("/Login");
    }
  }, [user]);

  const [key, setKey] = useState(1);
  const update = () => {
    setKey(2)
  }
  return (
    <>
      <Navbar />
      <br />
      <br />
      <Demo />
      <br />
      <br />
      <h3 style={{ textAlign: 'center', color: '#7C2E41' }}>Purchase History</h3>
      <CustomizedTables key={key} />
      <br />
      <h3 style={{ textAlign: 'center', color: '#7C2E41' }}>Orders</h3>
      <OrderStatus key={key} />
      <br />
      <h3 style={{ textAlign: 'center', color: '#7C2E41' }}>NFT Details</h3>
      <MyTokens />
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <TransferNFT update={update} />
        <TransferHistory />
      </div>
      <Footer />
    </>
  );
}

export default DashBoard;
