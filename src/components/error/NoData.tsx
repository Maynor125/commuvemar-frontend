import Image from 'next/image'
import React from 'react'
import noData from '../../../public/images/admin/nodata.jpg'
import { Box } from '@mui/material'

const NoData = () => {
  return (
    <Box sx={{
        width:'90%',
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
    }}>
        <Image width={500} height={500} alt='imagen de no datos' src={noData} />
    </Box>
  )
}

export default NoData