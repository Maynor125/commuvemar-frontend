import { Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React from "react";
import ImageB from "../../../../public/images/admin/iconbannerfichas.png";
import { useRouter } from "next/navigation";

const BannerFicha = () => {
  const isSmallerThan1025 = useMediaQuery("(max-width: 750px)");
  const router = useRouter();

  const onVolver = () =>{
    router.push('/admin/historyFichas');
  }

  const handleNavigate = () => {
    router.push('/admin/analysisFichas');
  }
  return (
    <Box
      sx={{
        width: "100%",
        height: "20rem",
        background: "#212636",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        padding: "2rem",
        justifyContent: "space-between",
        marginTop: "3rem",
      }}
    >
      <Box>
        <Typography sx={{ fontSize: "2.5rem" }} variant="h4" color="#ffc">
          Lorem ipsum dolor sit amet <br /> consectetur.
        </Typography>
        <Typography sx={{ marginTop: "1rem" }} color="#858586">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, velit!
        </Typography>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <button
          onClick={handleNavigate}
            style={{ marginTop: "1rem" }}
            className="btn-save btn-banner-ficha"
          >
            Analiza tu ficha
          </button>
          <button
          onClick={onVolver}
            style={{ marginTop: "1rem" }}
            className="btn-save btn-banner-ficha-volver"
          >
            Regresar
          </button>
        </Box>
      </Box>
      {!isSmallerThan1025 && (
        <Image
          style={{ marginRight: "1rem" }}
          width={300}
          height={300}
          src={ImageB}
          alt="Imagen del banner"
        />
      )}
    </Box>
  );
};

export default BannerFicha;
