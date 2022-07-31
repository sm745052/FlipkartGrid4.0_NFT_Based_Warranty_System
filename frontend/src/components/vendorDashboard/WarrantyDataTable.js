import React, { useState } from "react";
import { GroupingState, IntegratedGrouping } from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    TableGroupRow,
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@mui/material/Paper";
import "../../components/Profile/styles.css";
export default function CustomizedTables(props) {
    const [columns] = useState([
        { name: "brand", title: "Brand" },
        { name: "serialId", title: "Serial ID" },
        { name: "itemName", title: "Item Name" },
        { name: "warrantyMonth", title: "Warranty Month" },
        { name: "LastDate", title: "Last Date" }
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
            {props.data.length !== 0 ? <Grid rows={props.data} columns={columns}>
                <GroupingState grouping={[{ columnName: "serialId" }]} />
                <IntegratedGrouping />
                <Table />
                <TableHeaderRow />
                <TableGroupRow />
            </Grid> : null}
        </Paper>
    );
}
