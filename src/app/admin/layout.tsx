import SideBar from "@/components/admin/sidebar/SideBar";
import React from "react";
import { PathsSideBar } from "@/data/admin/sideInfo";

export const metadata = {
  title: "Commuvemar | Admin",
  description: "Cooperativa multisectorial veintinueve de maarzo.",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <main>
    <SideBar paths={PathsSideBar}/>
    {children}
    </main>;
};

export default layout;
