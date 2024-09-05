import SideBar from "@/components/admin/sidebar/SideBar";
import React from "react";
import AdminContainer from "@/components/admin/AdminContainer";
import NavbarAdmin from "@/components/admin/navbarAdmin/NavbarAdmin";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Commuvemar | Admin",
  description: "Funcionalidades de administrador como revisar las fichas y analizarlas",
  icons:{
    icon:'../favicon-v2.ico'
  }
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminContainer>
      <NavbarAdmin />
      {children}
    </AdminContainer>
  );
};

export default layout;
