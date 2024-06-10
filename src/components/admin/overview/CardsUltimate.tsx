import React, { useEffect, useState } from 'react'
import CardUltimate from "@/components/admin/overview/CardUltimate";
import { Box, Grid } from "@mui/material";
import { Ficha } from '@/types/ficha';
import { getAllFichas } from '@/services/fichas';
import { User } from '@/types/user';
import { getAllUsers } from '@/services/userW';
import { getProductors } from '@/services/productors';
import { Productors } from '@/types/productors';

const CardsUltimate = () => {
  const [fichas,setFichas] = useState<Ficha[]>([]);
  const [productors, setProductors] = useState<Productors[]>([]);
  const [cantidadProductors,setCantidadProductors] = useState(0);
  const [fichasUltimoMes, setFichasUltimoMes] = useState<Ficha[]>([]);
const [porcentajeUltimaSemana, setPorcentajeUltimaSemana] = useState<number>(0);
const [ultimasFichasTotales,setUltimasFichasTotales] = useState<number>(0);
const [porcentajeUltimaSemanaIngreso, setPorcentajeUltimaSemanaIngreso] = useState<number>(0);
const [usuariosMesActual, setUsuariosMesActual] = useState<number>(0);
const [porcentajeUltimaSemanaUsuarios, setPorcentajeUltimaSemanaUsuarios] = useState<number>(0);


//---------------------------------------------------------
const [users, setUsers] = useState<User[]>([]);


  const getAllFicha = async() =>{
    try {
      const response = await getAllFichas();
      if(response.data !== undefined){
        setFichas(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getAllUser = async () => {
    try {
      const response = await getAllUsers();
      console.log(response);
      if (response.data !== undefined) {
        setUsers(response.data);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllProductors = async () => {
    try {
      const response = await getProductors();
      console.log(response.data);
      if (response.data !== undefined) {
        setProductors(response.data);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
   getAllFicha();
   getAllUser();
   getAllProductors();
  },[]);

  useEffect(()=>{
    setCantidadProductors(productors.length);
  })


  // Informacion para la primera carta.
  useEffect(() => {
    // Filtrar fichas modificadas en el último mes y analizadas
    const hoy = new Date();
    const haceUnMes = new Date();
    haceUnMes.setMonth(hoy.getMonth() - 1);
    const fichasModificadasUltimoMes = fichas.filter(ficha =>
      ficha.updatedAt && new Date(ficha.updatedAt) > haceUnMes && ficha.analizada === true
    );
    setFichasUltimoMes(fichasModificadasUltimoMes);
  
    // Calcular el porcentaje de fichas analizadas en la última semana
    const haceUnaSemana = new Date();
    haceUnaSemana.setDate(hoy.getDate() - 7);
    const fichasAnalizadasUltimaSemana = fichas.filter(ficha =>
      ficha.updatedAt && new Date(ficha.updatedAt) > haceUnaSemana && ficha.analizada === true
    );
    const porcentaje = (fichasAnalizadasUltimaSemana.length / fichas.length) * 100;
    setPorcentajeUltimaSemana(porcentaje);
  }, [fichas]);

  
  // Informacion para la segunda carta.
  useEffect(() => {
    // Ordenar las fichas por fecha de creación (createdAt) de manera descendente
    const fichasOrdenadas = fichas.slice().sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });

    // Obtener las últimas fichas ingresadas
    const hoy = new Date();
    const haceUnaSemana = new Date();
    haceUnaSemana.setDate(hoy.getDate() - 7);
    const fichasIngresadasUltimaSemana = fichasOrdenadas.filter(ficha =>
      ficha.createdAt && new Date(ficha.createdAt) > haceUnaSemana
    );
    setUltimasFichasTotales(fichasOrdenadas.length);
    setPorcentajeUltimaSemanaIngreso((fichasIngresadasUltimaSemana.length / fichasOrdenadas.length) * 100);
  }, [fichas]);

  //Informacion para la tercera carta.
  useEffect(() => {
    // Calcular la cantidad de usuarios registrados en el mes actual
    const hoy = new Date();
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1); // Primer día del mes actual
    const usuariosDelMes = users.filter(user =>
      user.createAt && new Date(user.createAt) >= inicioMes
    );
    setUsuariosMesActual(usuariosDelMes.length);
  
    // Calcular el porcentaje de usuarios registrados en la última semana
    const haceUnaSemana = new Date();
    haceUnaSemana.setDate(hoy.getDate() - 7);
    const usuariosRegistradosUltimaSemana = users.filter(user =>
      user.createAt && new Date(user.createAt) >= haceUnaSemana
    );
    const porcentaje = (usuariosRegistradosUltimaSemana.length / users.length) * 100;
    setPorcentajeUltimaSemanaUsuarios(porcentaje);
  }, [users]);
  

  return (
    <Box>
    <Grid container
        spacing={2}
        justifyContent="space-between"
        marginTop=".5rem"
    >
      <Grid item xs={12} sm={6} md={4} lg={3}>
              <CardUltimate
        iconPath={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color="#7c3aed"
            fill="none"
          >
            <path
              d="M11.5143 2.09327C11.8265 1.96891 12.1735 1.96891 12.4857 2.09327C13.4921 2.49406 13.6887 4.03744 14.8762 4.12336C15.7124 4.18386 16.533 3.48677 17.3721 3.69574C17.7105 3.78003 18.0028 3.99579 18.186 4.29657C18.7472 5.21824 18.0229 6.57292 18.9383 7.33768C19.5743 7.86877 20.6251 7.80004 21.178 8.4511C21.4108 8.72534 21.5252 9.08303 21.4953 9.4437C21.4068 10.5166 20.0389 11.1876 20.3395 12.3439C20.5475 13.1443 21.4253 13.707 21.4953 14.5563C21.5252 14.917 21.4108 15.2747 21.178 15.5489C20.4832 16.3669 18.9808 16.0975 18.5476 17.2062C18.2434 17.9844 18.634 18.9677 18.186 19.7034C18.0028 20.0042 17.7105 20.22 17.3721 20.3043C16.3302 20.5637 15.2727 19.4445 14.2701 20.0758C13.5543 20.5264 13.2978 21.5835 12.4857 21.9067C12.1735 22.0311 11.8265 22.0311 11.5143 21.9067C10.7022 21.5835 10.4457 20.5264 9.72989 20.0758C8.73971 19.4524 7.65213 20.5593 6.62791 20.3043C6.28947 20.22 5.9972 20.0042 5.81405 19.7034C5.25286 18.7818 5.97704 17.427 5.0617 16.6623C4.42582 16.1312 3.37494 16.2 2.82204 15.5489C2.58921 15.2747 2.47484 14.917 2.50465 14.5563C2.57485 13.707 3.4524 13.1443 3.6605 12.3439C3.95808 11.1997 2.59204 10.5009 2.50465 9.4437C2.47484 9.08303 2.58921 8.72534 2.82204 8.4511C3.51676 7.63284 5.01899 7.90253 5.45238 6.79383C5.75662 6.0156 5.36608 5.03227 5.81405 4.29657C5.9972 3.99579 6.28947 3.78003 6.62791 3.69574C7.46705 3.48677 8.28757 4.18387 9.12378 4.12336C10.3113 4.03746 10.5079 2.49406 11.5143 2.09327Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M9 13.3333C9 13.3333 9.875 13.3333 10.75 15C10.75 15 13.5294 10.8333 16 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        backgroundColor="#EAD6FD"
        title="Fichas aprobadas"
        value="8"
        customColor="#7c3aed"
        lastText="Yesterday"
        span="20% +"
      />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
         <CardUltimate
        iconPath={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color="#168cc8"
            fill="none"
          >
            <path
              d="M18 15L18 22M21.5 18.5L14.5 18.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M7 16H11M7 11H15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M6.5 3.5C4.9442 3.54667 4.01661 3.71984 3.37477 4.36227C2.49609 5.24177 2.49609 6.6573 2.49609 9.48836L2.49609 15.9944C2.49609 18.8255 2.49609 20.241 3.37477 21.1205C4.25345 22 5.66767 22 8.49609 22H11.5M15.4922 3.5C17.048 3.54667 17.9756 3.71984 18.6174 4.36228C19.4961 5.24177 19.4961 6.6573 19.4961 9.48836V12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M6.49609 3.75C6.49609 2.7835 7.2796 2 8.24609 2H13.7461C14.7126 2 15.4961 2.7835 15.4961 3.75C15.4961 4.7165 14.7126 5.5 13.7461 5.5H8.24609C7.2796 5.5 6.49609 4.7165 6.49609 3.75Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        }
        title="Nuevas fichas"
        value="12"
        backgroundColor="#C3EDF5"
        customColor="#168CC8"
        span="8 +"
        lastText="Last week"
      />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
          <CardUltimate
        iconPath={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color="#4fbd55"
            fill="none"
          >
            <path
              d="M2 16C2 18.2109 2 19.3164 2.70187 20.0544C2.81413 20.1725 2.93785 20.2817 3.07164 20.3807C3.90809 21 5.16095 21 7.66667 21H8.33333C10.8391 21 12.0919 21 12.9284 20.3807C13.0621 20.2817 13.1859 20.1725 13.2981 20.0544C14 19.3164 14 18.2109 14 16C14 13.7891 14 12.6836 13.2981 11.9456C13.1859 11.8275 13.0621 11.7183 12.9284 11.6193C12.0919 11 10.8391 11 8.33333 11H7.66667C5.16095 11 3.90809 11 3.07164 11.6193C2.93785 11.7183 2.81413 11.8275 2.70187 11.9456C2 12.6836 2 13.7891 2 16Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 8.00001C10 5.78908 10 4.68362 10.7019 3.94557C10.8141 3.82753 10.9379 3.71835 11.0716 3.6193C11.9081 3.00001 13.1609 3.00001 15.6667 3.00001H16.3333C18.8391 3.00001 20.0919 3.00001 20.9284 3.6193C21.0621 3.71835 21.1859 3.82753 21.2981 3.94557C22 4.68362 22 5.78908 22 8.00001C22 10.2109 22 11.3164 21.2981 12.0544C21.1859 12.1725 21.0621 12.2817 20.9284 12.3807C20.1696 12.9425 19.0683 12.9947 17 12.9995"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 15L14 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M10 7L22 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M2 9C2 5.68286 4.68286 3 8 3L7.14286 4.71429"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 15C22 18.3171 19.3171 21 16 21L16.8571 19.2857"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        title="Productores"
        value={String(cantidadProductors)}
        backgroundColor="#BEF9C1"
        customColor="#4FBD55"
        span="30% +"
        lastText="from last week"
      />
      </Grid>
      <Grid item xs={12} sm={6} md={12} lg={3}>
          <CardUltimate
        iconPath={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color="#e63e20"
            fill="none"
          >
            <path
              d="M12 7.5C12 9.433 10.433 11 8.5 11C6.567 11 5 9.433 5 7.5C5 5.567 6.567 4 8.5 4C10.433 4 12 5.567 12 7.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M13.5 11C15.433 11 17 9.433 17 7.5C17 5.567 15.433 4 13.5 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M13.1429 20H3.85714C2.83147 20 2 19.2325 2 18.2857C2 15.9188 4.07868 14 6.64286 14H10.3571C11.4023 14 12.3669 14.3188 13.1429 14.8568"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 14V20M22 17L16 17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        }
        title="Nuevos usuarios"
        value="6"
        backgroundColor="#FEDDC7"
        customColor="#E63E20"
        lastText="last month"
        span="40%"
      />
      </Grid>
    
    </Grid>
  </Box>
  )
}

export default CardsUltimate