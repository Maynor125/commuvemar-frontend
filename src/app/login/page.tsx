"use client";

import React from "react";
import "./login.css";

import Logo from "../../../public/images/logo.png";
import ImageBanner from "../../../public/images/auth/imgAdorn.png";
import Decoration from "../../../public/images/auth/decoration.png";
import FacebookIcon from "../../../public/images/auth/facebook.png";
import GoogleIcon from "../../../public/images/auth/google.png";
import Image from "next/image";

import TextField from "@mui/material/TextField";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";

import Divider from "@mui/material/Divider";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <main>
      <section className="container-login">
        <article className="section-a">
          <div className="logo-container">
            <Link href="/">
              <Image className="logo" alt="logotipo" src={Logo} />
            </Link>
          </div>
          <div className="auth-container">
            <div className="auth-credential">
              <div className="auth-credential-head">
                <h4>Login</h4>
                <Link href="/" className="link-head">Daftar</Link>
              </div>
              <form action="" className="form">
                <TextField
                  id="outlined-basic"
                  label="Digita tu email"
                  variant="outlined"
                  size="medium"
                />
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    size="medium"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <button className="boton btn-login">Login</button>
              </form>
            </div>
            <div className="etiqueta">
              <Divider sx={{ zIndex: -1 }} className="divider" />
              <p>Puedes registrarte con</p>
            </div>
            <div className="auth-more">
              <div className="cont-btns-more">
                <button className=" boton icon-btn face-btn">
                  <Image className="icon" alt="face-icon" src={FacebookIcon} />
                  Facebook
                </button>
                <button className="boton icon-btn goo-btn">
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
                <h2>
                  Start your journey by one click, explore beautiful world!
                </h2>
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
      </section>
    </main>
  );
};

export default Login;
