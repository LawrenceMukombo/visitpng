import React from "react";
import { AboutPage } from "../components/AboutPage";
import { Footer } from "../components/Footer";

export default function AboutRoute() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f8fbfb" }}>
      <AboutPage countryCode="ZMB" />
      <Footer countryCode="ZMB" brandName="ZamRoam" />
    </div>
  );
}
