import { Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ImagePicker from './ImagePicker'

const QuoteContainer = ({ quote, setQuote }) => {

    const [quoteFileName, setQuoteFileName] = useState('')
    const [fileUrls, setFileUrls] = useState([quote])

    useEffect(() => {
        setQuote(fileUrls[0])
    }, [fileUrls])


    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                width: '100%',
                padding: '1rem',
            }}
        >
            <Typography variant='h6'>
                Cotizacion
            </Typography>
            <Typography variant='body1'>
                {quoteFileName}
            </Typography>
            {
                !quote &&
                <ImagePicker setImages={setFileUrls} setFileTitle={setQuoteFileName} accept={'.pdf, .doc, .docx'} />
            }

            <Typography variant='body1'>
                <a target='_blank' href={fileUrls[0]}>{quoteFileName || 'Ver Archivo'}</a>
            </Typography>
        </Card>
    )
}

export default QuoteContainer