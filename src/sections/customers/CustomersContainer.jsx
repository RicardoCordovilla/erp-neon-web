import { Box, Card, Container, IconButton, Modal, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { config } from '../../../config'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CustomersList from './CustomersList';
import FormNewCustomer from '../../components/forms/FormNewCustomer';


const CustomersContainer = () => {

    const [customers, setCustomers] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [newCustomer, setNewCustomer] = useState(null)

    const getCustomers = () => {
        const url = config.api.baseUrl + config.api.customers
        console.log(url)
        axios.get(url)
            .then(res => {
                console.log(res.data)
                setCustomers(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getCustomers()
    }, [])

    return (
        <>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Typography variant='h5' align='left' sx={{ margin: '20px 16px' }}>Clientes</Typography>
                    <IconButton aria-label="expand row" size="small" sx={{ margin: '0px 16px' }}
                        onClick={() => {
                            setNewCustomer(null)
                            setOpenModal(true)
                        }}>
                        <AddCircleOutlineIcon />
                    </IconButton>

                </Box>
                <CustomersList rows={customers} setNewCustomer={setNewCustomer} setOpenModal={setOpenModal} />
            </Container>

            <Modal
                open={openModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={() => setOpenModal(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
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
                        width: '90%',
                        minWidth: '300px',
                        maxWidth: '600px',
                        height: '90%',
                        overflowY: 'scroll',
                        p: 4,
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {newCustomer ? 'Editar Cliente' : 'Nuevo Cliente'}
                    </Typography>
                    <FormNewCustomer
                        setCustomers={setCustomers}
                        customers={customers}
                        customer={newCustomer}
                        setOpenModal={setOpenModal}
                    />
                </Card>
            </Modal>
        </>
    )
}

export default CustomersContainer