import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import DeleteIcon from '@mui/icons-material/Delete';


const MyOrders = () => {
    const [products, setProducts] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        const url = `http://localhost:5000/orders?email=${user?.email}`
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [products])

    const deleteHandle = id => {
        // console.log(id);
        const procced = window.confirm("Are you sure to remove this service?");
        if (procced) {
            const url = `http://localhost:5000/orders/${id}`;
            fetch(url, {
                method: "DELETE"
            })
                .then(res => res.json())
        }

    }

    return (
        <div>
            <Typography variant='h5' sx={{ fontWeight: 700, mb: 3, color: 'green', textAlign: 'center' }}>
                Total Ordered: {products.length} products
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{}} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#08a69e' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700, color: 'white' }} >Product Name</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: 'white' }} align="center">Price</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: 'white' }} align="center">Status</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: 'white' }} align="center">Action</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row?.order?.Model}
                                </TableCell>
                                <TableCell align="center">{row?.order?.price}</TableCell>
                                <TableCell align="center" sx={{ color: 'green' }}>{row?.status}</TableCell>
                                <TableCell onClick={() => deleteHandle(row?._id)} align="center"><IconButton sx={{ color: 'error.main' }} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MyOrders;