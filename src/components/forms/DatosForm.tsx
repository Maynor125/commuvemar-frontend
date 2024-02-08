import { Box, TextField, Tooltip } from '@mui/material'
import React from 'react'
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

const DatosForm = () => {
  return (
    <form  className="borde-card" action="">
       <Box
        sx={{
          padding: "1rem",
          width: "100%",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-between",

          "@media (max-width: 1100px)": {
            flexDirection: "column",
            alignItems: "stretch", // Alinear los elementos al principio y al final
          },
        }}
      >
        <TextField
          id="nombre"
          label="Nombre de Dato"
          variant="outlined"
          /*
          {...register("nombre")}
          error={!!errors.nombre}
          helperText={errors?.nombre?.message}
          defaultValue={isEdit ? nombreSection || "" : ""}
          InputLabelProps={{ shrink: !!nombreSection || undefined }}*/
        />
        <TextField
          sx={{ flex: 1 }}
          id="descripcion"
          label="Escribe una descripcion"
          multiline
          /*
          {...register("descripcion")}
          error={!!errors.descripcion}
          helperText={errors?.descripcion?.message}
          defaultValue={isEdit ? descripcionSection || "" : ""}
          InputLabelProps={{ shrink: !!descripcionSection || undefined }}*/
        />
        <Tooltip title={/*title*/''}>
          <button /*onClick={onClick}*/ className="btn-save" type="submit">
            Guardar
            <SaveRoundedIcon />
          </button>
        </Tooltip>
      </Box>
    </form>
  )
}

export default DatosForm