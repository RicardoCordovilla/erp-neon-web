import { Box, Card, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import React from 'react'

const ModalPaysview = ({ pays }) => {
    console.log(pays)
    return (
        <Box
            sx={{ width: '100%', display: 'grid', gap: '1rem', p: '1rem' }}>

            <ImageList
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    // justifyContent: 'center',
                    flexWrap: 'wrap',
                    px: 4,
                }}
                // rowHeight={200}
                gap={'2rem'}
            >


                {pays.map((item, index) => {
                    return (
                        <ImageListItem key={index}
                            sx={{
                                width: '250px',
                                height: '250px',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.3) translate(30%, -30%)',
                                    boxShadow: '0 0 20px rgba(0,0,0,0.3)',
                                }
                            }}
                        >
                            <img
                                src={item?.image[0]}
                                style={
                                    {
                                        width: '250px',
                                        height: '250px',
                                        objectFit: 'cover',
                                        borderRadius: '10px',
                                        padding: '5px',
                                    }
                                }
                                alt={item?.image[0]}
                                loading='lazy'
                            />
                            <ImageListItemBar
                                subtitle={item?.date}
                                title={<span>Valor: {item?.value}</span>}
                                position='below'

                            />
                        </ImageListItem>
                    );
                })
                }

            </ImageList>

        </Box>
    )
}

export default ModalPaysview