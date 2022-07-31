import React, { useEffect, useState } from 'react'
import { GroupingState, IntegratedGrouping } from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    TableGroupRow,
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { GetOrder } from '../../state/action-creators';
function OrderStatus() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.Login.items);
    const [rows, setRows] = useState([]);
    useEffect(() => {
        if (user && user.customer && user.customer.length !== 0) {
            dispatch(GetOrder(user.customer[3]));
        }
    }, [user, dispatch])
    const orders = useSelector((state) => state.getOrder.items)
    useEffect(() => {
        var data = [];
        for (var i = 0; i < orders.length; i++) {
            var obj = {};
            obj["orderId"] = orders[i][0]
            obj["brand"] = orders[i][3];
            obj["itemName"] = orders[i][4];
            obj["amount"] = orders[i][5];
            obj["status"] = orders[i][6];
            data.push(obj)
        }
        setRows(data)
    }, [orders])
    const [columns] = useState([
        { name: "brand", title: "Brand" },
        { name: "orderId", title: "Order ID" },
        { name: "itemName", title: "Item Name" },
        { name: "amount", title: "Amount" },
        { name: "status", title: "Status" }
    ]);

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
                <GroupingState grouping={[{ columnName: "orderId" }]} />
                <IntegratedGrouping />
                <Table />
                <TableHeaderRow />
                <TableGroupRow />

            </Grid>
        </Paper>
    )
}

export default OrderStatus