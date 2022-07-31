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
} from "@mui/material";
import { useDispatch } from "react-redux";
import { ClearCart, getCart } from "../../state/action-creators";
export default function OrderSummary({ isAuthenticated, cartItems, vendor, address }) {
  const dispatch = useDispatch();
  const TotalCost = cartItems && cartItems.reduce((a, b) => a + b[4] * 1, 0);
  const TotalQty = cartItems && cartItems.reduce((a, b) => a + parseInt(1), 0);
  const Discount = TotalCost * 0.2;
  const GrandTotal =
    TotalCost > 0 ? parseFloat(TotalCost - Discount + 50).toFixed(2) : 0;
  const removeItems = () => {
    dispatch(ClearCart(address));
    dispatch(getCart(address));
  };
  return (
    <TableContainer
      component={Paper}
      sx={{ margin: 5, width: 350, padding: 3 }}
    >
      <CardHeader
        title={"Order Summary"}
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
          {cartItems && cartItems.map((item, index) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              key={index}
            >
              <TableCell component="th" scope="row">
                {item && item[3].toUpperCase()}
              </TableCell>
              <TableCell align="right">{1}</TableCell>
              <TableCell align="right">
                {parseFloat(1 * item[4]).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Total Cost
            </TableCell>
            <TableCell align="right">{TotalCost ? TotalQty : 0}</TableCell>
            <TableCell align="right">{TotalCost && TotalCost.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Discount (20%)
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">
              - {parseFloat(Discount).toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Shipping Cost
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">
              {TotalCost ? Number(50).toFixed(2) : Number(0).toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Grand Total
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">{GrandTotal}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {vendor !== null ? (
        <Button
          variant="contained"
          sx={{
            margin: 3,
            width: 150,
            ":hover": { backgroundColor: "#7c2e41" },
            backgroundColor: "#7c2e41",
          }}
          href="/Checkout"
          onClick={() => {
            localStorage.setItem("cart", JSON.stringify(cartItems))
          }}

        >
          Order
        </Button>
      ) : (
        <>
          {isAuthenticated !== 0 ? (
            cartItems.length !== 0 ? <div>
              <Button
                variant="contained"
                sx={{
                  margin: 3,
                  width: 150,
                  ":hover": { backgroundColor: "#7c2e41" },
                  backgroundColor: "#7c2e41",
                }}
                href="/Checkout"
                onClick={() => {
                  var list = [];
                  for (var i = 0; i < cartItems.length; i++) {
                    var obj = {};
                    obj["price"] = cartItems[i][4];
                    obj["brand"] = cartItems[i][2];
                    obj["product"] = cartItems[i][3];
                    list.push(obj);
                  }
                  localStorage.setItem("cart", JSON.stringify(list)
                  )
                }
                }
              >
                Buy Now
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: 150,
                  ":hover": { backgroundColor: "#7c2e41" },
                  backgroundColor: "#7c2e41",
                }}
                onClick={removeItems}
              >
                Remove
              </Button>
            </div> : null
          ) : (
            <Button
              variant="contained"
              sx={{
                margin: 3,
                ":hover": { backgroundColor: "#7c2e41" },
                backgroundColor: "#7c2e41",
              }}
              href="/Login"
            >
              Login to Order
            </Button>
          )}
        </>
      )}
    </TableContainer>
  );
}
