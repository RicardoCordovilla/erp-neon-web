import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Card, Collapse, IconButton, Modal, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Edit } from '@mui/icons-material';
import ModalPaysview from '../../components/utils/ModalPaysview';

const columns = [
    { id: 'viewicon', label: ' ', align: 'center' },
    // { id: 'images[0]', label: 'Imagen', with: 250, align: 'center' },
    { id: 'instalationDate', label: 'Fecha instalacion', align: 'center', format: (value) => value.toLocaleString('en-US'), },
    { id: 'title', label: 'Proyecto', align: 'center' },
    {
        id: 'sale',
        label: 'Valor',
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    { id: 'quote', label: 'Cotización', align: 'center' },
    { id: 'pays', label: 'Pagos', align: 'center' },
    { id: 'editicon', label: '', align: 'center' },

];


const Row = ({ row, setNewProject, setOpenModal }) => {

    console.log(row)


    const [open, setOpen] = React.useState(false);
    const [projectSigns, setProjectSigns] = useState([])
    const [openModalPays, setOpenModalPays] = useState(false)


    const handleEditProject = () => {
        setOpenModal(true)
        setNewProject(row)
    }


    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="center">{row?.instalationDate}</TableCell>
                <TableCell align="center">{row?.title}</TableCell>
                <TableCell align="center">${row?.sale}</TableCell>
                <TableCell align="center">
                    {
                        row?.quote ? (
                            <a href={row?.quote} target='_blank'>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                >
                                    <OpenInNewIcon />
                                </IconButton>
                            </a>
                        )
                            : 'Sin cotización'
                    }
                </TableCell>
                <TableCell align="center">
                    {
                        row?.pays?.length > 0 ? (
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpenModalPays(true)}
                            >
                                <OpenInNewIcon />
                            </IconButton>
                        ) : 'Sin pagos'
                    }

                    {/* {
                        row?.pays?.length > 0 ? row?.pays?.map((pay, index) => (
                            <IconButton
                                aria-label="expand row"
                                size="small"
                            // onClick={() => setOpen(!open)}
                            >
                                <OpenInNewIcon />
                            </IconButton>
                        )) : 'Sin pagos'
                    } */}
                </TableCell>
                <TableCell align="center">
                    <IconButton
                        // aria-label="expand row"
                        size="small"
                        onClick={() => handleEditProject()}
                    >
                        <Edit />
                    </IconButton>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Letreros
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Cantidad</TableCell>
                                        <TableCell align='center'>Imagen</TableCell>
                                        <TableCell align="center">Letrero</TableCell>
                                        <TableCell align="center">Valor ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row?.projectSigns.map((sign, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{sign?.quantity}</TableCell>
                                            <TableCell component="th" scope="row" align='center'>
                                                <img src={sign?.sign?.images[0]} alt={sign?.sign?.title} height='100px' />
                                            </TableCell >
                                            <TableCell align='center'>{sign?.sign?.title}</TableCell>
                                            <TableCell align="center">{sign?.sign?.sale || 0}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

            <Modal
                open={openModalPays}
                onClose={() => setOpenModalPays(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={
                    {
                        display: 'flex',
                        alignItems: 'center',
                    }
                }
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
                        overflowY: 'auto',
                        p: 2,
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Pagos
                    </Typography>
                    <ModalPaysview pays={row?.pays} />
                </Card>
            </Modal>


        </React.Fragment >
    );
}



export default function ProjectsList({ rows, setNewProject, setOpenModal }) {

    console.log(rows)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead
                    // sx={{ backgroundColor: '#222', color: '#ffffff' }}
                    >
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <Row key={row.id} row={row} setOpenModal={setOpenModal} setNewProject={setNewProject} />
                                    // <h1>dasd</h1>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>

    )
}

