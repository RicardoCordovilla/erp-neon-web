import { Button, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { uploadFile } from '../../../utils/firebase/config';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

const fileTypes = ["JPG", "JPEG", "PNG", "PDF"];

const DragDropFile = ({ setImages, images }) => {

    const [file, setFile] = useState(null);
    const [imageSrc, setImageSrc] = useState()
    const [path, setPath] = useState('images/')
    const [uploading, setUploading] = useState(false)


    const handleChange = (file) => {
        const auxname=file[0].name.split(' ').join('').trim()
        setFile(file[0]);
        console.log(auxname)
        const reader = new FileReader()
        let filePath = file[0].type.includes('image') ? 'images/' : 'files/'
        filePath += auxname
        console.log(filePath)
        setPath(filePath)
        reader.onload = () => {
            const imgUrl = reader.result
            setImageSrc(imgUrl)
        }
        reader.readAsDataURL(file[0])
    };



    const uploadImage = async () => {

        setUploading(true)
        const result = await uploadFile(file, path)
            .then(response => {
                console.log(response)
                setImages([...images, response])
                setImageSrc(null)
                setFile(null)
                setUploading(false)
            })
            .catch(err => {
                console.log(err)
            })

    }


    return (
        <div className="App">
            {/* <h1>Hello To dasdsa & Drop Files</h1> */}
            {
                file && file.type.includes('image')
                    ? <img
                        objectFit="contain"
                        style={{ width: "300px", height: "300px", objectFit: "cover" }}
                        src={imageSrc} alt=""
                    />
                    :
                    file &&
                    <Typography variant="body1" color="text.secondary" >
                        {file.name}
                    </Typography>

            }

            <FileUploader
                multiple={true}
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                label="Subir archivo"
                hoverTitle="Arrastra y suelta tus archivos aquí"
            />
            <Button
                variant="contained"
                onClick={uploadImage}
                disabled={!file || uploading}
            >Upload
            </Button>
        </div>
    )
}

export default DragDropFile