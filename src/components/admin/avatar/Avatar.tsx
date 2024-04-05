"use client";

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import PruebaImg from "../../../../public/images/admin/pruebaPerfil.jpg";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

interface avatarProps {
  alt: string;
  urlImg?: string;
  active?: boolean;
}

const Avatars: React.FC<avatarProps> = ({ alt, active, urlImg }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={2}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar
          sx={{
            width: "6rem",
            height: "6rem",
            border: "2px solid",
            borderColor: theme.palette.background.default,
            color: theme.palette.secondary.light,
          }}
          alt={alt}
          src="public/images/admin/pruebaPerfil.jpg"
        />
      </StyledBadge>
    </Stack>
  );
};

export default Avatars;
