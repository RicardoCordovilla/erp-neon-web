import { useSnackbar } from 'notistack'
import React from 'react'

const Snacks = () => {

    const { enqueueSnackbar } = useSnackbar()

    const handleClick = () => {
        enqueueSnackbar('I love snacks.',
            {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            }
        )

    }


    return (
        <>
            <h1>Sancks</h1>
            <button onClick={handleClick}>snack</button>
        </>
    )
}

export default Snacks