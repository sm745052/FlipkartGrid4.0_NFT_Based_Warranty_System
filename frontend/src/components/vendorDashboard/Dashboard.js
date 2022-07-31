import React, { useEffect, useState } from "react";
import Navbar from "../Extras/Header/navBar";
import OrderCard from "./Cards/OrderCard";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetBrandOrder } from "../../state/action-creators";
import CheckProduct from "./CheckProduct";
import ShowWarrantyData from './ShowWarrantyData'
import WarrantyDataTable from './WarrantyDataTable'
function Dashboard(props) {
  const brand = useSelector((state) => state.brandLogin.items);
  const history = useHistory();
  const orders = useSelector((state) => state.getBrandOrder.items);
  const [rowData, setRowData] = useState([]);
  const user = useSelector(state => state.user);
  useEffect(() => {
    // do stuff     
  }, [orders]);
  useEffect(() => {
    if (brand.length === 0 && !localStorage.getItem("brand")) {
      history.push("/Vendor/Login");
    }
  }, [brand]);
  const dataFnc = (rows) => {
    setRowData(rows);
  }
  const [key, setKey] = useState(1)
  const update = () => {
    setKey(2)
  }
  return (
    <>
      <Navbar />
      <br />
      <br />
      <h4 style={{ textAlign: "center" }}>Wallet Address:{brand && brand.brand_obj && brand.brand_obj[4]}</h4>
      <OrderCard update={update} key={key} />
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <CheckProduct />
        <ShowWarrantyData fnc={dataFnc} />
      </div>
      <WarrantyDataTable data={rowData} />
      <br />
      <br />
    </>
  );
}

export default Dashboard;
