import React, { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import PerfilImg from "../../../../public/images/admin/pruebaPerfil.jpg";

import Divider from "@mui/material/Divider";

import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { getUser } from "@/utils/user";
import { Workers } from "@/types/inspectors";

interface ProfileViewerProps {
  avatarSrc: string;
  email: string;
  nombre: string;
  apellido: string;
}

const ProfilePreview: React.FC<ProfileViewerProps> = ({ avatarSrc }) => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.auth);
  const [openP, setOpenP] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenP(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (userState.logueado) {
      getInfoUser(userState.idUser);
    }
  }, [userState]);

  const [userInfo, setUserInfo] = useState<Workers | null>(null);
  const getInfoUser = async (id: number) => {
    try {
      const response = await getUser(id);
      if (response.data !== undefined) {
        setUserInfo(response.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(userInfo);

  const handleOpenProfile = (event: React.MouseEvent<HTMLElement>) => {
    setOpenP(!openP);
  };

  const theme = useTheme();

  const containerStyles = {
    display: "flex",
    position: "relative",
    zIndex: 1,
  };

  const badgeStyles = {
    position: "absolute",
    bottom: "0.2rem",
    right: "0.2rem",
    backgroundColor: "#4FBD55",
    borderRadius: "50%",
    padding: "0.2rem",
    zIndex: 2,
    border: `2px solid ${theme.palette.background.paper}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.4rem",
    height: "1.4rem",
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
        ref={containerRef}
        sx={{
          width: "20rem",

          display: openP ? "block" : "none",
          position: "absolute",
          top: "2.9rem",
          right: "2rem",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <div className="borde-card">
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "start",
              alignItems: "center",
              gap: "1rem",
              padding: ".8rem 1.5rem",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "relative",
              }}
            >
              <Avatar
                sx={{
                  width: "4.5rem",
                  height: "4.5rem",
                  border: "2px solid",
                  borderColor: theme.palette.background.default,
                  color: theme.palette.secondary.light,
                  position: "relative",
                }}
                alt={"foto de perfil"}
                src={avatarSrc}
              />
              <Box sx={badgeStyles}>
                <CheckCircleIcon
                  style={{ color: "white", fontSize: ".9rem" }}
                />
              </Box>
            </Box>
            <Box>
              <Typography
                sx={{
                  color: theme.palette.secondary.light,
                  fontWeight: "500",
                  fontSize: "1.1rem",
                }}
              >
                {userInfo?.nombre} {userInfo?.apellido}
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.secondary.contrastText,
                  fontSize: ".9rem",
                }}
              >
                {userState.email}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Divider />
            <Box
              sx={{
                width: "100%",
              }}
            >
              <List>
                <ListItemButton
                  sx={{
                    textAlign: "inherit",
                    height: "2.2rem",
                    color: theme.palette.secondary.contrastText,
                  }}
                >
                  <AttachFileRoundedIcon
                    sx={{ marginRight: "0.5rem", fontSize: "19px" }}
                  />
                  <ListItemText>que que</ListItemText>
                </ListItemButton>
                <ListItemButton
                  sx={{
                    textAlign: "inherit",
                    height: "2.2rem",
                    color: theme.palette.secondary.contrastText,
                  }}
                >
                  <AutorenewRoundedIcon
                    sx={{ marginRight: "0.5rem", fontSize: "19px" }}
                  />
                  <ListItemText>Options</ListItemText>
                </ListItemButton>
              </List>
            </Box>
            <Divider />
            <Box
              sx={{
                width: "100%",
              }}
            >
              <List>
                <ListItemButton sx={{ textAlign: "inherit", height: "2.2rem" }}>
                  <ListItemText
                    sx={{
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    Cerrar sesion
                  </ListItemText>
                </ListItemButton>
              </List>
            </Box>
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default ProfilePreview;
