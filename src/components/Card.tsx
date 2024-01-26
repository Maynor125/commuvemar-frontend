import { Box, useTheme } from '@mui/material'
import React from 'react'

interface Props{
    className:string,
    children:React.ReactNode
}

const Card: React.FC<Props> = ({className,children}) => {
  const theme = useTheme();
  return (
    <Box component='article'
    sx={{
      "&:hover": {
        backgroundColor: theme.palette.background.paper, // Color de fondo al pasar el ratón sobre el box
      },
    }} className={`card ${className}`}>
       {children}
    </Box>
  )
}

export default Card