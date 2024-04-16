import { Box, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Datatable from '../../datatable/Datatable'
import { getDatosSection } from '@/services/datoSection';

const TerceraSeccion = () => {
    const theme = useTheme();
    const [dataRows, setDataRows] = useState<any[]>([]);
    const [dataColums, setDataColums] = useState<any[]>([]);

    const allGetData = async (id: number) => {
        try {
          const response = await getDatosSection(id);
          //console.log("datos de esta seccion", response.data);
    
          // Verificar si response.data es undefined
          if (response.data === undefined) {
            return []; // Devolver un array vacío si no hay datos
          } else {
            return response.data;
          }
        } catch (error) {
          console.error(error);
          return []; // En caso de error, devolver un array vacío para evitar errores de tipo
        }
      };

      useEffect(()=>{
        const fetchData = async () => {
            const data = await allGetData(6);
            setDataRows(data);
            const titulos = data.map((obj: any) => ({
                descripcion: obj.titulo,
            }))
        }
        fetchData()
      },[dataRows]);

    const columns = [
        {
            field:'nombreParcela',
            headerName:dataRows[0]?.titulo,
            headerClassName:'header-grid',
            width:250
        },
        {
            field:'areaEnMz',
            headerName:dataRows[1]?.titulo,
            headerClassName:'header-grid',
            width:250
        },
        {
            field:'cultivo',
            headerName:dataRows[2]?.titulo,
            headerClassName:'header-grid',
            width:250
        }, 
        {
            field:'insumosUtilizados',
            headerName:dataRows[3]?.titulo,
            headerClassName:'header-grid',
            width:245
        }, 
    ]

  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
      <Typography variant="h6" color={theme.palette.secondary.light}>Informacion de parcelas</Typography>
      <Datatable columns={columns} rows={dataColums} />
      </Box>
  )
}

export default TerceraSeccion