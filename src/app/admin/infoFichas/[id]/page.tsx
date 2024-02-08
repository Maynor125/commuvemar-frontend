"use client";

import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import Datatable from "@/components/admin/datatable/Datatable";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { GridActionsCellItem } from "@mui/x-data-grid";
/*
export async function generateMetadata({ params }:any) {
  const post= await getData(params.id)
  return {
    titulo: post.title,
    descripcion:post.desc,
  };
}*/

const page = () => {
  const theme = useTheme();
  const [filterText, setFilterText] = useState("");

  //----------------------------------------------------------
  const rows = [
    { id: 1, nombre: "John Doe", descripcion: "Description 1" },
    { id: 2, nombre: "Maynor Padilla", descripcion: "Description 2" },
    // Agrega más filas si es necesario
  ];

  const columns = [
    { field: "id", headerName: "ID", headerClassName: "header-grid" },
    {
      field: "nombre",
      headerName: "Nombre",
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
          Seccion de prueba
        </Typography>
        <Typography
          sx={{
            color: theme.palette.secondary.contrastText,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error rerum
          esse assumenda modi mollitia cum tempore delectus quas totam ab!
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
        <Datatable
          columns={columns}
          rows={rows}
          filterText={filterText}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </Box>
    </Box>
  );
};

export default page;
