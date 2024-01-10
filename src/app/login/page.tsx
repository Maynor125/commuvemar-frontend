import React from "react";
import "./login.css";
import Logo from "../../../public/images/logo.png";
import ImageBanner from '../../../public/images/auth/imgAdorn.png'
import Decoration from '../../../public/images/auth/decoration.png'
import Image from "next/image";

const Login = () => {
  return (
    <main>
      <section className="container">
        <article className="section-a">
          <div className="logo-container">
            <Image className="logo" alt="logotipo" src={Logo} />
          </div>
          <div className="auth-container">
            <div className="auth-credential"></div>
            <div className="auth-more"></div>
          </div>
        </article>
        <article className="section-b">
          <div className="banner-container">
            <Image alt="Decoration image" src={Decoration}/>
            <div className="container-morf">
              <div className="slider-object">
                <h2>
                Start your journey by one click, explore beautiful world!
                </h2>
                <div className="img-container">
                  <Image alt="imagen productor" src={ImageBanner}/>
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
