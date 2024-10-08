'useclient'

import { Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React from "react";
import ImageB from "../../../../public/images/admin/iconbannerfichas.png";
import ImageBC from "../../../../public/images/admin/iconbannercheck.png"
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const BannerFicha = () => {
  const isSmallerThan1025 = useMediaQuery("(max-width: 800px)");
  const router = useRouter();
  const fichasState = useSelector((state: RootState) => state.fichasA.fichaAnalizada);

  const onVolver = () =>{
    router.push('/admin/historyFichas');
  }

  const scrollToBottom = () => {
    const handleScrollToBottom = () => {
      if (typeof window !== 'undefined') { // Check if we're on the client-side
        if (fichasState) {
          window.scrollTo({
            top: document.documentElement.scrollHeight - window.innerHeight - 600,
            behavior: "smooth" // Animación de desplazamiento suave
          });
        } else {
          window.scrollTo({
            top: window.scrollY + 430, // Desliza 100 píxeles hacia abajo
            behavior: 'smooth' // Animación de desplazamiento suave
          });
        }
      }
    };
    
    handleScrollToBottom();
  };

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
            onClick={scrollToBottom}
            style={{ marginTop: "1rem" }}
            className={`btn-save ${fichasState ? '' : 'btn-banner-ficha'}`}
          >
            {fichasState? 'Revisa la desicion' :  'Analiza tu ficha'}
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
          src={fichasState ? ImageBC : ImageB}
          alt="Imagen del banner"
        />
      )}
    </Box>
  );
};

export default BannerFicha;
