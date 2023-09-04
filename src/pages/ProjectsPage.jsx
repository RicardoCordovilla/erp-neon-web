import React from 'react'
import ProjectsContainer from '../sections/projects/ProjectsContainer'
import { Box, Container } from '@mui/material'
import { useParams } from 'react-router-dom/dist'

const ProjectsPage = () => {

    const { customerId } = useParams()
    console.log(customerId)

    return (
        <Container>
            <ProjectsContainer customerId={customerId} />
        </Container>
    )
}

export default ProjectsPage