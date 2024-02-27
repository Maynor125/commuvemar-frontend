"use client";

import {
  logout,
  setCredentials,
  setInfoUser,
} from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import jwt from "jsonwebtoken";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const storedToken = localStorage.getItem("token");
  const router = useRouter();

  useEffect(() => {
    if (storedToken) {
      const tokenData = jwt.decode(storedToken) as { [key: string]: any };

      if (tokenData && tokenData.exp) {
        const timesTamp = Math.floor(Date.now() / 1000);
        console.log("la expiracion del token es", tokenData.exp);

        if (tokenData.exp < timesTamp) {
          // Token caducado, limpia el token del localStorage
          localStorage.removeItem("token");

          // Redirige al usuario a la página de inicio de sesión
          router.push("/login");
          dispatch(logout());
        } else {
          // Token válido, continúa con la aplicación.
          if (tokenData.sub) {
            const tokenIdUser = tokenData?.sub;
            console.log("Este es el token", tokenIdUser);
            dispatch(
              setInfoUser({
                token: String(tokenData),
                logueado: true,
                idUser: Number(tokenIdUser),
                email: String(tokenData.email),
              })
            );
          }
        }
      }
    }
  }, [storedToken]);

  useEffect(() => {
    if (storedToken) {
      dispatch(setCredentials(storedToken));
      console.log("estas logeado papi");
    } else {
      console.log("Busca como logearse");
    }
  }, [storedToken]);
  return <>{children}</>;
};

export default AuthProvider;
