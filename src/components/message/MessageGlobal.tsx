import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Alert, Paper, Snackbar } from "@mui/material";


const MessageGlobal: React.FC<CustomMessageProps> = ({
  message,
  type,
  show,
}) => {
  if (!show) return null;

  const [open, setOpen] = React.useState(true);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
   
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: "100%",color:'white' }}
        >
          {message}
        </Alert>
      </Snackbar>
  );
};

export default MessageGlobal;
