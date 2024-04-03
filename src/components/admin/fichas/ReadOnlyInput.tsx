import { Box, FormLabel, TextField } from "@mui/material";
import { FC } from "react";

interface FormControl{
    label: string;
    value: string;
  }

export const ReadOnlyTextField:FC<FormControl> =({ label, value}) =>{
    return (
      <Box sx={{ width: "100%" }}>
        <FormLabel sx={{ marginBottom: ".5rem" }}>{label}</FormLabel>
        <TextField
          value={value}
          InputProps={{
            readOnly: true, // Esto deshabilita la entrada de texto
          }}
          variant="outlined"
          fullWidth
        />
      </Box>
    );
  }