import ResponsiveAppBar from "../Extras/Header/navBar";
import CartGrid from "./CartGrid";
import OrderSummary from "./OrderSummary";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getCart } from "../../state/action-creators";
import { useDispatch } from "react-redux";

export default function Menu() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Login.items);
  const cartItems = useSelector((state) => state.Cart.items);
  const vendor = localStorage.getItem("vendor");
  const [isAuthenticated, setisAuthenticated] = useState(true);
  useEffect(() => {
    if (user.length === 0 && !localStorage.getItem("user")) {
      setisAuthenticated(false);
    }
  }, [user]);
  useEffect(() => {
    if (user && user.customer)
      dispatch(getCart(user.customer[3]));
  }, [dispatch, user])
  return (
    <div>
      <ResponsiveAppBar />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <CartGrid
            isAuthenticated={isAuthenticated}
            vendor={vendor}
            cartItems={cartItems}
          />
        </Grid>
        <Grid item xs={4}>
          <OrderSummary
            isAuthenticated={isAuthenticated}
            address={user && user.customer && user.customer[3]}
            cartItems={cartItems}
            vendor={vendor}
          />
        </Grid>
      </Grid>
    </div>
  );
}
