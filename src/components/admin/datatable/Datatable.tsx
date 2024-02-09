import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";


import "../../components.css";


interface ColumnDef {
  field: string;
  headerName: string;
  type?: string;
  editable?: boolean;
  flex?: number;
}

interface DataTableProps {
  rows: any[];
  columns: ColumnDef[];
  onEdit: (id: any) => void;
  onDelete: (id: any) => void;
  filterText: string;
}


const Datatable: React.FC<DataTableProps> = ({
  rows,
  columns,
  onDelete,
  onEdit,
  filterText,
}) => {
  const dispatch = useDispatch();

  // Definir estilos personalizados para el DataGrid
  const gridClasses = {
    root: "custom-datagrid-root", // Clase personalizada para el root del DataGrid
    header: "custom-datagrid-header", // Clase personalizada para el header del DataGrid
  };
  return (
    <DataGrid
      sx={{width:'100%',marginBottom:'2rem'}}
      rows={rows.filter((row) =>
        row.titulo.toLowerCase().includes(filterText.toLowerCase())
      )}
      columns={columns.map((column) => {
        if (column.editable) {
          return {
            ...column,
            flex: 1,
            
          };
        } else if (column.field === "descripcion") {
          return {
            ...column,
            flex: 2, // Ajustar el ancho de la columna de descripción
          };
        }
        return column;
      })}

      autoHeight
    />
  );
};

export default Datatable;
