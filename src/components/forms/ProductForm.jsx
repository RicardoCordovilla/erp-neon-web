import { Label } from '@mui/icons-material'
import { Box, Button, Container, Input, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { config } from '../../../config'

const ProductForm = ({ item, handleClose, products, setProducts }) => {
    console.log(products)

    const [name, setName] = useState(item?.name)
    const [stock, setStock] = useState(item?.stock)
    const [unity, setUnity] = useState(item?.unity)
    const [price, setPrice] = useState(item?.price)

    const saveItem = () => {
        console.log(name, stock, price, unity)

        axios.post(config.api.baseUrl + config.api.products, {
            name: name,
            stock: stock > 0 ? stock : null,
            unity: unity,
            price: price,
            service: stock > 0 ? false : true,
        }).then((response) => {
            console.log(response)
            const arr = [response.data, ...products]
            setProducts(arr)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            handleClose()
        })
    }

    const updateItem = () => {
        console.log(name, stock, price)
        axios.patch(config.api.baseUrl + config.api.products + '/id/' + item.id, {
            name: name,
            stock: stock,
            unity: unity,
            price: price,
        }).then((response) => {
            console.log(response)
            const arr = [response.data, ...products]
            setProducts(arr.filter((product) => (product.name !== item.name || product.stock !== item.stock || product.unity !== item.unity || product.price !== item.price)))

        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            handleClose()
        })
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                // width: '100%',
            }}
        >

            <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='ej: Neon'
                type='text'
            />

            <TextField
                id="outlined-basic"
                label="Stock"
                variant="outlined"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder='ej: 10'
                type='number'
            />

            <TextField
                id="outlined-basic"
                label="Precio"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder='ej: 2.0'
                type='number'
            />

            <TextField
                id="outlined-basic"
                label="Unidad de medida"
                variant="outlined"
                value={unity}
                onChange={(e) => setUnity(e.target.value)}
                placeholder='ej: metro, hora, unidad'
                type='text'
            />

            <Button variant="contained"
                onClick={() => {
                    item?.id ? updateItem() : saveItem()
                }}
            >
                {item?.id ? 'Actualizar' : 'Guardar'}
            </Button>
        </Box>
    )
}

export default ProductForm