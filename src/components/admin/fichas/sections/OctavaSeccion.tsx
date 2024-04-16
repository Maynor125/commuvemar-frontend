
import { Box, Checkbox, FormControlLabel, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Datatable from '../../datatable/Datatable';
import { ReadOnlyTextField } from '../ReadOnlyInput';
import { getDatosSection } from '@/services/datoSection';

const OctavaSeccion = () => {
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
          setDataColums(data);
          const titulos = data.map((obj: any) => ({
              descripcion: obj.titulo,
          }))
      }
      fetchData()
    },[dataColums]);

    const columns = [
        {
            field:'frecuenciaCorte',
            headerName:dataColums[0]?.titulo,
            headerClassName:'header-grid',
            width:250
        },
        {
            field:'herramientasUsadas',
            headerName:dataColums[1]?.titulo,
            headerClassName:'header-grid',
            width:250
        },
        {
            field:'materialEnvase',
            headerName:dataColums[2]?.titulo,
            headerClassName:'header-grid',
            width:295
        }, 
        {
            field:'precio',
            headerName:dataColums[3]?.titulo,
            headerClassName:'header-grid',
            width:200
        }, 
    ]
  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
      <Typography variant="h6" color={theme.palette.secondary.light}>Cosecha y pos cosecha del cacao </Typography>
      <Datatable columns={columns} rows={dataRows} />
      <Box  sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Box sx={{width:'50rem'}}>
          <Typography color={theme.palette.secondary.contrastText}>Mano de obra</Typography>
          <FormControlLabel sx={{color:theme.palette.secondary.contrastText}} control={<Checkbox  defaultChecked readOnly />} label="Familiar" />
          <FormControlLabel disabled control={<Checkbox />} label="Contratada" />
        </Box>
        <ReadOnlyTextField
          label="Precio"
          value="2000.00"
        />
        <ReadOnlyTextField
          label="Cantidad de dias"
          value="5"
        />
      </Box>
      </Box>
  )
}

export default OctavaSeccion