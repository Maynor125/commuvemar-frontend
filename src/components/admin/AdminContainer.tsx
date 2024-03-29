"use client";

import { Box, Divider, Grid, useTheme } from "@mui/material";
import SideBar from "./sidebar/SideBar";
import { PathsSideBar } from "@/data/admin/sideInfo";

const AdminContainer = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <Box
      component="main"
      bgcolor={theme.palette.background.default}
      sx={{
        padding: "1.3rem",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "210px 1fr", lg: "210px 1fr", xl: "210px 1fr" },
        height: "100vh",
        width: "100%",
        transition:'all',
        transitionDuration:'.4s'
      }}
    >
      <Box component="div" sx={{
        display: { xs: 'none', sm: 'none', md: 'inline-flex', lg: 'inline-flex', xl: 'inline-flex' }
      }}>
        <SideBar paths={PathsSideBar} />
      </Box>
      <Divider
        sx={{
          marginRight: ".5rem",
          position: "fixed", // Fija el Divider
          top: 0,
          bottom: 0,
          left: "210px",
          width: "10px",
          display: { xs: 'none', sm: 'none', md: 'inline-flex', lg: 'inline-flex', xl: 'inline-flex' }
        }}
        variant="fullWidth"
        orientation="vertical"
      />
      <Grid  item xs={12} sm={9} md={10}>
        {children}
      </Grid>
    </Box>
  );
};

export default AdminContainer;
