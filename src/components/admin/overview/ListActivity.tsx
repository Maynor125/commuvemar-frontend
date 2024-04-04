"use client";
import {
  Avatar,
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ListActivityItem from "./ListActivityItem";


const ListActivity = () => {
  const theme = useTheme();
  const fontColor = theme.palette.secondary.light;
  const fontColor1 = theme.palette.secondary.contrastText;

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: 600 }} color={fontColor}>
          Fichas ingresadas
        </Typography>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Age</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Divider sx={{ marginTop:'1rem' }} />
      <Box>
        <ListActivityItem isRevised={true}/>
        <ListActivityItem isRevised={false}/>
        <ListActivityItem isRevised={true}/>
      </Box>
    </Box>
  );
};

export default ListActivity;
