import { Box, Card, Container, IconButton, Modal, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { config } from '../../../config'
import ProjectsList from './ProjectsList'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormNewProject from '../../components/forms/FormNewProject'

const ProjectsContainer = ({ customerId = null }) => {

    console.log(customerId)

    const [projects, setProjects] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [newProject, setNewProject] = useState(null)

    const getProjects = () => {

        const url = customerId ? config.api.baseUrl + config.api.projects + '/customer/' + customerId : config.api.baseUrl + config.api.projects

        console.log(url)

        axios.get(url)
            .then((response) => {
                console.log(response.data)
                setProjects(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getProjects()
    }, [newProject, customerId])


    return (
        <>
            <Container>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
                >
                    <Typography variant='h5' align='left' sx={{ margin: '20px 16px' }}>Proyectos</Typography>
                    <IconButton aria-label="expand row" size="small" sx={{ margin: '0px 16px' }}
                        onClick={() => {
                            setNewProject(null)
                            setOpenModal(true)
                        }}
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>
                    <Box sx={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        paddingRight: '3rem',
                    }}
                    >
                        <Typography variant='h5' align='left' sx={{
                            color: '#f44336',
                            backgroundColor: '#ff0',
                            padding: '0.5rem',
                        }}
                        >
                            Pendiente por pagar:
                            {
                                projects.filter((project) => {
                                    return project?.paystatus === 'Pendiente'
                                }).reduce((total, project) => {
                                    return (total + Number(project?.sale) - project.pays.reduce((total, pay) => {
                                        return total + Number(pay.value)
                                    }, 0))
                                }, 0)
                            }
                        </Typography>
                    </Box>

                </Box>

                <ProjectsList rows={projects} setNewProject={setNewProject} setOpenModal={setOpenModal} />
            </Container>
            <Modal
                open={openModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={() => setOpenModal(false)}
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
                        width: '90%',
                        height: '90%',
                        overflowY: 'auto'
                    }}
                >
                    <Typography variant='h5' align='left' sx={{ margin: '20px 16px' }}>
                        {newProject ? 'Editar proyecto' : 'Nuevo proyecto'}
                    </Typography>
                    <FormNewProject item={newProject} setNewProject={setNewProject} setOpenModal={setOpenModal} />
                </Card>
            </Modal>
        </>
    )
}

export default ProjectsContainer