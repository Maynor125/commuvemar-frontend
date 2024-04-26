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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Farmer from "../../../../public/images/admin/farmericon.png";
import Image from "next/image";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import { deleteWorkerProductor, getProductorsWorker } from "@/services/workers";
import { Productors } from "@/types/productors";

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
  const [abrete, setAbrete] = useState(false);
  const theme = useTheme();
  const [showMessage, setShowMessage] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const workerState = useSelector((state: RootState) => state.worker);

  useEffect(() => {
    console.log("el objeto", workerState);
    if (workerState.open === true) {
      setAbrete(true);
    } else {
      setAbrete(false);
    }
  }, [workerState.open, workerState]);

  const handleSave = () => {
    if(eliminar === true){
      setMessage("Se ah eliminado un productor a este inspector");
    }
    else{
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
      const response = await getProductorsWorker(id);
      if (response.data !== undefined) {
        setAsignations(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAsignations();
  }, []);

  //Eliminar asignacion.
  const [eliminar,setEliminar] = useState(false);
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
            marginBottom: ".5rem",
          }}
        >
          <WorkerProductor idWorker={id} onClick={handleSave} />
          {
            asignations.length < 1 ? <Box display={'inline-block'}>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50" color={theme.palette.secondary.contrastText} fill="none">
    <circle cx="17" cy="7" r="5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M22.75 13.4937C22.75 13.0795 22.4142 12.7437 22 12.7437C21.5858 12.7437 21.25 13.0795 21.25 13.4937H22.75ZM20.5342 20.7543L21.0198 21.3258V21.3258L20.5342 20.7543ZM3.44705 6.23317L2.96137 5.66166H2.96137L3.44705 6.23317ZM12.9915 21.25C12.5773 21.25 12.2415 21.5858 12.2415 22C12.2415 22.4142 12.5773 22.75 12.9915 22.75V21.25ZM13.9925 21.9956L13.9871 21.2456L13.9806 21.2457L13.9925 21.9956ZM1.25025 10.9727C1.23966 11.3868 1.56675 11.731 1.98083 11.7416C2.39491 11.7522 2.73917 11.4251 2.74975 11.0111L1.25025 10.9727ZM9.26038 5.74991C9.67455 5.74352 10.0051 5.4026 9.99873 4.98844C9.99234 4.57427 9.65142 4.2437 9.23725 4.25009L9.26038 5.74991ZM21.25 13.4937C21.25 15.5235 21.2478 16.9573 21.076 18.0434C20.9098 19.0938 20.5995 19.7145 20.0485 20.1828L21.0198 21.3258C21.9347 20.5483 22.3573 19.5438 22.5576 18.2778C22.7522 17.0475 22.75 15.4739 22.75 13.4937H21.25ZM12.9915 22.75C13.3534 22.75 13.6053 22.7489 13.7674 22.7478C13.8485 22.7472 13.9071 22.7466 13.9457 22.7462C13.9651 22.746 13.9794 22.7458 13.9891 22.7457C13.9939 22.7456 13.9976 22.7456 14.0001 22.7455C14.0014 22.7455 14.0023 22.7455 14.0031 22.7455C14.0034 22.7455 14.0037 22.7455 14.0039 22.7455C14.004 22.7455 14.0041 22.7455 14.0042 22.7455C14.0042 22.7455 14.0043 22.7455 14.0043 22.7455C14.0043 22.7455 14.0043 22.7455 14.0043 22.7455C14.0043 22.7455 14.0044 22.7455 13.9925 21.9956C13.9806 21.2457 13.9806 21.2457 13.9806 21.2457C13.9806 21.2457 13.9807 21.2457 13.9807 21.2457C13.9807 21.2457 13.9807 21.2457 13.9807 21.2457C13.9807 21.2457 13.9807 21.2457 13.9806 21.2457C13.9806 21.2457 13.9805 21.2457 13.9803 21.2457C13.9799 21.2457 13.9792 21.2457 13.9782 21.2457C13.9763 21.2457 13.9732 21.2458 13.969 21.2458C13.9605 21.2459 13.9473 21.2461 13.9291 21.2463C13.8927 21.2467 13.8361 21.2473 13.757 21.2478C13.5988 21.2489 13.3503 21.25 12.9915 21.25V22.75ZM13.9979 22.7455C15.7037 22.7333 17.0832 22.6875 18.2019 22.5013C19.3334 22.313 20.2597 21.9718 21.0198 21.3258L20.0485 20.1828C19.5666 20.5923 18.9303 20.8594 17.9555 21.0217C16.9679 21.1861 15.6976 21.2333 13.9871 21.2456L13.9979 22.7455ZM2.74975 11.0111C2.81163 8.59113 3.08942 7.52134 3.93273 6.80467L2.96137 5.66166C1.55911 6.85335 1.31136 8.58282 1.25025 10.9727L2.74975 11.0111ZM9.23725 4.25009C6.33117 4.2949 4.34751 4.48368 2.96137 5.66166L3.93273 6.80467C4.84512 6.02929 6.25834 5.79621 9.26038 5.74991L9.23725 4.25009Z" fill="currentColor" />
    <path d="M2.98242 21H2.9914" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M17 9H17.009" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M17 6.5V4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M2 17.2349C4.49328 17.2349 6.77053 19.5 6.77053 21.9996M10 21.9996C10 17.5 5.99511 14 2.04522 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
</svg>
<Typography color={theme.palette.secondary.contrastText}>
  No hay asignaciones aun.
</Typography>
            </Box> :
            asignations.map((item)=>(
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
                      <IconButton aria-label="Quitar asignacion" onClick={() => handleQuit}>
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
          }
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
        type= {eliminar === true ? "error" : "success"}
        action={eliminar === true ? "Elimino" : "Creo"}
      />
    </Dialog>
  );
};

export default ModalProductoresAsignados;
