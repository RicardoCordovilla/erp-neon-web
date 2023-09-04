import { Box, Divider, Modal, Typography } from '@mui/material';
import React, { useState } from 'react'
import ProductForm from '../../components/forms/ProductForm';

const ProductModal = ({ setOpen, open, product, products, setProducts }) => {
    console.log(products)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
    };


    // const [open, setOpen] = useState(open);
    // const [product, setProduct] = useState(product)

    const handleClose = () => setOpen(false);


    return (
        <Modal
            open={open}
            onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"

        >
            <Box sx={style}>
                <Typography id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                        textAlign: 'center',
                        marginBottom: '2rem',
                    }}
                >
                    {product?.id ? 'Editar' : 'Crear'} Producto
                </Typography>
                <ProductForm item={product} handleClose={handleClose} products={products} setProducts={setProducts} />
            </Box>
        </Modal>
    )
}

export default ProductModal