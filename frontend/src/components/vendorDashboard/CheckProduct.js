import { Button, Input } from '@mui/material'
import React, { useState } from 'react'
import {
    TableContainer,
    Paper,
} from "@mui/material";
import { useDispatch } from 'react-redux';
import { Check } from '../../state/action-creators/index'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
function CheckProduct() {
    const [customerAddress, setCustomerAddress] = useState("");
    const [token, setToken] = useState("");
    const [sat, setSat] = useState("");
    const brand = useSelector((state) => state.brandLogin.items);
    useEffect(() => {
    }, [brand])
    const CheckF = async (customerAddress, token) => {
        setSat("Pending")
        const res = await fetch(`http://18.237.181.199:5000/brand/checkProduct`, {
            method: "POST",
            body: JSON.stringify({ 'customer_address': customerAddress, 'account_address': brand.brand_obj[4], 'token_id': token }),
            headers: { 'Content-type': 'application/json' }
        })
        const data = await res.json();
        if (data.status === 'success')
            setSat("Success");
        else
            setSat("Failed")
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
                    <h3 style={{ textAlign: "center" }}>Authenticate Warranty</h3>
                    <Input value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} placeholder='Customer Address' />
                    <br />
                    <Input value={token} onChange={(e) => setToken(e.target.value)} placeholder='Token ID' />
                    <br />
                    <Button onClick={() => CheckF(customerAddress, token)}>Check</Button>
                    <br />
                </div>
                {sat === 'Success' ? <p style={{ color: 'green', textAlign: 'center' }}>{sat}</p> : <p style={{ color: 'red', textAlign: 'center' }}>{sat}</p>}
            </TableContainer>
        </div>
    )
}

export default CheckProduct