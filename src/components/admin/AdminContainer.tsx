"use client";

import { Box, Grid, useTheme } from "@mui/material";
import SideBar from "./sidebar/SideBar";
import { PathsSideBar } from "@/data/admin/sideInfo";

const AdminContainer = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <Box
      component="main"
      bgcolor={theme.palette.background.default}
      sx={{
        padding: "1.5rem",
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        height: "100%",
        width: "100%",
      }}
    >
      <SideBar paths={PathsSideBar} />
      <Grid item xs={12} sm={9} md={10}>
        {children}
      </Grid>
    </Box>
  );
};

export default AdminContainer;
