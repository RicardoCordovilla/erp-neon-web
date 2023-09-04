import { Box, Card, CardActionArea, CardContent, IconButton, Typography } from '@mui/material'
import React from 'react'
import Trash from '@mui/icons-material/Delete';


const ImagesContainer = ({ images, setImages }) => {
    console.log(images)
    return (
        <Box>
            {/* <Typography variant='h6'>
                Imagenes
            </Typography> */}
            <CardContent sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                gap: '1rem',
                width: '100%',
            }}>
                {
                    images?.map((image, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '1rem',
                                width: 'fit-content',
                            }}
                        >
                            <img
                                src={image}
                                alt="imagen"
                                width='90%'
                                height='90%'
                                style={{
                                    objectFit: 'cover',
                                    borderRadius: '1rem',
                                    maxWidth: '200px',
                                    maxHeight: '200px',
                                }}
                            />
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    top: '0',
                                    right: '0',
                                    backgroundColor: 'black',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'red',
                                        color: 'white',
                                    },
                                }}

                                onClick={() => {
                                    const newImages = [...images]
                                    newImages.splice(index, 1)
                                    setImages(newImages)
                                }}
                            >
                                <Trash
                                    fontSize='small'
                                />
                            </IconButton>
                        </Box>
                    ))
                }

            </CardContent>
        </Box>

    )
}

export default ImagesContainer