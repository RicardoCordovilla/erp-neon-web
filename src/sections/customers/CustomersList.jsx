import { Avatar, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useState } from 'react'
import { Edit, ViewAgenda } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom/dist';

const columns = [
    { id: 'avatar', label: 'Avatar', align: 'center' },
    { id: 'name', label: 'Nombre', align: 'center' },
    { id: 'phone', label: 'Telefono', align: 'center' },
    { id: 'alias', label: 'Alias', align: 'center' },
    { id: 'editicon', label: 'Acciones', align: 'center' },
    { id: 'vieicon', label: 'Proyectos', align: 'center' },
]


const Row = ({ row, setNewCustomer, setOpenModal }) => {

    const navigate = useNavigate()

    console.log(row)

    const handleEditCustomer = () => {
        setOpenModal(true)
        setNewCustomer(row)
    }

    const handleViewProjects = () => {
        console.log('view projects', row?.id)
        navigate(`/projects/${row?.id}`)
        // setOpenModal(true)
        // setNewCustomer(row)
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover></TableRow>
            <TableCell
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Avatar sx={{ width: '4rem', height: '4rem' }} src={row?.avatar} alt={row?.name} />
            </TableCell>
            <TableCell align='center'>{row.name}</TableCell>
            <TableCell align="center">{row.phone}</TableCell>
            <TableCell align="center">{row.alias}</TableCell>
            <TableCell align='center'>
                <IconButton onClick={handleEditCustomer}>
                    <Edit />
                </IconButton>
            </TableCell>
            <TableCell align='center'>
                <IconButton
                    onClick={handleViewProjects}
                >
                    <ViewAgenda />
                </IconButton>
            </TableCell>

        </>
    )
}



const CustomersList = ({ rows, setNewCustomer, setOpenModal }) => {

    console.log(rows)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <Row key={row.id} row={row} setNewCustomer={setNewCustomer} setOpenModal={setOpenModal} />
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage} />
        </Paper>
    )
}

export default CustomersList