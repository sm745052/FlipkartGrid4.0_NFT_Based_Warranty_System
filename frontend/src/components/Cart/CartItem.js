import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function ProductItem({
  isAuthenticated,
  addItemToCart,
  cartItems,
  vendor
}) {
  return (
    <>
      {cartItems && cartItems.map((product, index) => {
        return (
          <Card
            sx={{ display: "flex", paddingInline: 2, margin: 5, height: 250 }}
            key={index}
          >
            <CardMedia
              component="img"
              sx={{
                width: 350,
                height: 200,
                minWidth: 350,
                borderRadius: 3,
                alignSelf: "center",
              }}
              image={product[5]}
              alt="Live from space album cover"
            />
            <CardContent
              sx={{
                width: 350,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                paddingInline: 10,
              }}
            >
              <Typography
                variant="h6"
                color="text.primary"
                component="div"
                sx={{ textAlign: "center" }}
              >
                {product[2].toUpperCase()} | {product[3].toUpperCase()}
              </Typography>
              <Typography variant="h6" color="text.primary" component="div">
                Rs. {product[4]}
              </Typography>
            </CardContent>
            {(isAuthenticated || vendor !== null) && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  paddingInline: 2,
                }}
              >
              </Box>
            )}
          </Card>
        );
      })}
    </>
  );
}
