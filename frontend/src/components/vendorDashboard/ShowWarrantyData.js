import { Button, Input } from '@mui/material'
import React, { useState } from 'react'
import {
    TableContainer,
    Paper,
} from "@mui/material";
import { useDispatch } from 'react-redux';
import { WarrantyData } from '../../state/action-creators/index'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
function ShowWarrantyData(props) {
    const [token, setToken] = useState("");
    const dispatch = useDispatch();
    const data = useSelector((state) => state.warrantyData.items)
    const brand = useSelector((state) => state.brandLogin.items);
    useEffect(() => {
    }, [brand])
    const ShowData = (token) => {
        if (token && token !== "0") {
            dispatch(WarrantyData(brand.brand_obj[4], token));
            var list = []
            var obj = {};
            if (data && data.warranty && data.warranty.data) {
                obj["itemName"] = data.warranty.data.product;
                obj["brand"] = data.warranty.data.brand;
                obj["serialId"] = data.warranty.data.sl_no;
                obj["warrantyMonth"] = data.warranty.warranty_validity;
                obj["LastDate"] = data.warranty.warranty_end_time;
                list.push(obj);
                props.fnc(list);
            }
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: "center" }}>
            <TableContainer TableContainer
                component={Paper}
                sx={{
                    margin: 5,
                    width: 350,
                    padding: 3,
                }}
            >
                <div style={{ display: 'flex', justifyContent: "center", flexDirection: "column" }}>
                    <h3 style={{ textAlign: "center" }}>Warranty Data</h3>
                    <Input value={token} onChange={(e) => setToken(e.target.value)} placeholder='Token ID' />
                    <br />
                    <Button onClick={() => ShowData(token)}>Show</Button>
                    <br />
                </div>
            </TableContainer>
        </div>
    )
}

export default ShowWarrantyData