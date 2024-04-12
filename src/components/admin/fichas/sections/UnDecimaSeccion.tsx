
import { Box, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Datatable from '../../datatable/Datatable';
import { getDatosSection } from '@/services/datoSection';

const UnDecimaSeccion = () => {
    const theme = useTheme();
    const [dataRows, setDataRows] = useState<any[]>([]);
    const columns = [
        {
            field:'aspecto',
            headerName:'Aspecto',
            headerClassName:'header-grid',
            width:600
        },
        {
            field:'respuesta',
            headerName:'Respuesta',
            headerClassName:'header-grid',
            width:95
        },
        {
            field:'obserovacion',
            headerName:'Observacion',
            headerClassName:'header-grid',
            width:300
        }, 
    ]
    const allGetData = async (id: number) => {
        try {
          const response = await getDatosSection(id);
          console.log("datos de esta seccion", response.data);
    
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
    { aspecto: string; respuesta: string; observacion: string }[]
  >([]);

   //Mostrar todos los datos que pertenecen a la seccion en la que nos encontramos
   useEffect(() => {
    const fetchData = async () => {
      const data = await allGetData(15);
      setDataRows(data);
      const titulos = data.map((obj: any) => ({
        aspecto: obj.titulo,
        respuesta: "",
        observacion: "",
      }));
      setDatos(titulos);
    };
    fetchData();
  }, [dataRows]);

  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
    <Typography variant="h6" color={theme.palette.secondary.light}>Resposabilidad social</Typography>
    <Datatable columns={columns} rows={datos} getRowId={(row)=>row.aspecto}/>
    </Box>
  )
}

export default UnDecimaSeccion