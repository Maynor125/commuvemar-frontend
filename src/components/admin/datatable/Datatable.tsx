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
  onEdit?: (id: any) => void;
  onDelete?: (id: any) => void;
  filterText?: string;
}

const Datatable: React.FC<DataTableProps> = ({
  rows,
  columns,
  onDelete,
  onEdit,
  filterText,
}) => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <DataGrid
        sx={{ width: "99.5%", height: "100%", marginBottom: "1rem"}}
        rows={rows.filter((row) =>
          row.titulo.toLowerCase().includes(filterText?.toLowerCase())
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
    </Box>
  );
};

export default Datatable;
