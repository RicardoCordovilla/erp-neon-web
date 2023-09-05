import { Box, Card, Checkbox, IconButton, ImageList, ImageListItem, ImageListItemBar, Radio } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { getUrlImages } from '../../../utils/firebase/config';
import { Check, CheckBox } from '@mui/icons-material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ImagePicker from './ImagePicker';


const ModalGalery = ({ selectedImages, setSelectedImages }) => {

    const [images, setImages] = useState(null)

    useEffect(() => {
        getUrlImages('images')
            .then(response => {
                console.log(response)
                setImages(response)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        console.log(selectedImages)
    }, [selectedImages])


    return (
        <Card
            sx={{
                // width: '90%',
                height: '100%',
                backgroundColor: '#d8c8e8',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '10px',
                pt: 2,
                overflow: 'auto',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: '2rem',
                    width: '100%',
                }}
            >
                <ImagePicker images={images} setImages={setImages} accept={'image/*'} />
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
                    gap={'1rem'}
                >
                    {images && images.map((item) => {
                        const cols = item.featured ? 2 : 1;
                        const rows = item.featured ? 2 : 1;

                        return (
                            <ImageListItem key={item} cols={cols} rows={rows}
                                sx={{
                                    opacity: selectedImages.includes(item) ? 0.5 : 1,
                                }}
                            >
                                <img
                                    src={item}
                                    style={
                                        {
                                            width: '150px',
                                            height: '150px',
                                            objectFit: 'cover',
                                            borderRadius: '10px',
                                        }
                                    }
                                />
                                <ImageListItemBar
                                    sx={{
                                        background: 'rgba(0, 0, 0, 0.5)',
                                        borderRadius: '10px 10px 0px 0px',
                                        height: '20%',
                                    }}
                                    position="top"
                                    actionIcon={
                                        < IconButton
                                            sx={{ color: 'white' }}
                                            onClick={() => {
                                                if (selectedImages.includes(item)) {
                                                    setSelectedImages(selectedImages.filter(image => image !== item))
                                                } else {
                                                    setSelectedImages([...selectedImages, item])
                                                }
                                            }}
                                        >
                                            <Checkbox sx={{ color: 'white' }}
                                                checked={selectedImages.includes(item)}
                                            />
                                        </IconButton>
                                    }
                                    actionPosition="left"
                                />
                            </ImageListItem>
                        );
                    })}
                </ImageList>

            </Box>



        </Card >
    )
}

export default ModalGalery