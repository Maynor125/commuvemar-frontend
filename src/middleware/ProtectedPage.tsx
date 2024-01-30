'use client'
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store/store";
import { useAppSelector } from "@/redux/store/store";
import React, { useEffect } from "react";

type ProtectedRouteProps = {
    children: React.ReactNode;
  };

  const ProtectedPage: React.FC<ProtectedRouteProps> = ({ children }) =>{
    const router = useRouter();
    const isAuthenticated = useAppSelector(
      (state: RootState) => state.auth.logueado
    );
    useEffect(() => {
        // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
        if (!isAuthenticated) {
          router.push('/login');
        }
      }, [isAuthenticated, router]);
    
      // Si el usuario está autenticado, renderizar el contenido de la ruta protegida
      return isAuthenticated ? <>{children}</> : null;
  }

  export default ProtectedPage;