import React, { useState } from 'react'
import NavListDrawer from './NavListDrawer'
import { AppBar, Button, Drawer, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { NavLink } from 'react-router-dom/dist'

const Navbar = () => {

    const [open, setOpen] = useState(false)

    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton color='inherit' size='large'
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* <Typography sx={{ flexGrow: 1 }} >App</Typography> */}
                    <Button
                        color='inherit'
                        component={NavLink}
                        to='/'
                    >home</Button>
                    {/* <Button color='inherit'>Login</Button> */}

                </Toolbar>
            </AppBar>
            <Drawer
                open={open}
                anchor='left'
                onClose={() => setOpen(false)}
            >
                <NavListDrawer setOpen={setOpen} />
            </Drawer>
        </>
    )
}

export default Navbar