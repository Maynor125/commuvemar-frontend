"use client";

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { SidebarProps } from "@/types/sidebar";
import Link from "next/link";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Image from "next/image";

import { usePathname } from "next/navigation";

import Logo from "@/components/Logo";

import "./sidebar.css";

const SideBar: React.FC<SidebarProps> = ({ paths }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const esPantallaMedianaOmasPequeña = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      component="aside"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width:'200px',
        position:'fixed',
        marginLeft:esPantallaMedianaOmasPequeña ? '0.9rem' : '0' 
      }}
    >
      <Box component="div" sx={{ mb: "2.5rem", paddingLeft: "15px" }}>
        <Logo admin={true} />
      </Box>
      <Box component="div">
        <Box
          component="ul"
          sx={{ display: "flex", flexDirection: "column", gap: ".8rem" }}
        >
          {paths.map((item) => {
            return (
              <Box component="li" key={item.id}>
                <Link
                  className={`link ${pathname === item.path && "link-active"}`}
                  href={item.path}
                  color={theme.palette.secondary.dark}
                >
                  <Typography
                    color={
                      pathname === item.path
                        ? theme.palette.grey[200]
                        : theme.palette.secondary.dark
                    }
                  >
                    <item.icon />
                  </Typography>
                  <Typography
                    sx={{ marginLeft: ".7rem" }}
                    variant="body1"
                    color={
                      pathname === item.path
                        ? theme.palette.grey[200]
                        : theme.palette.secondary.dark
                    }
                  >
                    {item.name}
                  </Typography>
                </Link>
              </Box>
            );
          })}
        </Box>
        <a className="exit">
          <Typography color={theme.palette.secondary.dark}>
            <LogoutOutlinedIcon />
          </Typography>
          <Typography color={theme.palette.secondary.dark}>LogOut</Typography>
        </a>
      </Box>
    </Box>
  );
};

export default SideBar;
