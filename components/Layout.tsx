import { AuthContext } from "@/context/AuthContext";
import React, { useContext } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: any }) {
  const { user, userLoading } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
