import { Box, Divider, List, ListItem, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { Edit } from '@mui/icons-material'
import ProductForm from '../../components/forms/ProductForm'
import ProductModal from './ProductModal'

const ProductsLists = ({ items }) => {

    const [products, setProducts] = useState(items)

    const [product, setProduct] = useState({})
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setProducts(items)
    }, [items])

    return (
        <>
            <TableContainer component='div'
                sx={{
                    maxHeight: 'calc(100vh - 200px)',
                    overflowY: 'auto',
                }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="sticky table">
                    <TableHead
                        sx={{
                            backgroundColor: '#ddd',
                            '& th': {
                                color: 'black',
                                fontWeight: 'bold',
                            },
                        }}
                    >
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="center">Precio</TableCell>
                            <TableCell align="center">Stock</TableCell>
                            <TableCell align="center">Unidad</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': {
                                        backgroundColor: '#ddd',
                                        transition: '0.3s ease-in-out background-color',
                                    },
                                }}

                            >
                                <TableCell component="th" scope="row">
                                    {product.name}
                                </TableCell>
                                <TableCell align="center">{product.price}</TableCell>
                                <TableCell align="center">{`${!product.service ? product.stock : '-'}`}</TableCell>
                                <TableCell align="center">{product.unity}</TableCell>
                                <TableCell align="right">
                                    <Edit
                                        sx={{
                                            color: 'gray',
                                            fontSize: '1rem',
                                            '&:hover': {
                                                color: 'black',
                                                transition: '0.3s ease-in-out color',
                                            },
                                            cursor: 'pointer',
                                            transition: '0.3s ease-in-out color',
                                        }}
                                        onClick={() => {
                                            setOpen(true)
                                            setProduct(product)
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <ProductModal setOpen={setOpen} open={open} product={product} products={products} setProducts={setProducts} />
        </>


    )
}

export default ProductsLists