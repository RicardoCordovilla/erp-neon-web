import { Box, Card, Fab, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { uploadFile } from '../../../utils/firebase/config';
import ModalGalery from './ModalGalery';



const ImagePickerCloud = ({ setImages, images=[] }) => {

    const [imageSrc, setImageSrc] = useState()
    const [uploadingImage, setUploadingImage] = useState(false)
    const [imageUpload, setimageUpload] = useState()
    const [fileName, setFileName] = useState()

    const [openModalGallery, setOpenModalGallery] = useState(false)

    const handleIconClick = () => {
        console.log('handleSelect')
    }


    return (

        <>
            <Card
                sx={{
                    width: 'fit-content',
                    backgroundColor: '#d8c8e8',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    pt: 0,
                }}
            >
                <Fab component="span" sx={{ m: 1 }} color="primary" aria-label="add"
                    onClick={() => setOpenModalGallery(true)}
                >
                    <AddPhotoAlternateIcon />
                </Fab>

            </Card>

            <Modal
                open={openModalGallery}
                onClose={() => setOpenModalGallery(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        width: '90%',
                        height: '90%',
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                    }}
                >
                    <ModalGalery setOpenModalGallery={setOpenModalGallery}
                        selectedImages={images} setSelectedImages={setImages}
                    />
                </Box>
            </Modal>

        </>

    );
};

export default ImagePickerCloud;
