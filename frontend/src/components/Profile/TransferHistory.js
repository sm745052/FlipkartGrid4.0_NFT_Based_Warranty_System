import { Button, Input } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
    TableContainer,
    Paper,
} from "@mui/material";
import { useDispatch } from 'react-redux';
import { TransferHistory, WarrantyTransfer } from '../../state/action-creators/index'
import { useSelector } from 'react-redux';
function TransferNFT() {
    const [token, setToken] = useState("");
    const dispatch = useDispatch();
    const [sat, setSat] = useState("");
    const [err, setErr] = useState("");
    const user = useSelector((state) => state.Login.items);
    const [transfer, setTransfer] = useState([]);
    useEffect(() => {
    }, [user])
    const TransferH = async (token) => {
        if (!token) {
            setErr("Please Fill Details")
        }
        if (user && user.customer && user.customer[3] && token) {
            const res = await fetch(`http://18.237.181.199:5000/transferHistory`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    'account_address': user.customer[3],
                    'token_id': token
                })
            })
            const data = await res.json();
            if (data.transfers && data.transfers.length === 0) {
                setSat("No Data");
                setTransfer([])
            }
            else {
                setSat("success");
                setTransfer(data.transfers)
            }
            setErr("");
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
                    <h3 style={{ textAlign: "center" }}>NFT Transfer History</h3>
                    <Input value={token} onChange={(e) => setToken(e.target.value)} placeholder='Token ID' />
                    <br />
                    <Button onClick={() => TransferH(token)}>Show History</Button>
                    <br />
                </div>
                {sat === 'success' ? <p style={{ color: 'green', textAlign: 'center' }}>{sat}</p> : <p style={{ color: 'red', textAlign: 'center' }}>{sat}</p>}
                <p style={{ color: 'red', textAlign: 'center' }}>{err}</p>
                {transfer.length !== 0 ? <details>
                    <summary>Transfer Address</summary>
                    {transfer.map((ele, index) => {
                        return <p>{index + 1}) {ele}</p>
                    })}
                </details> : null}
            </TableContainer>
        </div>
    )
}

export default TransferNFT