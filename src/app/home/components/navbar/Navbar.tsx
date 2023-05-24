'use client'

import  {useState}  from 'react'
import Logo from "../../images/logo.png";
import Image from "next/image";
import { Link_home } from "../../data";
import Link from "next/link";
import "./Navbar.css";

/* Iconos a usar en el navbar */
import {FiMoon} from 'react-icons/fi'
import {FaBars} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'

interface Props {
  pathNames: Link_home[];
}

function Navbar({ pathNames }: Props) {

   
  const [isNavShowing,setIsNavShowing] = useState<boolean>(false)

  return (
    <nav>
      <div className="container nav-container">
          <div className="imagen">
            <Image src={Logo} className="logo" alt="Logotipo" />
          </div>
          <div className={`fondo ${isNavShowing ? 'fondo-a':'fondo-i'}`}></div>
        <div className={`nav-part2 ${isNavShowing ? 'nav-part2-active':'nav-part2-desactive'}`}> 
          <div className={`contenedor-nav ${isNavShowing ? 'contenedor-nav-active':'contenedor-nav-inactive'}`}>
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
              <FiMoon className="icono-dark-mode"/>
            </div>
          <Link className="boton-base btn-login" href="/login">
            Login
          </Link>
          </div>
          </div>
        </div>
        <button className="btn-nav-toogle" onClick={()=> setIsNavShowing(prev => !prev)}>
             <FaBars className='menu-icon'/>
          </button>
      </div>
    </nav>
  );
}

/* barra pegajosa */
window.addEventListener("scroll",function(){

  var header1=document.querySelector("hola");
  header1.classList.toggle("sticky",window.screenY > 0)
})

export default Navbar;
