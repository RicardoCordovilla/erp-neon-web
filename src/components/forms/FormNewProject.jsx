import { Autocomplete, Button, Card, Divider, IconButton, Skeleton, TextField, Typography } from '@mui/material'
import Box from "@mui/material/Box";
import React, { useState, useEffect } from 'react'
import QuoteContainer from '../utils/QuoteContainer'
import { useTheme } from '@mui/material';
import axios from 'axios';
import { config } from '../../../config';
import ImagesContainer from '../utils/ImagesContinaer';
import ImagePickerCloud from '../utils/ImagePickerCloud';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Trash from '@mui/icons-material/Delete';
import PaysContainer from '../utils/PaysContainer';
import PaysField from '../utils/PaysField';


const FormNewProject = ({ item, setNewProject, setOpenModal }) => {

    console.log('item', item)

    const [title, setTitle] = useState(item?.title || '')
    const [customer, setCustomer] = useState()
    const [inputValue, setInputValue] = useState('');
    const [customerId, setCustomerId] = useState(item?.customer_id || 0)
    const [address, setAddress] = useState(item?.address || '')
    const [confirmationDate, setConfirmationDate] = useState(item?.confirmationDate || '')
    const [cost, setCost] = useState(item?.cost || '')
    const [sale, setSale] = useState(item?.sale || '')
    const [quote, setQuote] = useState(item?.quote || '')
    const [pays, setPays] = useState(item?.pays || [])
    const [projectSigns, setProjectSigns] = useState(item?.projectSigns || [])
    const [instalationDate, setInstalationDate] = useState(item?.instalationDate || '')
    const [estimatedEnd, setEstimatedEnd] = useState(item?.estimatedEnd || '')
    const [additionalProducts, setAdditionalProducts] = useState(item?.additionalProducts || [])
    const [notes, setNotes] = useState(item?.notes || '')
    const [otherContacts, setOtherContacts] = useState(item?.otherContacts || '')

    const [signs, setSigns] = useState([])
    const [products, setProducts] = useState([])
    const [customers, setCustomers] = useState([])

    const [sign, setSign] = useState({ sign: null, quantity: 1 })
    const [product, setProduct] = useState({ product: null, quantity: 1 })



    const getSigns = () => {
        const url = config.api.baseUrl + config.api.signs
        console.log(url)
        axios.get(url)
            .then((response) => {
                console.log(response)
                setSigns(response.data)
            })
            .catch((error) => console.log(error))

    }

    const getProducts = () => {
        const url = config.api.baseUrl + config.api.products
        console.log(url)
        axios.get(url)
            .then((response) => {
                console.log(response)
                setProducts(response.data)
            })
            .catch((error) => console.log(error))
    }

    const getCustomers = () => {
        const url = config.api.baseUrl + config.api.customers
        axios.get(url)
            .then((response) => {
                console.log(response)
                setCustomers(response.data)
            })
            .catch((error) => console.log(error))
    }



    const createProject = () => {
        const url = config.api.baseUrl + config.api.projects
        const customer_id = customer?.id
        const body = { customer_id, title, address, confirmationDate, cost, sale, quote, pays, projectSigns, instalationDate, estimatedEnd, additionalProducts, notes, otherContacts }
        console.log(url, body)
        axios.post(url,
            body
        )
            .then((response) => {
                console.log(response)
                setNewProject(response.data)
                setOpenModal(false)
            }).catch((error) => {
                console.log(error)
            })
    }

    const updateProject = () => {
        const url = config.api.baseUrl + config.api.projects + '/id/' + item.id
        const customer_id = customer?.id
        const body = { title, customer_id, address, confirmationDate, cost, sale, quote, pays, projectSigns, instalationDate, estimatedEnd, additionalProducts, notes, otherContacts }
        console.log(url, body)

        axios.patch(url,
            body
        )
            .then((response) => {
                console.log(response)
                setNewProject(body)
                setOpenModal(false)
            }).catch((error) => {
                console.log(error)
            })
    }




    useEffect(() => {
        getSigns()
        getProducts()
        getCustomers()
    }, [])

    useEffect(() => {
        setCustomer(customers.find((customer) => customer.id === customerId))
    }, [customers])

    useEffect(() => {
        console.log('product', product)
        console.log('additionalProducts', additionalProducts)
    }, [product, additionalProducts])


    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: 'white',
                padding: '1rem 2rem',
                height: 'fit-content',
                width: '100%',
            }}
        >

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: '2rem',
                    width: '100%',
                    mb: '2rem',
                }}
                flexWrap={'wrap'}
            >

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        width: '100%',
                    }}
                    maxWidth={'500px'}
                >

                    <Typography variant={'h6'}
                        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}
                    >Cliente:
                        <Typography variant={'body1'}>{customer?.name}</Typography>
                    </Typography>
                    <Autocomplete
                        id='tags-standard'
                        options={customers}
                        // value={customer}
                        getOptionLabel={(option) => option?.name}
                        onChange={(event, value) => {
                            setCustomer(value)
                            setCustomerId(value?.id)
                        }}
                        renderInput={(params) => (
                            <TextField {...params} variant='outlined' label="Cliente" placeholder="Cliente" />
                        )}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Titulo"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='ej: Proyecto raimy'
                        type='text'
                    />

                    <TextField
                        id="outlined-basic"
                        label="Direccion"
                        variant="outlined"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='ej: Av. Siempre viva 123'
                        type='text'
                    />

                    <TextField
                        id="outlined-basic"
                        label="Fecha de confirmacion"
                        variant="outlined"
                        value={confirmationDate}
                        onChange={(e) => {
                            setConfirmationDate(e.target.value)
                            console.log(e.target.value)
                        }}
                        type='date'
                    />

                    <TextField
                        id="outlined-basic"
                        label="Costo"
                        variant="outlined"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        placeholder='ej: 100000'
                        type='number'
                    />

                    <TextField
                        id="outlined-basic"
                        label="Venta"
                        variant="outlined"
                        value={sale}
                        onChange={(e) => setSale(e.target.value)}
                        placeholder='ej: 100000'
                        type='number'
                    />


                    <TextField
                        id="outlined-basic"
                        label="Fecha instalacion"
                        variant="outlined"
                        value={instalationDate}
                        onChange={(e) => setInstalationDate(e.target.value)}
                        type='date'
                    />

                    <TextField
                        id="outlined-basic"
                        label="Fecha estimada de finalizacion"
                        variant="outlined"
                        value={estimatedEnd}
                        onChange={(e) => setEstimatedEnd(e.target.value)}
                        type='date'
                    />

                    <TextField
                        id="outlined-basic"
                        label="Notas"
                        multiline
                        rows={2}
                        variant="outlined"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder='ej: Notas del proyecto'
                        type='text'
                    />

                    <TextField
                        id="outlined-basic"
                        label="Otros contactos"
                        variant='outlined'
                        value={otherContacts}
                        onChange={(e) => setOtherContacts(e.target.value)}
                        placeholder='ej: Otros contactos'
                        type='text'
                    />

                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        // width: '100%',
                    }}
                    maxWidth={'500px'}
                    width={'100%'}
                >
                    <QuoteContainer quote={quote} setQuote={setQuote} />
                    <Divider />


                    <Card
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            // width: '100%',
                            padding: '1rem',
                        }}
                        maxWidth={'500px'}
                        width={'100%'}
                    >
                        <Typography variant={'h6'}>Pagos</Typography>
                        <PaysContainer setPays={setPays} pays={pays} />
                        <PaysField pays={pays} setPays={setPays} />
                    </Card>
                    <Divider />

                    <Card
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            // width: '100%',
                            padding: '1rem',
                        }}
                        maxWidth={'500px'}

                        width={'100%'}
                    >
                        <Typography variant={'h6'}>Letreros</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            width: '100%',
                        }}>
                            {
                                projectSigns.map((sign, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            gap: '1rem',
                                            width: '100%',
                                        }}
                                    >
                                        <Typography variant={'body1'}>{sign?.quantity}</Typography>
                                        <Typography variant={'body1'}>{sign?.sign?.title}</Typography>
                                        <Typography variant={'body1'}>{sign?.sign?.sale}</Typography>
                                        <IconButton
                                            onClick={() => {
                                                const newSigns = projectSigns.filter((item, i) => i !== index)
                                                setProjectSigns(newSigns)
                                            }}
                                        >
                                            <Trash />
                                        </IconButton>
                                    </Box>
                                ))
                            }

                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                gap: '1rem',
                                width: '100%',
                            }}
                        >

                            <TextField
                                sx={
                                    {
                                        width: '20%',
                                    }
                                }
                                id="outlined-basic"
                                label="Cantidad"
                                variant="standard"
                                value={sign?.quantity}
                                onChange={(e) => setSign({ ...sign, quantity: e.target.value })}
                                placeholder='ej: 2'
                                type='tel'
                            />

                            <Autocomplete
                                sx={{
                                    width: '100%',
                                }}
                                id='tags-standard'
                                options={signs}
                                getOptionLabel={(option) => option.title}
                                onChange={(event, value) => setSign({ ...sign, sign: value })}
                                renderInput={(params) => (
                                    <TextField {...params} variant='outlined' label="Letrero" placeholder="Letrero" />
                                )}
                            />
                            {sign?.sign !== null &&
                                <IconButton
                                    onClick={() => {
                                        setProjectSigns([...projectSigns, sign])
                                        setSign({ sign: null, quantity: 1 })
                                    }}
                                >
                                    <AddCircleOutlineIcon />
                                </IconButton>}



                        </Box>
                    </Card>

                    <Divider />

                    <Card
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            // width: '100%',
                            padding: '1rem',
                        }}
                        maxWidth={'500px'}

                        width={'100%'}
                    >
                        <Typography variant={'h6'}>Productos/servicios adicionales </Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            width: '100%',
                        }}>
                            {
                                additionalProducts.map((product, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            gap: '1rem',
                                            width: '100%',
                                        }}
                                    >
                                        <Typography variant={'body1'}>{product?.quantity}</Typography>
                                        <Typography variant={'body1'}>{product?.product?.name}</Typography>
                                        <Typography variant={'body1'}>{product?.product?.sale}</Typography>

                                        <IconButton
                                            onClick={() => {
                                                const newAdditionalProduct = additionalProducts.filter((item, i) => i !== index)
                                                setAdditionalProducts(newAdditionalProduct)
                                            }}
                                        >
                                            <Trash />
                                        </IconButton>
                                    </Box>
                                ))
                            }

                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                gap: '1rem',
                                width: '100%',
                            }}
                        >

                            <TextField
                                sx={
                                    {
                                        width: '20%',
                                    }
                                }
                                id="outlined-basic"
                                label="Cantidad"
                                variant="standard"
                                value={product?.quantity}
                                onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                                placeholder='ej: 2'
                                type='tel'
                            />

                            <Autocomplete
                                sx={{
                                    width: '100%',
                                }}
                                id='tags-standard'
                                options={products}
                                getOptionLabel={(option) => option.name}
                                onChange={(event, value) => setProduct({ ...product, product: value })}
                                renderInput={(params) => (
                                    <TextField {...params} variant='outlined' label="Producto/servicio" placeholder="Letrero" />
                                )}
                            />
                            {product?.product !== null && <IconButton
                                onClick={() => {
                                    setAdditionalProducts([...additionalProducts, product])
                                    setProduct({ product: null, quantity: 1 })
                                }}
                            >
                                <AddCircleOutlineIcon />
                            </IconButton>}

                        </Box>
                    </Card>

                </Box>
            </Box>

            <Button variant="contained" color="success"
                sx={{ mt: '2rem' }}
                onClick={() => { item?.id ? updateProject() : createProject() }}
            >
                Guardar
            </Button>

        </Card >
    )
}

export default FormNewProject