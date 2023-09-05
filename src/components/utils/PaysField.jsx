import React, { useState } from 'react'
import PaysContainer from './PaysContainer'
import { Box, Button, Card, IconButton, TextField, Typography } from '@mui/material'
import ImagePickerCloud from './ImagePickerCloud'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DragDropFile from '../examples/DragDropFIle';


const PaysField = ({ pays, setPays }) => {

    const [date, setDate] = useState(new Date())
    const [value, setValue] = useState('')
    const [image, setImage] = useState([])


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '1rem',
                width: '100%',
                // padding: '0.5rem',
            }}
        >

            <TextField
                label='Fecha'
                type='date'
                value={date}
                onChange={e => setDate(e.target.value)}
                sx={{
                    width: '10rem',
                    minWidth: '5rem',
                }}
            />

            <TextField
                label='Valor'
                type='number'
                value={value}
                onChange={e => setValue(e.target.value)}
                sx={{
                    width: '7rem',
                    // minWidth: '5rem',
                    // maxWidth: '10rem',
                }}
            />

            {
                image.length > 0 &&
                <img src={image} alt=""
                    style={{
                        width: '30%',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '1rem',
                    }}
                />
            }

            {
                image.length === 0 &&
                // <ImagePickerCloud setImages={setImage} images={image} />
                <DragDropFile setImages={setImage} images={image} />
            }

            <IconButton
                onClick={() => {
                    setPays([...pays, { date, value, image }])
                    setDate(new Date())
                    setValue('')
                    setImage('')
                }}
                disabled={value === '' || image.length === 0 || date === ''}
            >
                <AddCircleOutlineIcon />
            </IconButton>
        </Box>
    )
}

export default PaysField