import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import '../../components.css'

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
  rows={rows.filter((row) =>
    row.nombre.toLowerCase().includes(filterText.toLowerCase())
  )}
  columns={columns.map(column => {
    if (column.editable) {
      return {
        ...column,
        renderCell: (params: any) => (
          <>
            <IconButton
              color="primary"
              size="small"
              onClick={() => onEdit(params.id)}
            >
              <EditRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="secondary"
              size="small"
              onClick={() => onDelete(params.id)}
            >
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
          </>
        ),
      };
    }
    return column;
  })}
  classes={gridClasses}
/>
      );
};

export default Datatable;
