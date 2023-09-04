import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AbcIcon from '@mui/icons-material/Abc';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import CategoryIcon from '@mui/icons-material/Category';

import { NavLink } from "react-router-dom/dist";

const NavListDrawer = ({ setOpen }) => {

    const navList = [
        // {
        //     title: 'Ventas',
        //     icon: <AttachMoneyIcon />,
        //     path: '/ventas'
        // },
        // {
        //     title: 'Cotizaciones',
        //     icon: <ReceiptIcon />,
        //     path: '/cotizaciones'
        // },
        {
            title: 'Proyectos',
            icon: <AccountTreeIcon />,
            path: '/projects'
        },
        {
            title: 'Letreros',
            icon: <AbcIcon />,
            path: '/signs'
        },
        // {
        //     title: 'Facturas',
        //     icon: <ReceiptLongIcon />,
        //     path: '/facturas'
        // },
        // {
        //     title: 'Compras',
        //     icon: <ShoppingCartIcon />,
        //     path: '/compras'
        // },
        {
            title: 'Clientes',
            icon: <PermContactCalendarIcon />,
            path: '/customers'
        },
        {
            title: 'Productos',
            icon: <CategoryIcon />,
            path: '/products'
        },

    ]


    return (
        <Box sx={{ width: 250 }} >
            <nav>
                <nav>
                    <List>
                        <ListItem disablePadding
                            component={NavLink}
                            to='/'
                            onClick={() => setOpen(false)}
                        >
                            <ListItemButton>
                                <ListItemText>
                                    App
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                        {/* <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText>
                                    Spam
                                </ListItemText>
                            </ListItemButton>
                        </ListItem> */}
                    </List>
                </nav>
                <Divider />

                <List>
                    {navList.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemButton
                                component={NavLink}
                                to={item.path}
                                onClick={() => setOpen(false)}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText>
                                    {item.title}
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </nav>
        </Box>
    )
}

export default NavListDrawer