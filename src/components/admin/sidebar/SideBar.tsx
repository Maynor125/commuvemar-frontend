"use client";

import { Box, Typography } from "@mui/material";
import { SidebarProps } from "@/types/sidebar";
import Link from "next/link";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Image from "next/image";

import logo from "../../../../public/images/logo.png";
import Logo from "@/components/Logo";

const SideBar: React.FC<SidebarProps> = ({ paths }) => {
  return (
    <Box component="aside">
      <div>
        <Logo admin={true}/>
      </div>
      <div>
        <ul>
          {paths.map((item) => (
            <li key={item.id}>
              <Link href={item.path}>
                <item.icon />
                <Typography>{item.name}</Typography>
              </Link>
            </li>
          ))}
        </ul>
        <a>
          <LogoutOutlinedIcon />
          <Typography>LogOut</Typography>
        </a>
      </div>
    </Box>
  );
};

export default SideBar;
