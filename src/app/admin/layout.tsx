import SideBar from "@/components/admin/sidebar/SideBar";
import React from "react";

export const metadata = {
  title: "Commuvemar | Admin",
  description: "Cooperativa multisectorial veintinueve de maarzo.",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <main>
    <SideBar/>
    {children}
    </main>;
};

export default layout;
