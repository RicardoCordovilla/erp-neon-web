import { Box, Card, CardActionArea, CardActions, CardContent, Container, IconButton, Modal, Typography } from '@mui/material'
// import React, { useEffect, useState } from 'react'
import * as React from 'react';
import axios from 'axios'
import { config } from '../../../config'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import SignsList from './SignsList'
import FormNewSign from '../../components/forms/FormNewSign';


const SignsContainer = ({ }) => {

    const [signs, setSigns] = React.useState([])

    const [openModal, setOpenModal] = React.useState(false)
    const [newSign, setNewSign] = React.useState(null)

    const handleOpen = () => {
        setOpenModal(true)
        setNewSign(null)
    }

    const handleClose = () => setOpenModal(false)

    const getSigns = () => {
        axios.get(config.api.baseUrl + config.api.signs)
            .then((response) => {
                console.log(response.data)
                setSigns(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    React.useEffect(() => {
        getSigns()
    }, [newSign])


    return (
        <div>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Typography variant='h5' align='left' sx={{ margin: '20px 16px' }}>Letreros</Typography>
                    <IconButton aria-label="expand row" size="small" sx={{ margin: '0px 16px' }}
                        onClick={handleOpen}
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Box>
                {/* <TextField id="outlined-basic"
                    label={
                        <Typography
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                        >
                        <SearchIcon />
                        Buscar por cliente
                        </Typography>
                    }
                    variant="outlined"
                    type='search'
                /> */}

                <SignsList rows={signs} setNewSign={setNewSign} setOpenModal={setOpenModal} />
            </Container>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Card
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        width: '90%',
                        height: '90%',
                        overflowY: 'auto'
                    }}

                >
                    <Typography variant='h5' align='center' sx={{ margin: '20px 16px' }}>
                        {newSign ? 'Editar Letrero' : 'Nuevo Letrero'}
                    </Typography>

                    {openModal && <FormNewSign item={newSign} setNewSign={setNewSign} setOpenModal={setOpenModal} />}

                    <IconButton aria-label="expand row" size="small"
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px'
                        }}
                        onClick={handleClose}
                    >
                        <CloseFullscreenIcon />
                    </IconButton>
                </Card>
            </Modal>
        </div>
    )
}

export default SignsContainer