import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./BestSeller.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getBestSeller, AddToCart } from "../../../../state/action-creators/index";
import Swal from 'sweetalert2'
export default function BestSeller() {
  const dispatch = useDispatch();
  const bestSeller = useSelector((state) => state.bestSeller);
  const user = useSelector((state) => state.Login.items)
  const status = useSelector((state) => state.AddToCart)
  useEffect(() => {
  }, [user]);
  useEffect(() => {
    dispatch(getBestSeller());
  }, []);
  const addToCart = (data) => {
    if (user && user.customer && user.customer[3]) {
      dispatch(AddToCart(user && user.customer && user.customer[3], data[1], data[2], data[3], data[4]));
      if (status && status.items && status.items.status === 'success') {
        Swal.fire({
          title: 'Added!',
          icon: "success",
          showConfirmButton: false
        })
      }
      else {
        Swal.fire({
          title: 'Opps...',
          type: 'error',
          showConfirmButton: false
        })
      }
    }
    else
      window.location.href = "../login";
  }
  return (
    <div className="content">
      {bestSeller.items.map((el) => {
        return (
          <Card className="BestSeller__card" key={el[0]}>
            <CardMedia
              component="img"
              alt="Food"
              style={{ objectFit: 'cover' }}
              height="150"
              image={el[4]}
            />
            <CardContent sx={{ height: 100 }}>
              <Typography gutterBottom variant="h8" component="div">
                {el[3] && el[3].toUpperCase()} | {el[1] && el[1].charAt(0).toUpperCase() + el[1].slice(1)}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button sx={{ color: "#7c2e41" }}>Rs. {el[2]}</Button>
              <Button
                variant="contained"
                sx={{
                  ":hover": { backgroundColor: "#7c2e41" },
                  backgroundColor: "#7c2e41",
                }}
                onClick={() => addToCart(el)}
              >
                Add To Cart
              </Button>
            </CardActions>
          </Card>
        );
      })}
      {bestSeller.error !== null && bestSeller.items.length === 0 && (
        <Typography
          sx={{ color: "red", m: 5, fontSize: "24px", width: "100%" }}
          align="center"
        >
          Unable to fetch items.
        </Typography>
      )}
    </div>
  );
}
