import { Box, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Datatable from '../../datatable/Datatable';
import { getDatosSection } from '@/services/datoSection';

const CuartaSeccion = () => {
    const theme = useTheme();
    const [dataRows, setDataRows] = useState<any[]>([]);

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
  
    const [datos, setDatos] = useState<
    { plagasEnfermedadaes: string; percepcionIntensidad: string;}[]
  >([]);
     //Mostrar todos los datos que pertenecen a la seccion en la que nos encontramos
  useEffect(() => {
    const fetchData = async () => {
      const data = await allGetData(7);
      setDataRows(data);
      const titulos = data.map((obj: any) => ({
        plagasEnfermedadaes: obj.titulo,
        percepcionIntensidad: "",
       
      }));
      setDatos(titulos);
    };
    fetchData();
  }, [dataRows]);

    const columns = [
        {
            field:'plagasEnfermedadaes',
            headerName:'Plagas y enfermedades',
            headerClassName:'header-grid',
            width:250
        },
        {
            field:'percepcionIntensidad',
            headerName:'Percepción de la intensidad de ataque',
            headerClassName:'header-grid',
            width:746
        },
    ]

  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
    <Typography variant="h6" color={theme.palette.secondary.light}>Manejo de plagas y enfermedades</Typography>
    <Datatable columns={columns} rows={datos} getRowId={(row)=>row.plagasEnfermedadaes}/>
    </Box>
  )
}

export default CuartaSeccion