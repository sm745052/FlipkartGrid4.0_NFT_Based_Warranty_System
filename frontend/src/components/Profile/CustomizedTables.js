import * as React from "react";
import { GroupingState, IntegratedGrouping } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@mui/material/Paper";
import "./styles.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PurchaseHistory } from "../../state/action-creators";

export default function CustomizedTables() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Login.items);
  const [rows, setRows] = useState([]);
  const purchaseHistory = useSelector((state) => state.purchaseHistory.items)
  const [columns] = useState([
    { name: "date", title: "Date" },
    { name: "brand", title: "Brand" },
    { name: "serialId", title: "Serial ID" },
    { name: "itemName", title: "Item Name" },
    { name: "token", title: "Warranty Token" },
    { name: "warrantyMonth", title: "Warranty Validity" },
    { name: "LastDate", title: "Last Date" }
  ]);
  useEffect(() => {
    const fetch = async () => {
      if (user && user.customer && user.customer.length !== 0) {
        dispatch(PurchaseHistory(user.customer[3]));
        const purchases = purchaseHistory.purchases;
        var list = [];
        for (var i = 0; i < purchases.length; i++) {
          var obj = {};
          if (purchases[i].token_id !== 0) {
            const warranty_data = await modify(user.customer[3], purchases[i].token_id);
            if (warranty_data.warranty && warranty_data.warranty.data) {
              obj["date"] = purchases[i].purchase_time;
              obj["itemName"] = warranty_data.warranty.data.product;
              obj["brand"] = warranty_data.warranty.data.brand;
              obj["token"] = purchases[i].token_id;
              obj["serialId"] = warranty_data.warranty.data.sl_no;
              obj["warrantyMonth"] = warranty_data.warranty.warranty_validity;
              obj["LastDate"] = warranty_data.warranty.warranty_end_time;
              list.push(obj);
              setRows([...list])
            }
            else {
              obj["date"] = purchases[i].purchase_time;
              obj["token"] = purchases[i].token_id;
              list.push(obj);
              setRows([...list])
            }
          }
        }
        console.log(list)
        setRows(list);
      }
    }
    fetch();
  }, [user, dispatch]);
  const modify = async (account_address, token_id) => {
    if (token_id !== 0) {
      const res = await fetch(`http://18.237.181.199:5000/warrantyData`, {
        method: "POST",
        body: JSON.stringify({ 'account_address': account_address, 'token_id': token_id }),
        headers: { 'Content-type': 'application/json' }
      })
      var data;
      if (res.status !== 500)
        data = await res.json();
      else
        return {}
      return data;
    }
  }

  return (
    <Paper
      sx={{
        width: "80%",
        alignItems: "center",
        borderRadius: "12px",
        boxShadow: 1,
        marginLeft: "135px",
      }}
    >
      <Grid rows={rows} columns={columns}>
        <GroupingState grouping={[{ columnName: "token" }]} />
        <IntegratedGrouping />
        <Table />
        <TableHeaderRow />
        <TableGroupRow />
      </Grid>
    </Paper>
  );
}
