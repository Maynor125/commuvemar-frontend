import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import WorkerProductor from "@/components/forms/WorkerProductor";
import MessageGlobal from "@/components/message/MessageGlobal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Farmer from "../../../../public/images/admin/farmericon.png";
import Image from "next/image";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import { deleteWorkerProductor, getProductorsWorker } from "@/services/workers";
import { Productors } from "@/types/productors";
import { clearValueWorker } from "@/redux/features/workerSlice";

interface CustomDialogProps {
  id?: number;
  nombre?: string;
  open?: boolean;
  onClose?: () => void;
}

const ModalProductoresAsignados: FC<CustomDialogProps> = ({
  id,
  open,
  onClose,
  nombre
}) => {
  const [abrete, setAbrete] = useState(false);
  const theme = useTheme();
  const [showMessage, setShowMessage] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const workerState = useSelector((state: RootState) => state.worker);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("el objeto", workerState);
    if (workerState.open === true) {
      setAbrete(true);
    } else {
      setAbrete(false);
    }
  }, [workerState.open, workerState]);

  const cierrate = ()=>{
    dispatch(clearValueWorker());
    setAsignations([]);
  }

  const handleSave = () => {
    if (eliminar === true) {
      setMessage("Se ah eliminado un productor a este inspector");
    } else {
      setMessage("Se ah asignado un productor a este inspector");
    }
    getAsignations();
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 4000);
  };

  //Mostrar asignaciones de este inpector.
  const [asignations, setAsignations] = useState<Productors[]>([]);
  const getAsignations = async () => {
    try {
      const response = await getProductorsWorker(workerState.id);
      if (response.data !== undefined) {
        console.log("Estas son las asignaciones",response.data);
        setAsignations(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAsignations();
  }, [workerState]);

  //Eliminar asignacion.
  const [eliminar, setEliminar] = useState(false);
  const handleQuit = async (id: number) => {
    setEliminar(true);
    try {
      await deleteWorkerProductor(id);
    } catch (error) {
      console.error(error);
    }
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
        Productores asignados de {workerState.nombre}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={cierrate}
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
            marginBottom: ".5rem",
          }}
        >
          <WorkerProductor idWorker={workerState.id} onClick={handleSave} />
        </Box>
        <Box sx={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
          {asignations.length < 1 ? (
            <div
              className="borde-card"
              style={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: ".5rem",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="40"
                height="40"
                color={theme.palette.secondary.contrastText}
                fill="none"
              >
                <path
                  d="M2.75 12C2.75 17.5228 7.22715 22 12.75 22C18.2728 22 22.75 17.5228 22.75 12C22.75 6.47714 18.2728 1.99998 12.75 1.99998"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M5.39856 5.07874C5.53691 4.9321 5.67948 4.78948 5.8261 4.65109M8.69733 2.72938C8.87884 2.64779 9.06313 2.57126 9.25 2.49998M3.48172 7.94191C3.39925 8.12517 3.32195 8.31126 3.25 8.49999"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.75 9L12.75 12M12.75 12L9.75 15M12.75 12L15.75 15M12.75 12L9.75 9"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <Typography color={theme.palette.secondary.contrastText}>
                No hay asignaciones aun.
              </Typography>
            </div>
          ) : (
            asignations.map((item) => (
              <Box>
                <Card variant="outlined">
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Tooltip sx={{ cursor: "pointer" }} title="Productor">
                        <Box>
                          <Image
                            width={40}
                            height={40}
                            className="borde-card"
                            alt="farmer icons"
                            src={Farmer}
                          />
                        </Box>
                      </Tooltip>
                      <Typography
                        color={theme.palette.secondary.contrastText}
                        variant="subtitle1"
                      >
                        Productor: {item.nombre}
                      </Typography>
                      <Typography
                        color={theme.palette.secondary.contrastText}
                        variant="subtitle1"
                      >
                        Teléfono: {item.numeroTelefono}
                      </Typography>
                      <Tooltip title="Quitar asignacion">
                        <IconButton
                          aria-label="Quitar asignacion"
                          onClick={() => handleQuit}
                        >
                          <BlockOutlinedIcon
                            sx={{
                              color: "#ffc",
                              backgroundColor: "#D43333",
                              width: "1.9rem",
                              height: "1.9rem",
                              padding: ".3rem",
                              borderRadius: "4px",
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))
          )}
        </Box>
        <DialogActions>
          <Button sx={{ color: "#168CC8" }} onClick={cierrate}>
            Aceptar
          </Button>
        </DialogActions>
      </DialogContent>
      <MessageGlobal
        show={showMessage}
        message={message}
        type={eliminar === true ? "error" : "success"}
        action={eliminar === true ? "Elimino" : "Creo"}
      />
    </Dialog>
  );
};

export default ModalProductoresAsignados;
