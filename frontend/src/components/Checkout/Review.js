import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
export default function Review() {
  const vendor = localStorage.getItem('vendor')
  const customer = localStorage.getItem('customer')
  const products = JSON.parse(localStorage.getItem("cart"));
  var TotalCost = products.reduce((a, b) => parseInt(a.price) + parseInt(b.price));
  if (Number.isNaN(parseInt(TotalCost))) {
    TotalCost = TotalCost.price;
  }
  const Discount = TotalCost * 0.2;
  const user = useSelector((state) => state.Login.items);
  const store = JSON.parse(localStorage.getItem("selectedStore"));
  const payments = [
    { name: "Name", detail: user.full_name },
    { name: "Phone Number", detail: user.phone },
    { name: "Email Id", detail: user.customer[1] },
    { name: "Address", detail: user.street },
  ];
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products && products.map((product, index) => (
          <ListItem key={index} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={`${product.brand.toUpperCase()} | ${product.product && product.product.toUpperCase()}`} />
            <Typography variant="subtitle1">
              {product.price * 1}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Discount" />
          <Typography variant="subtitle1">{-(parseInt(Discount))}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping Cost" />
          <Typography variant="subtitle1">50</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Grand Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {TotalCost - parseInt(Discount) + 50}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        {/* {vendor === null && <Grid item xs={12} sm={5}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping From
          </Typography>
          <Typography gutterBottom>
            {store && store.store_name && store.store_name.toUpperCase()}, {store && store.street && store.street.toUpperCase()}
          </Typography>
          <Typography gutterBottom>{store && store.city && store.city.toUpperCase()}</Typography>
          <Typography gutterBottom>{store && store.state && store.state.toUpperCase()}</Typography>
          <Typography gutterBottom>{store && store.pincode && store.pincode}</Typography>
        </Grid>} */}
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Customer Details
          </Typography>
          {vendor === null ? <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid> : <Typography>Customer Email: {customer}</Typography>}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
