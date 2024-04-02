import React from "react";
import { Header } from "../components/Header";
export const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div>
        {children}
      </div>
    </>
  );
}