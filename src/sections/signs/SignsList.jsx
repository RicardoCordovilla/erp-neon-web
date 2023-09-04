import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Collapse, IconButton, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Edit } from '@mui/icons-material';


const columns = [
    { id: 'viewicon', label: ' ', align: 'center' },
    { id: 'images[0]', label: 'Imagen', with: 250, align: 'center' },
    { id: 'title', label: 'Name', minWidth: 100, align: 'center' },
    // {
    //     id: 'startProject',
    //     label: 'Fecha-fin',
    //     // minWidth: 170,
    //     align: 'center',
    //     format: (value) => value.toLocaleString('en-US'),
    // },
    {
        id: 'cost',
        label: 'Valor',
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    { id: 'rowicon', label: ' ', align: 'center' },

];

const Row = ({ row, setNewSign, setOpenModal }) => {

    const [open, setOpen] = React.useState(false);
    const [signProducts, setSignProducts] = useState([])
    console.log(signProducts)

    const handleEditSing = () => {
        setOpenModal(true)
        setNewSign(row)
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
                <TableCell component="th" scope="row" align='center'>
                    {
                        row?.images && row?.images[0] &&
                        < img src={row?.images[0]} alt={row?.title} height='100px' />
                    }
                </TableCell>
                <TableCell align="center">{row?.title}</TableCell>
                <TableCell align="center">${row?.sale}</TableCell>
                <TableCell align="center">
                    <IconButton
                        // aria-label="expand row"
                        size="small"
                        onClick={() => handleEditSing()}
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
                                Productos
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>Producto</TableCell>
                                        <TableCell align='center'>Cantidad</TableCell>
                                        <TableCell align="center">Valor</TableCell>
                                        <TableCell align="center">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row?.signProducts?.map((product, index) => (
                                        <TableRow key={index}>
                                            {/* <TableCell component="th" scope="row" align='center'>
                                                {product?.id || '..'}
                                            </TableCell > */}
                                            <TableCell align='center'>{product?.product?.name}</TableCell>
                                            <TableCell align='center'>{product?.quantity}</TableCell>
                                            <TableCell align="center">{product?.product?.price || 0}</TableCell>
                                            <TableCell align="center">
                                                {product.quantity * product?.product?.price || 0}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


export default function SignsList({ rows, setNewSign, setOpenModal }) {

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

    useEffect(() => {
    }, [rows])




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
                                    <Row key={row.id} row={row} setNewSign={setNewSign} setOpenModal={setOpenModal} />
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

// export default SignsList