"use client";

import { useState } from "react";
import Logo from "../../../../../public/images/logo.png";
import Image from "next/image";
import { Link_home } from "../../data";
import Link from "next/link";
import "./Navbar.css";

/* Iconos a usar en el navbar */
import { FiMoon } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import ToogleButton from "@/components/theme/toogleButton";

interface Props {
  pathNames: Link_home[];
}

function Navbar({ pathNames }: Props) {
  const [isNavShowing, setIsNavShowing] = useState<boolean>(false);

  return (
    <nav id="hea" className="header">
      <div className="container nav-container">
        <div className="imagen">
          <Link href="/">
            <Image src={Logo} className="logo" alt="Logotipo" />
          </Link>
        </div>
        <div className={`fondo ${isNavShowing ? "fondo-a" : "fondo-i"}`}></div>
        <div
          className={`nav-part2 ${
            isNavShowing ? "nav-part2-active" : "nav-part2-desactive"
          }`}
        >
          <div
            className={`contenedor-nav ${
              isNavShowing ? "contenedor-nav-active" : "contenedor-nav-inactive"
            }`}
          >
            <ul className="nav-list">
              {pathNames.map((pathName) => (
                <Link
                  className="nav-link"
                  key={pathName.path}
                  href={pathName.path}
                >
                  {pathName.name}
                </Link>
              ))}
            </ul>
            <div className="part-1">
              <div className="dark-mode">
                <p>Dark mode</p>
                <ToogleButton/>
              </div>
              <Link className="boton-base btn-login" href="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
        <button
          className="btn-nav-toogle"
          onClick={() => setIsNavShowing((prev) => !prev)}
        >
          <FaBars className="menu-icon" />
        </button>
      </div>
    </nav>
  );
}

/* barra pegajosa */
function scrollHeader() {
  const header = document.getElementById("hea")!;

  if (scrollY >= 50) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
window.addEventListener("scroll", scrollHeader);

//=============== Activar enlaces ===============

var sections = document.querySelectorAll<HTMLDivElement>("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav-list .nav-link[href*=" + sectionId + "]"
      )!;
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

export default Navbar;
