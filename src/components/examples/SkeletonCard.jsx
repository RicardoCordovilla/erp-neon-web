import { Box, Skeleton } from '@mui/material'
import React from 'react'

const SkeletonCard = () => {
  return (
    <>
      <Box sx={{ width: '100%', display: 'grid', gap: '1rem' }}>
        <Skeleton
          animation='wave'
          variant='rounded'
          width='400px'
          height='200px'
          // sx={{ margin: '1rem' }}
        />
        <Skeleton
          animation='wave'
          variant='text'
          width='40%'
          // sx={{ margin: '1rem' }}
        />
      </Box>
    </>
  )
}

export default SkeletonCard