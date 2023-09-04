import { Box, Card, IconButton, Typography } from '@mui/material'
import React from 'react'
import Trash from '@mui/icons-material/Delete';


const PaysContainer = ({ setPays, pays }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        // width: '100%',
      }}
      maxWidth={'500px'}
      width={'100%'}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
      }}>
        {
          pays.map((pay, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '1rem',
                width: '100%',
              }}
            >
              <Typography variant={'body1'}>{pay?.value}</Typography>
              <Typography variant={'body1'}>{pay?.date}</Typography>
              <img
                src={pay?.image}
                alt="imagen"
                width='200px'
                height='200px'
                style={{
                  objectFit: 'cover',
                  borderRadius: '1rem',
                }}
              />
              <IconButton
                onClick={() => {
                  const newPays = pays.filter((item, i) => i !== index)
                  setPays(newPays)
                }}
              >
                <Trash />
              </IconButton>
            </Box>
          ))
        }

      </Box>

      {/* <ImagesContainer images={pays} setImages={setPays} /> */}
    </Box>

  )
}

export default PaysContainer