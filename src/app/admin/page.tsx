import Welcome from "@/components/admin/overview/Welcome";
import ProtectedPage from "@/middleware/ProtectedPage";
import React from "react";

const OverView = () => {
  return <main>
    <Welcome/>
  </main>;
};

export default OverView;
