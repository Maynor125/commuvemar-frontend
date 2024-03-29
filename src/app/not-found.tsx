"use client";

import Link from "next/link";
import type { Metadata } from "next";
import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Error",
  description: "Hay error",
};

export default function NotFound() {
  const theme = useTheme();
  const userState = useSelector((state: RootState) => state.auth);
  const Router = useRouter();
  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        height: "100vh",
        background: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Typography sx={{ color: theme.palette.secondary.light }} variant="h1">
        404
      </Typography>
      <Typography
        sx={{ color: theme.palette.secondary.contrastText }}
        variant="h6"
      >
        Sorry: the content you're looking for doesn't exist.
        <br />
        Either it was removed, or you mistyped the link.{" "}
      </Typography>
      <Box sx={{display:'flex',alignItems:'center',gap:'1.5rem'}}>
        <Link className="btn-save btn-save-contrast" href={userState.logueado ? "/admin": "/"} onClick={(event) => {
     console.log("Link clicked");
     event.preventDefault();
     Router.push(userState.logueado ? "/admin" : "/");
   }}>
        Go to HomePage
      </Link>
      <Link className="btn-save btn-save-contrast  btn-save-contrast-2" href="http://localhost:3000/#contact">
        Contact us
      </Link>
      </Box>
    </Box>
  );
}
