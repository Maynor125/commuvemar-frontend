// components/CustomDialog.tsx
import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Map from "@/components/map/Map";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { updateValueMapa } from "@/redux/features/mapaModalSlice";

interface CustomDialogProps {
  description: string;
}

const ModalMapa: FC<CustomDialogProps> = ({
  description,
}) => {
    const dispatch = useDispatch();
    const mapaState = useSelector((state: RootState) => state.mapa);
    const [openManager,setOpenManager] = useState(false);

    useEffect(()=>{
        setOpenManager(mapaState.openM)
    },[mapaState])

    const handleClose=()=>{
     dispatch(
        updateValueMapa(
            {
                openM:false,
                idFicha:0,
                longitud:0,
                latitud:0,
            }
        )
     )
    }


  const theme = useTheme();

  const latitude = 13.7177027;
  const longitude = -84.7721508;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openManager}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, color: theme.palette.secondary.light }}
        id="customized-dialog-title"
      >
        Mapa Preview
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme: any) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Typography
          sx={{ color: theme.palette.secondary.light}}
          gutterBottom
        >
          {description}
        </Typography>
        <Map latitude={latitude} longitude={longitude}/>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "#168CC8" }} autoFocus onClick={handleClose}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalMapa;
