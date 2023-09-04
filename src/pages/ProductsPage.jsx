import { Box, Container, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProductsConatiner from '../sections/products/ProductsConatiner'
import axios from 'axios'
import { config } from '../../config'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ProductModal from '../sections/products/ProductModal'

const ProductsPage = () => {


    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        console.log('ProductsConatiner')
        axios.get(config.api.baseUrl + config.api.products).then((response) => {
            // console.log(response.data)
            setProducts(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])


    return (
        <Container
            maxWidth='lg'
            sx={{
                pt: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    gap: 2,
                    alignItems: 'center',
                    mb: 2
                }}
            >
                <Typography variant='h5' >Productos</Typography>
                <IconButton
                    onClick={() => setOpen(true)}
                >
                    <AddCircleOutlineIcon
                        sx={{
                            fontSize: '1.5rem'
                        }}
                    />
                </IconButton>
            </Box>
            <ProductsConatiner items={products} />

            <ProductModal setOpen={setOpen} open={open} products={products} setProducts={setProducts} />

        </Container>
    )
}

export default ProductsPage