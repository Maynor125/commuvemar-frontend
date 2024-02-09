"use client";

import {
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import Datatable from "@/components/admin/datatable/Datatable";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DatosForm from "@/components/forms/DatosForm";
import { deleteDato, getDatosSection } from "@/utils/datoSection";
import { getSectionsId } from "@/utils/sections";

import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";

const page = ({ params }: any) => {
  const theme = useTheme();
  const [filterText, setFilterText] = useState("");

  //Para el mensaje de guardado.
  const [showMessage, setShowMessage] = React.useState(false);
  const [message, setMessage] = React.useState("");

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

  const handleSave = () => {
    // Perform save action
    setMessage("Data saved successfully!");
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
    updateTable();
    //setTimeout(() => setShowMessage(false), 3000);
  };

  //Extraer los datos de la seccion en la que nos encontramos.
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

  //Mostrar todos los datos que pertenecen a la seccion en la que nos encontramos
  const [dataRows, setDataRows] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await allGetData(params.id);
      setDataRows(data);
    };
    fetchData();
  }, [params.id]);

  const updateTable = async () => {
    const newData = await allGetData(params.id);
    setDataRows(newData);
  };

  //----------------------------------------------------------

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
    const dataRow = dataRows.find((row: any) => row.id === id);
    if (dataRow) {
      console.log("Edit ID:", id);
      console.log("Title:", dataRow.titulo);
      console.log("Description:", dataRow.descripcion);

      setEdit(true);
      setID(id);
      setTituloDato(dataRow.titulo);
      setDescripcionDato(dataRow.descripcion);
    }
  };

  const handleDelete = async (id: number) => {
    console.log("Delete ID:", id);
    // Aquí puedes implementar la lógica para eliminar el elemento con el ID dado
    await deleteDato(id);
    //Aqui ira la funcion para recargar la tabla.
    updateTable();
  };
  //----------------------------------------------------------
  const [edit, setEdit] = useState(false);
  const [id, setID] = useState(0);
  const [tituloDato, setTituloDato] = useState("");
  const [descripcionDato, setDescripcionDato] = useState("");
  const [isAgregate, setIsAgregate] = useState(false);
  const texto = isAgregate ? "Cancelar" : "Agregar";
  return (
    <Box component={"main"}>
      <Box
        sx={{
          paddingY: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
          <Tooltip title="Regresar">
            <IconButton>
              <KeyboardBackspaceRoundedIcon />
            </IconButton>
          </Tooltip>
        </Box>

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
        <Button onClick={() => setIsAgregate(!isAgregate)}>
          {texto}
          </Button>
      </Box>
      {(isAgregate || edit) && (
        <Box
          sx={{
            marginTop: "1rem",
          }}
        >
          <DatosForm
            IDSeccionesFicha={Number(params.id)}
            isEdit={edit}
            idDato={id}
            descripcionDato={descripcionDato}
            tituloDato={tituloDato}
            onClick={handleSave}
          />
        </Box>
      )}

      <Box
        sx={{
          marginTop: "1rem",
          width: "100%",
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
