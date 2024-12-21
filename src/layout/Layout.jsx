import React from "react";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <h1>공통 헤더</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
