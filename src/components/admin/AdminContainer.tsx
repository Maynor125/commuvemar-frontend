'use client'

import { Box, useTheme } from "@mui/material"

const AdminContainer = ({ children }: { children: React.ReactNode }) => {
    const theme = useTheme();
  return (
    <Box component='main' bgcolor={theme.palette.background.default} sx={{
        padding:'1.5rem',
        display: 'flex',
    }}>
    {children}
    </Box>
  )
}

export default AdminContainer