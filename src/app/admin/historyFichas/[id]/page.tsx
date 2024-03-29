'use client'

import { Box, Button, InputAdornment, TextField, useTheme } from '@mui/material'
import React, { useCallback, useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import BannerFicha from '@/components/admin/fichas/BannerFicha';
import html2pdf from 'html2pdf.js';

const Ficha = ({params}:any) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const downloadPDF = useCallback(() => {
    const opt = {
      margin: 1,
      filename: `Ficha de inspeccion interna (${params.id}).pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    if (containerRef.current) {
      html2pdf().set(opt).from(containerRef.current).save();
    }
  }, []);

  const theme = useTheme();
  return (  
    <Box>
       <BannerFicha/>
       <Box sx={{marginY:'2rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
       <TextField
            variant='standard'
            placeholder='Buscar por seccion'
            InputProps={{
              disableUnderline: true, // Deshabilita el borde inferior
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
          <Button onClick={downloadPDF} sx={{textTransform:'none'}} color='error' variant='contained'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" color="#ffffff" fill="none" style={{marginRight:'5px'}}>
    <path d="M7 18V15.5M7 15.5V14C7 13.5286 7 13.2929 7.15377 13.1464C7.30754 13 7.55503 13 8.05 13H8.75C9.47487 13 10.0625 13.5596 10.0625 14.25C10.0625 14.9404 9.47487 15.5 8.75 15.5H7ZM21 13H19.6875C18.8625 13 18.4501 13 18.1938 13.2441C17.9375 13.4882 17.9375 13.881 17.9375 14.6667V15.5M17.9375 18V15.5M17.9375 15.5H20.125M15.75 15.5C15.75 16.8807 14.5747 18 13.125 18C12.7979 18 12.6343 18 12.5125 17.933C12.2208 17.7726 12.25 17.448 12.25 17.1667V13.8333C12.25 13.552 12.2208 13.2274 12.5125 13.067C12.6343 13 12.7979 13 13.125 13C14.5747 13 15.75 14.1193 15.75 15.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M15 22H10.7273C7.46607 22 5.83546 22 4.70307 21.2022C4.37862 20.9736 4.09058 20.7025 3.8477 20.3971C3 19.3313 3 17.7966 3 14.7273V12.1818C3 9.21865 3 7.73706 3.46894 6.55375C4.22281 4.65142 5.81714 3.15088 7.83836 2.44135C9.09563 2 10.6698 2 13.8182 2C15.6173 2 16.5168 2 17.2352 2.2522C18.3902 2.65765 19.3012 3.5151 19.732 4.60214C20 5.27832 20 6.12494 20 7.81818V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M3 12C3 10.1591 4.49238 8.66667 6.33333 8.66667C6.99912 8.66667 7.78404 8.78333 8.43137 8.60988C9.00652 8.45576 9.45576 8.00652 9.60988 7.43136C9.78333 6.78404 9.66667 5.99912 9.66667 5.33333C9.66667 3.49238 11.1591 2 13 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
            Descargar en PDF
          </Button>
       </Box>
       <Box ref={containerRef} sx={{background:theme.palette.background.paper, minHeight:'90vh',borderRadius:'8px',marginBottom:'1.5rem',padding:'1.5'}}>

       </Box>
    </Box>
  )
}

export default Ficha