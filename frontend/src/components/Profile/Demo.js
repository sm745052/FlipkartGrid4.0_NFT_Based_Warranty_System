import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import "./styles.css";
import { useSelector } from "react-redux";
import baseUrl from '../../state/urls'
import { PurchaseHistory } from "../../state/action-creators";

export default function Demo() {
  const user = useSelector((state) => state.Login.items.customer);

  return (
    <Box
      sx={{
        width: "80%",
        height: "350px",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        bgcolor: "background.paper",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: 1,
        fontWeight: "bold",
        marginLeft: "135px",
      }}
    >
      <Box
        component="img"
        sx={{
          height: 250,
          width: 250,
          marginLeft: "20px",
          borderRadius: "50%",
        }}
        alt="The house from the offer."
        src={require("../images/avatar-placeholder.png")}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          m: 3,
          marginLeft: "120px",
          minWidth: { md: 350 },
        }}
      >
        <Box component="span" sx={{ fontSize: 22, mt: 1 }}>
          Name: <span className="detail">{user && user.full_name}</span>
        </Box>
        <Box component="span" sx={{ fontSize: 22, mt: 1 }}>
          Phone Number: <span className="detail">{user && user.phone}</span>
        </Box>
        <Box component="span" sx={{ fontSize: 22, mt: 1 }}>
          Email Id: <span className="detail">{user && user[1]}</span>
        </Box>
        <Box component="span" sx={{ fontSize: 22, mt: 1 }}>
          Address: <span className="detail">{user && user.street}</span>
        </Box>
        <Box component="span" sx={{ fontSize: 22, mt: 1 }}>
          Wallet Address: <span className="detail">{user && user[3]}</span>
        </Box>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}><Button
          variant="contained"
          sx={{
            width: 150,
            ":hover": { backgroundColor: "#7c2e41" },
            backgroundColor: "#7c2e41",
          }}
        >
          Edit
        </Button>
        </div>
      </Box>
    </Box>
  );
}
