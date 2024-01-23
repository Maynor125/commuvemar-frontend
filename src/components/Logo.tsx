import Image from "next/image";
import logo from "../../public/images/logo.png";
import Link from "next/link";
import './components.css'
import React from "react";

interface adminState{
    admin: boolean
}

const Logo:React.FC<adminState> = ({admin}) => {
  return (
    <div className="logo-container">
      <Link href={admin ? '/admin' : '/'}>
      <Image alt="Logotipo de coomuvemar" src={logo} />
      </Link>
    </div>
  );
};

export default Logo;
