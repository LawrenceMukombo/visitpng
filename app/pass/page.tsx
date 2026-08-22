import React from "react";
import { PassLanding } from "../components/PassLanding";
import { Footer } from "../components/Footer";

export default function PassPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f8fbfb" }}>
      <PassLanding countryCode="ZMB" currency="ZMW" />
      <Footer countryCode="ZMB" brandName="ZamRoam" />
    </div>
  );
}
