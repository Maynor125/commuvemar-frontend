import { Box, Checkbox, FormControlLabel, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Datatable from '../../datatable/Datatable';
import InfoDatosForm from '@/components/forms/InfoDatosForm';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import MessageGlobal from '@/components/message/MessageGlobal';

interface Props{
  aprobadoSinC:string;
  aprobadoConC:string;
  sancionado:string;
}

const DecisionComite = () => {
    const theme = useTheme();
    const infoDatosState = useSelector((state: RootState) => state.infoDatos);
    const [showMessage, setShowMessage] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [hayDesicion, setHayDesicion] = useState(false);


    const [dataRows, setDataRows] = useState<Props[]>([]);
    const [datoSeleccionado, setDatoSeleccionado] = useState<number | null>(null);

    const selecciondeDato = (value: number) => {
      if (datoSeleccionado === value) {
          // Si el mismo checkbox se selecciona nuevamente, deseleccionarlo
          setDatoSeleccionado(null);
      } else {
          setDatoSeleccionado(value);
      }
  };

    const onSubmit =()=>{
      setMessage("Se ah creado la decision")
      setShowMessage(true);
    setTimeout(() => setShowMessage(false), 4000);
    }

    useEffect(()=>{
     // Encontrar el elemento en infoDatosState.data con IDDato igual a 72,73 y 74
    const elemento = infoDatosState.data.find((item: any) => item.IDDato === 72);
    const elemento1 = infoDatosState.data.find((item: any) => item.IDDato === 73);
    const elemento2 = infoDatosState.data.find((item: any) => item.IDDato === 74);

    if(elemento || elemento1 || elemento2){
      setHayDesicion(true);
      const Datos = (()=>{
        
        return [{
          aprobadoSinC:elemento ? elemento?.informacion : '',
          aprobadoConC:elemento1 ? elemento1?.informacion : '',
          sancionado: elemento2 ? elemento2?.informacion : '',
        }]
      }
    )  
    setDataRows(Datos);
    }
    },[infoDatosState,onSubmit]);
    
    const columns = [
        {
            field:'aprobadoSinC',
            headerName:'Aprobado sin condiciones',
            headerClassName:'header-grid',
            width:332
        },
        {
            field:'aprobadoConC',
            headerName:'Aprobado con condiciones',
            headerClassName:'header-grid',
            width:332
        },
        {
            field:'sancionado',
            headerName:'Sancionado',
            headerClassName:'header-grid',
            width:332
        }, 
    ]

  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
       <Typography variant="h6" color={theme.palette.secondary.light}>Decisión del comité de aprobación y sanciones del SIC  </Typography>
       <Box>
        {
          !hayDesicion &&  <Box>
        <FormControlLabel control={<Checkbox checked={datoSeleccionado === 72}  onChange={() => selecciondeDato(72)} />} label="Aprobado sin condiciones " />
        <FormControlLabel control={<Checkbox checked={datoSeleccionado === 73} onChange={() => selecciondeDato(73)}/>} label="Aprobado con condiciones " />
        <FormControlLabel control={<Checkbox checked={datoSeleccionado === 74} onChange={() => selecciondeDato(74)}/>} label="Sancionado" />
        </Box>
        }
       
        <InfoDatosForm IDFicha={1} IDDato={datoSeleccionado} onClick={onSubmit}/>
       </Box>
      <Datatable columns={columns} rows={dataRows} />
        <Box sx={{display:'flex',alignItems:'center',marginTop:'4rem',justifyContent:'space-around'}}>
     <div style={{ position: 'relative' }}>
      <Typography color={theme.palette.secondary.contrastText}>
        Presidente
      </Typography>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, borderBottom: `1px dashed ${theme.palette.secondary.contrastText}` }} />
    </div>
     <div style={{ position: 'relative' }}>
      <Typography color={theme.palette.secondary.contrastText}>
        Vocal
      </Typography>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, borderBottom: `1px dashed ${theme.palette.secondary.contrastText}` }} />
    </div>
     <div style={{ position: 'relative' }}>
      <Typography color={theme.palette.secondary.contrastText}>
        Secretario
      </Typography>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, borderBottom: `1px dashed ${theme.palette.secondary.contrastText}` }} />
    </div>
     </Box>
     <MessageGlobal show={showMessage} message={message} type='success' action='Creo'/>
    </Box>
  )
}

export default DecisionComite