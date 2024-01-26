import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTheme } from "@mui/material";

interface ProfileViewerProps {
  avatarSrc: string;
}

const ProfilePreview: React.FC<ProfileViewerProps> = ({ avatarSrc }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openP,setOpenP] = useState(false)

  const handleOpenProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenP(true);
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
    setOpenP(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "profile-popover" : undefined;
  const theme = useTheme()
  return (
    <Box sx={{ display: "flex" }}>
      {" "}
      <Avatar src={avatarSrc} alt="User Avatar" />
      <IconButton sx={{color:theme.palette.secondary.dark}} onClick={handleOpenProfile}>
        {
            !openP ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />
        }
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseProfile}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box p={2}>
          {/* Contenido del perfil (puedes personalizar esto según tus necesidades) */}
          <div>Perfil del Usuario</div>
          <IconButton onClick={handleCloseProfile}>
            
          </IconButton>
        </Box>
      </Popover>
    </Box>
  );
};

export default ProfilePreview;
