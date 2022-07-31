import React, { useState, useEffect } from "react";
import CardActions from "@mui/material/CardActions";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./OrderCard.css";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  CardHeader,
  Button,
  Input,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Approval } from "../../../state/action-creators";
export default function OrderCard(props) {
  const dispatch = useDispatch();
  const brand = useSelector((state) => state.brandLogin.items);
  const [err, setErr] = useState("");
  const [brandEmail, setBrandEmail] = useState("");
  const [data, setdata] = useState([]);
  useEffect(() => {
    if (brand && brand.brand_obj) {
      setBrandEmail(brand.brand_obj[1]);
      getData(brand.brand_obj[4])
    }
  }, [brand])
  const getData = async (val) => {
    const res = await fetch(`http://18.237.181.199:5000/brand/getOrders`, {
      method: "POST",
      body: JSON.stringify({ 'account_address': val }),
      headers: { 'Content-type': 'application/json' }
    })
    const datax = await res.json();
    var list = [];
    for (var i = 0; i < datax.length; i++) {
      var obj = {};
      obj["OrderId"] = datax[i][0];
      obj["price"] = datax[i][5];
      obj["brand"] = datax[i][3];
      obj["product"] = datax[i][4];
      obj["status"] = datax[i][6];
      obj["account_address"] = datax[i][2]
      obj["warrantyPeriod"] = "";
      obj["sl"] = "";
      list.push(obj);
    }
    list.sort(function (a, b) {
      if (a.OrderId > b.OrderId) return 1;
      if (a.OrderId < b.OrderId) return -1;
      return 0;
    });
    setdata(list);
  }
  const handleChange = (e, i) => {
    const { value, name } = e.target;
    const newState = [...data];
    newState[i] = {
      ...newState[i],
      [name]: value
    };
    setdata(newState);
  };
  const sendOrder = (account_address, OrderId, status, brand, product, sl, warrantyPeriod) => {
    if (status === 'rejected') {
      dispatch(Approval(account_address, OrderId, status, brand, product, brandEmail, sl, warrantyPeriod));
      getData(account_address)
      return;
    }
    if (sl !== "" && warrantyPeriod !== "") {
      dispatch(Approval(account_address, OrderId, status, brand, product, brandEmail, sl, warrantyPeriod));
      getData(account_address)
      props.update();
    }
    else {
      setErr("Please fill details for approval");
    }
  }
  return (
    <div className="content" sx={{ display: "flex", flexWrap: "wrap" }}>
      {data.map((el, index) => {
        return (
          <>
            <TableContainer TableContainer
              component={Paper}
              sx={{
                margin: 5,
                width: 350,
                padding: 3,
              }}
            >
              <CardHeader
                title={`Order Summary ${el.OrderId}`}
                sx={{ color: "#7c2e41", textAlign: "center" }}
              />
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Rs.</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                    key={index}
                  >
                    <TableCell component="th" scope="row">
                      {el.brand && el.brand.toUpperCase()} | {el.product}
                    </TableCell>
                    <TableCell align="right">{1}</TableCell>
                    <TableCell align="right">
                      {parseFloat(1 * el.price).toFixed(2)}
                    </TableCell>
                  </TableRow>

                </TableBody>
              </Table>
              <CardActions sx={{ justifyContent: "center" }}>
                <FormGroup>
                  {el.status !== "waiting for blockchain confirmation" && el.status !== "approved" && el.status !== "rejected" ? <FormControlLabel
                    control={
                      <div key={index}>
                        <div style={{ display: 'flex', justifyContent: "space-evenly", flexDirection: "row" }}>
                          <div ><Input name="sl" value={el.sl} onChange={(e) => handleChange(e, index)} placeholder="Serial Number" />
                            <Input name="warrantyPeriod" type="number" value={el.warrantyPeriod} onChange={(e) => handleChange(e, index)} placeholder="Warranty Period" />
                          </div>
                          <div>
                            <Button onClick={() => sendOrder(el.account_address, el.OrderId, "approved", el.brand, el.product, el.sl, el.warrantyPeriod)}>Approve</Button>
                            <Button onClick={() => sendOrder(el.account_address, el.OrderId, "rejected", el.brand, el.product, el.sl, el.warrantyPeriod)}>Reject</Button>
                          </div>
                        </div>
                        <p style={{ textAlign: "center", color: "red" }}>{err}</p>
                      </div>
                    }
                  /> : <>
                    <p>{el.status}</p>
                  </>}
                </FormGroup>
              </CardActions>
            </TableContainer>
          </>
        );
      })}
    </div >
  );
}
