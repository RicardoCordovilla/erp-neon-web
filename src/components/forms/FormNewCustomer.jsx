import { Autocomplete, Avatar, Box, Button, Card, IconButton, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { config } from '../../../config'
import Trash from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ImagePicker from '../utils/ImagePicker';
import ImagePickerCloud from '../utils/ImagePickerCloud';



const FormNewCustomer = ({ customers, setCustomers, customer, setOpenModal }) => {

    console.log(customer)
    const [name, setName] = useState(customer?.name || '')
    const [phone, setPhone] = useState(customer?.phone || '')
    const [alias, setAlias] = useState(customer?.alias || '')
    const [email, setEmail] = useState(customer?.email || '')
    const [images, setImages] = useState([customer?.avatar] || [])
    const [avatar, setAvatar] = useState(customer?.avatar)

    const createCustomer = async (customer) => {
        const url = config.api.baseUrl + config.api.customers
        console.log(url, customer)
        axios.post(url, customer)
            .then((response) => {
                console.log(response.data)
                setCustomers([response.data, ...customers])
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => setOpenModal(false))
    }

    useEffect(() => {
        setAvatar(images[1])
    }, [images])

    const updateCustomer = async (customer) => {
        const url = config.api.baseUrl + config.api.customers + '/id/' + customer.id
        console.log(url, customer)
        axios.patch(url, customer)
            .then((response) => {
                console.log(response.data)
                setCustomers([customer, ...customers.filter(c => c.id !== customer.id)])
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => setOpenModal(false))
    }


    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
                    <Typography variant="h6" component="div">
                        Avatar
                    </Typography>
                    <Avatar sx={{ width: '10rem', height: '10rem' }} src={avatar || images[1]} />
                    <ImagePickerCloud setImages={setImages} images={images} />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        width: '100%',
                        padding: '1rem',
                        // width: '20rem'
                    }}
                >

                    <TextField
                        id="outlined-basic"
                        label="Nombre"
                        variant="outlined"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ width: '100%' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Telefono"
                        variant="outlined"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        sx={{ width: '100%' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Alias"
                        variant="outlined"
                        type="text"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        sx={{ width: '100%' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ width: '100%' }}
                    />
                </Box>


                {/* <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        padding: '1rem',
                    }}
                >
                    <Card
                        sx={{ width: 'fit-content', padding: '1rem', 
                        // width: '20rem'
                     }}
                    >
                        <Typography variant="h6" component="div">
                            Proyectos
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' ,
                        width: '10rem'
                    }}>
                            {customerProjects.map((project, index) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}
                                    key={project.id}>
                                    <Typography variant="body1" component="div">
                                        {project?.title}
                                    </Typography>
                                    <IconButton
                                        sx={{ marginLeft: 'auto' }}
                                        onClick={() => {
                                            const newProjects = customerProjects.filter((p, i) => i !== index)
                                            setCustomerProjects(newProjects)
                                        }}
                                    >
                                        <Trash />
                                    </IconButton>
                                </Box>
                            ))}

                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>

                                <Autocomplete
                                    sx={{ width: '100%' }}
                                    id="tags-standard"
                                    options={projects}
                                    getOptionLabel={(option) => option.title}
                                    onChange={(event, project) => setProject(project)}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Proyectos" placeholder="Proyectos" />
                                    )}
                                />

                                {
                                    project &&
                                    <IconButton
                                        sx={{ marginLeft: 'auto' }}
                                        onClick={() => {
                                            setCustomerProjects([...new Set([...customerProjects, project])])
                                            setProject(null)
                                        }}>
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                }

                            </Box>


                        </Box>

                    </Card>
                </Box> */}


            </Box>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    if (customer?.id) {
                        updateCustomer({
                            id: customer.id,
                            name,
                            phone,
                            alias,
                            email,
                            avatar
                        })
                    } else {
                        createCustomer({
                            name,
                            phone,
                            alias,
                            email,
                            avatar
                        })
                    }
                }}
            >
                {customer?.id ? 'Actualizar' : 'Crear'}
            </Button>
        </Card>

    )
}

export default FormNewCustomer