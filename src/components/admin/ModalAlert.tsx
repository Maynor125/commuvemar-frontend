// components/CustomDialog.tsx
import React, { FC, useEffect } from "react";
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

interface CustomDialogProps {
  open: boolean;
  title: string;
  description: string;
  icon: JSX.Element | React.ReactElement<SVGElement>;
  onAccept: () => void;
  onClose: () => void;
}

const CustomDialog: FC<CustomDialogProps> = ({
  open,
  title,
  description,
  icon,
  onAccept,
  onClose,
}) => {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(1),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const theme = useTheme();

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, color: theme.palette.secondary.light }}
        id="customized-dialog-title"
      >
        {title}
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
          {icon}
        </Box>
        <Typography
          sx={{ color: theme.palette.secondary.contrastText }}
          gutterBottom
        >
          {description}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "#E83D21" }} onClick={onClose}>
          Cancelar
        </Button>
        <Button sx={{ color: "#2FB344" }} autoFocus onClick={onAccept}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
