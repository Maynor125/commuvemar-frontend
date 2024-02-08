"use client";

import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import Datatable from "@/components/admin/datatable/Datatable";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DatosForm from "@/components/forms/DatosForm";
import { getDatosSection } from "@/utils/datoSection";
import { getSectionsId } from "@/utils/sections";

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

export async function generateMetadata({ params }: any) {
  const dato = await allGetData(params.id);
  return {
    titulo: "esta es una seccion",
    descripcion: "seccion perrona",
  };
}

const page = ({ params }: any) => {
  const theme = useTheme();
  const [filterText, setFilterText] = useState("");


  const dato = allGetData(params.id);
  const getOneSection = async () => {
    try {
      const response = await getSectionsId(params.id);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const [sectionData, setSectionData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOneSection();
      setSectionData(data);
    };
    fetchData();
  }, []);


  const [dataRows, setDataRows] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await allGetData(params.id);
      setDataRows(data);
    };
    fetchData();
  }, [params.id]);

  //----------------------------------------------------------
  const rows = [
    { id: 1, titulo: "John Doe", descripcion: "Description 1" },
    { id: 2, titulo: "Maynor Padilla", descripcion: "Description 2" },
    // Agrega más filas si es necesario
  ];

  const columns = [
    { field: "id", headerName: "ID", headerClassName: "header-grid" },
    {
      field: "titulo",
      headerName: "Titulo",
      width: 250,
      headerClassName: "header-grid",
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      headerClassName: "header-grid",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      headerClassName: "header-grid",
      getActions: ({ id }: any) => {
        return [
          <GridActionsCellItem
            icon={
              <EditRoundedIcon
                sx={{
                  color: "#ffc",
                  backgroundColor: "#FFCD43",
                  width: "1.9rem",
                  height: "1.9rem",
                  padding: ".3rem",
                  borderRadius: "4px",
                }}
              />
            }
            label="Edit"
            className="textPrimary"
            onClick={() => handleEdit(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <DeleteRoundedIcon
                sx={{
                  color: "#ffc",
                  backgroundColor: "#D43333",
                  width: "1.9rem",
                  height: "1.9rem",
                  padding: ".3rem",
                  borderRadius: "4px",
                }}
              />
            }
            label="Delete"
            onClick={() => handleDelete(id)}
            color="inherit"
          />,
        ];
      },
    },
    // Agrega más columnas si es necesario
  ];

  const handleEdit = (id: number) => {
    console.log("Edit ID:", id);
    // Aquí puedes implementar la lógica para editar el elemento con el ID dado
  };

  const handleDelete = (id: number) => {
    console.log("Delete ID:", id);
    // Aquí puedes implementar la lógica para eliminar el elemento con el ID dado
  };
  //----------------------------------------------------------
  return (
    <Box component={"main"}>
      <Box
        sx={{
          marginTop: "2rem",
        }}
      >
        
        <Typography
          sx={{
            color: theme.palette.secondary.light,
          }}
          variant="h4"
        >
         {sectionData?.nombre}
        </Typography>
        <Typography
          sx={{
            color: theme.palette.secondary.contrastText,
          }}
        >
          {sectionData?.descripcion}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
          gap: "2rem",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.secondary.light,
          }}
        >
          Datos
        </Typography>
        <TextField
          placeholder="Filtrar datos"
          variant="outlined"
          value={filterText}
          size="small"
          sx={{
            flex: 1,
          }}
          InputProps={{
            endAdornment: (
              <FilterNoneIcon
                sx={{
                  marginRight: 1,
                  color: theme.palette.secondary.contrastText,
                  fontSize: "16px",
                }}
              />
            ),
          }}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <Button>Agregar</Button>
      </Box>
      <Box
        sx={{
          marginTop: "1rem",
        }}
      >
        <DatosForm
          isEdit={false}
          idDato={2}
          descripcionDato="jajaj"
          tituloDato="hola"
          onClick={() => handleEdit}
        />
      </Box>
      <Box
        sx={{
          marginTop: "1rem",
        }}
      >
        <Datatable
          columns={columns}
          rows={dataRows}
          filterText={filterText}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </Box>
    </Box>
  );
};

export default page;
