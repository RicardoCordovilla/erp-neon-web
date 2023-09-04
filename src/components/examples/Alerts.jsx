import { Alert, AlertTitle, Box, Button, Snackbar } from '@mui/material'
import React, { useState } from 'react'

const Alerts = () => {

    const [open, setOpen] = useState(true)


    return (
        <div>
            <h1>Alerts</h1>
            <Button onClick={() => setOpen(true)} >Open</Button>
            <Box sx={{ width: '100%', display: 'grid', gap: '1rem' }}>

                {/* <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    This is an error alert — check it out!</Alert>
                <Alert severity="warning">This is a warning alert — check it out!</Alert>
                <Alert severity="info" variant='filled'>This is an info alert — check it out!</Alert> */}

                <Snackbar
                    open={open}
                    autoHideDuration={500}
                    // onClose={() => setOpen(false)}
                >
                    <Alert severity="success"
                        onClose={() => setOpen(false)}
                        autohide={500}
                        variant='filled'
                    >This is a success alert — check it out!</Alert>
                </Snackbar>
            </Box>
        </div>
    )
}

export default Alerts