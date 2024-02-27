import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { List, ListItem, ListItemButton, ListItemText, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import PerfilImg from "../../../../public/images/admin/pruebaPerfil.jpg";

import Divider from "@mui/material/Divider";

interface ProfileViewerProps {
  avatarSrc: string;
  email: string;
  nombre: string;
  apellido: string;
}

const ProfilePreview: React.FC<ProfileViewerProps> = ({ avatarSrc }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openP, setOpenP] = useState(false);

  const handleOpenProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenP(!openP);
    setVisible(!visible);
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
    setOpenP(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "profile-popover" : undefined;
  const theme = useTheme();

  const containerStyles = {
    display: "flex",
    position: "relative",
    zIndex: 1, // Ensure the parent container has a higher z-index than the scrollbar
  };

  const [visible, setVisible] = useState(false);

  return (
    <Box sx={containerStyles}>
      {" "}
      <Avatar src={avatarSrc} alt="User Avatar" />
      <IconButton
        sx={{ color: theme.palette.secondary.dark }}
        onClick={handleOpenProfile}
      >
        {!openP ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </IconButton>
      <Box
        sx={{
          width: "20rem",
          height: "10rem",
          display: visible ? "block" : "none",
          position: "absolute",
          top: "2.9rem",
          right: "2rem",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            padding: ".8rem 1.5rem",
          }}
        >
          <Avatar
            sx={{
              width: "4.5rem",
              height: "4.5rem",
              border: "2px solid",
              borderColor: theme.palette.background.default,
              color: theme.palette.secondary.light,
            }}
            alt={"foto de perfil"}
            src={avatarSrc}
          />
          <Box>
            <Typography
              sx={{
                color: theme.palette.secondary.light,
                fontWeight: "500",
                fontSize: "1.1rem",
              }}
            >
              Maynor Padilla
            </Typography>
            <Typography
              sx={{
                color: theme.palette.secondary.contrastText,
                fontSize: ".9rem",
              }}
            >
              maynoldemar@gmail.com
            </Typography>
          </Box>
        </Box>
        <Box sx={{
          width: "100%",
        }}>
          <Divider />
          <Box>
            <List>
              <ListItem>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText>que que</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePreview;
