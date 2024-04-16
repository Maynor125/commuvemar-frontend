import { Box, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Datatable from '../../datatable/Datatable';
import { ReadOnlyTextField } from '../ReadOnlyInput';
import { getDatosSection } from '@/services/datoSection';

const SextaSeccion = () => {
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
            const data = await allGetData(9);
            setDataColums(data);
            const titulos = data.map((obj: any) => ({
                descripcion: obj.titulo,
            }))
        }
        fetchData()
      },[dataRows]);

    const columns = [
        {
            field:'nombreAbono',
            headerName:dataColums[0]?.titulo,
            headerClassName:'header-grid',
            width:200
        },
        {
            field:'cantidadAplicada',
            headerName:dataColums[1]?.titulo,
            headerClassName:'header-grid',
            width:200
        },
        {
            field:'origen',
            headerName:dataColums[2]?.titulo,
            headerClassName:'header-grid',
            width:200
        }, 
        {
            field:'mesAplicado',
            headerName:dataColums[3]?.titulo,
            headerClassName:'header-grid',
            width:199
        }, 
        {
            field:'cualCultivo',
            headerName:dataColums[4]?.titulo,
            headerClassName:'header-grid',
            width:197
        }, 
    ]
  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
    <Typography variant="h6" color={theme.palette.secondary.light}>Aplicación de Fertilizantes Edáficos y Foliares</Typography>
    <Datatable columns={columns} rows={dataRows} getRowId={(row)=>row.nombreAbono}/>
    <Box sx={{marginTop:'1rem'}}>
      <Typography color={theme.palette.secondary.light}>
      Tiene fertilizantes orgánicos almacenados Actualmente en la Finca
      </Typography>
      <Box sx={{display:'flex',gap:'1rem',marginTop:'.3rem'}}>
      <ReadOnlyTextField
          label="Origen"
          value=""
        />
      <ReadOnlyTextField
          label="Cantidad"
          value=""
        />
      </Box>
    </Box>
    </Box>
  )
}

export default SextaSeccion