import SideBar from "@/components/admin/sidebar/SideBar";
import React from "react";
import AdminContainer from "@/components/admin/AdminContainer";
import NavbarAdmin from "@/components/admin/navbarAdmin/NavbarAdmin";

export const metadata = {
  title: "Commuvemar | Admin",
  description: "Cooperativa multisectorial veintinueve de maarzo.",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminContainer>
      <div>
        <NavbarAdmin />
        {children}
      </div>
    </AdminContainer>
  );
};

export default layout;
