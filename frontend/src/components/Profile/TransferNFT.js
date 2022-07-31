import { Button, Input } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
    TableContainer,
    Paper,
} from "@mui/material";
import { useSelector } from 'react-redux';
function TransferNFT(props) {
    const [customerAddress, setCustomerAddress] = useState("");
    const [token, setToken] = useState("");
    const [sat, setSat] = useState("");
    const [err, setErr] = useState("")
    const user = useSelector((state) => state.Login.items);
    useEffect(() => {

    }, [user])
    const TransferF = async (customerAddress, token) => {
        if (!token || !customerAddress) {
            setErr("Please Fill Details")
        }
        if (user && user.customer && user.customer[3] && token && customerAddress) {
            const data = await transfer(user.customer[3], customerAddress, token);
            setSat(data.status);
            setErr("");
            props.update();


        }
    }
    const transfer = async (account_address, customer_address, token_id) => {
        const res = await fetch(`http://18.237.181.199:5000/transferWarranty`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                'account_address': account_address,
                'to_address': customer_address,
                'token_id': token_id
            })
        })
        const data = await res.json();
        if (res.status === 500) {
            console.log("Error")
            return { status: 'warranty expired' };
        }
        return data;
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
                    <h3 style={{ textAlign: "center" }}>Transfer Warranty NFT</h3>
                    <Input value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} placeholder='Receiver Address' />
                    <br />
                    <Input value={token} onChange={(e) => setToken(e.target.value)} placeholder='Token ID' />
                    <br />
                    <Button onClick={() => TransferF(customerAddress, token)}>Transfer</Button>
                    <br />
                </div>
                {sat === 'success' ? <p style={{ color: 'green', textAlign: 'center' }}>{sat}</p> : <p style={{ color: 'red', textAlign: 'center' }}>{sat}</p>}
                <p style={{ color: 'red', textAlign: 'center' }}>{err}</p>
            </TableContainer>
        </div>
    )
}

export default TransferNFT