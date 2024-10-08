"use client";

import "./login.css";

import Logo from "../../../public/images/logo.png";
import ImageBanner from "../../../public/images/auth/imgAdorn.png";
import Decoration from "../../../public/images/auth/decoration.png";
import FacebookIcon from "../../../public/images/auth/facebook.png";
import GoogleIcon from "../../../public/images/auth/google.png";
import Image from "next/image";
import { useTheme, Box, Typography } from "@mui/material";

import Link from "next/link";

import LoginForm from "@/components/forms/LoginForm";

const Login = () => {
  const theme = useTheme();
  return (
    <main>
      <Box
        component="section"
        bgcolor={theme.palette.background.default}
        className="container-login"
      >
        <article className="section-a">
          <div className="logo-container">
            <Link href="/">
              <Image className="logo" alt="logotipo" src={Logo} />
            </Link>
          </div>
          <div className="auth-container">
            <div className="auth-credential">
              <div className="auth-credential-head">
                <Typography 
                variant="h5"
                color={theme.palette.secondary.main}
                >Login</Typography>
                <Link href="/" className="link-head">
                  Help
                </Link>
              </div>
              <LoginForm />
            </div>
            <div className="etiqueta">
              <Typography sx={{color:theme.palette.secondary.contrastText}}>Puedes registrarte con</Typography>
              <div className="divider-container">
                <hr  className="divider" />
              </div>
            </div>
            <div className="auth-more">
              <div className="cont-btns-more">
                <button style={{color:theme.palette.secondary.light}} className=" boton icon-btn face-btn" >
                  <Image className="icon" alt="face-icon" src={FacebookIcon} />
                  Facebook
                </button>
                <button style={{color:theme.palette.secondary.light}}  className="boton icon-btn goo-btn">
                  <Image className="icon" alt="google-icon" src={GoogleIcon} />
                  Google
                </button>
              </div>
            </div>
          </div>
        </article>
        <article className="section-b">
          <div className="banner-container">
            <Image
              alt="Decoration image"
              src={Decoration}
              className="img-decoration"
            />
            <div className="container-morf">
              <div className="slider-object">
                <Typography className="slider-object-text" variant="h5">
                  Start your journey by one click, explore beautiful world!
                </Typography>
                <div className="img-container">
                  <Image
                    className="imagen-productor"
                    alt="imagen productor"
                    src={ImageBanner}
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
      </Box>
    </main>
  );
};

export default Login;
