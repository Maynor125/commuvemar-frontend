import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import WorkerProductor from "@/components/forms/WorkerProductor";
import MessageGlobal from "@/components/message/MessageGlobal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

interface CustomDialogProps {
  id: number;
  open: boolean;
  onClose: () => void;
}

const ModalProductoresAsignados: FC<CustomDialogProps> = ({
  id,
  open,
  onClose,
}) => {
  const [abrete,setAbrete] = useState(false);
  const theme = useTheme();
  const [showMessage, setShowMessage] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const workerState = useSelector((state: RootState) => state.worker);

  useEffect(()=>{
    console.log('el objeto',workerState)
    if(workerState.open === true){
      setAbrete(true);
    }
    else {
      setAbrete(false);
    }
  },[workerState.open,workerState])

  const handleSave = () => {
    setMessage("Se ah asignado un productor a este inspector");
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 4000);
  };
  return (
    <Dialog
      
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={abrete}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, color: theme.palette.secondary.light }}
        id="customized-dialog-title"
      >
        Productores asignados
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "5px",
          }}
        >
          <WorkerProductor idWorker={id} onClick={handleSave} />
        </Box>
        <DialogActions>
          <Button sx={{ color: "#168CC8" }} onClick={onClose}>
            Aceptar
          </Button>
        </DialogActions>
      </DialogContent>
      <MessageGlobal
        show={showMessage}
        message={message}
        type="success"
        action="Creo"
      />
    </Dialog>
  );
};

export default ModalProductoresAsignados;
