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
import { ListWarranty } from '../../state/action-creators/index'
export default function CustomizedTables() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.Login.items);
    const myTokens = useSelector((state) => state.ListWarranty.items);
    const [rows, setRows] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            if (user && user.customer && user.customer[3]) {
                dispatch(ListWarranty(user.customer[3]));
                const warranties = myTokens.warranties;
                var list = [];
                for (var i = 0; i < warranties.length; i++) {
                    var obj = {};
                    const warranty_data = await modify(user.customer[3], warranties[i]);
                    if (warranties[i] !== 0 && warranty_data && warranty_data.warranty && warranty_data.warranty.data) {
                        const warranty_data = await modify(user.customer[3], warranties[i]);
                        obj["index"] = i + 1;
                        obj["token"] = warranties[i];
                        obj["itemName"] = warranty_data.warranty.data.product;
                        obj["serialId"] = warranty_data.warranty.data.sl_no;
                        obj["brand"] = warranty_data.warranty.data.brand;
                        obj["warrantyMonth"] = warranty_data.warranty.warranty_validity;
                        list.push(obj);
                        setRows([...list]);
                    }
                }
                setRows(list);
            }
        }
        fetch();
    }, [user]);
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
    const [columns] = useState([
        { name: "index", title: "No" },
        { name: "token", title: "Token" },
        { name: "brand", title: "Brand" },
        { name: "serialId", title: "Serial ID" },
        { name: "itemName", title: "Item Name" },
        { name: "warrantyMonth", title: "Warranty Validity" }
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
                <GroupingState grouping={[{ columnName: "serialId" }]} />
                <IntegratedGrouping />
                <Table />
                <TableHeaderRow />
                <TableGroupRow />
            </Grid>
        </Paper>
    );
}
