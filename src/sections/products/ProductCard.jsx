import { Edit, Label } from '@mui/icons-material'
import { Box, Card, Grid, Link, Modal, Stack, Typography } from '@mui/material'
import React from 'react'
import ProductForm from '../../components/forms/ProductForm'

const ProductCard = ({ product }) => {
    const { name, stock, price } = product

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Card

        >
            <Grid  xs={12} sm={6} md={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}
            >

                <Typography variant="subtitle2" >
                    {name}
                </Typography>
                <Typography variant="subtitle2" noWrap>
                    {stock}
                </Typography>
                <Typography variant="subtitle2" noWrap>
                    {price}
                </Typography>
                <Stack direction="row" spacing={2}>
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
                            handleOpen()
                        }}
                    />
                </Stack>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <ProductForm item={product} handleClose={handleClose}/>
                    </Box>
                </Modal>
            </Grid>
        </Card >

    )
}

export default ProductCard