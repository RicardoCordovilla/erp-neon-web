import { Box, Button, TextField } from '@mui/material'
import React from 'react'

const Fields = () => {
    return (
        <>
            <h1>Fields</h1>
            <Box
                sx={{ width: '100%', display: 'grid', gap: '1rem' }}
            >
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    type='number'
                    fullWidth
                    helperText='helper'
                />
                <Button variant='contained' color='primary' type='submit'>Submit</Button>

            </Box>
        </>
    )
}

export default Fields