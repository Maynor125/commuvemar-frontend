
import "./login.css";

import Logo from "../../../public/images/logo.png";
import ImageBanner from "../../../public/images/auth/imgAdorn.png";
import Decoration from "../../../public/images/auth/decoration.png";
import FacebookIcon from "../../../public/images/auth/facebook.png";
import GoogleIcon from "../../../public/images/auth/google.png";
import Image from "next/image";

import Link from "next/link";

import LoginForm from "@/components/forms/LoginForm";

const Login = () => {

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
                <h3>Login</h3>
                <Link href="/" className="link-head">
                  Help
                </Link>
              </div>
              <LoginForm/>
            </div>
            <div className="etiqueta">
              <p>Puedes registrarte con</p>
              <div className="divider-container">
                <hr className="divider" />
              </div>
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
