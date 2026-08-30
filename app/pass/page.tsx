import React from "react";
import { PassLanding } from "../components/PassLanding";
import { Footer } from "../components/Footer";

export default function PassPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f8fbfb" }}>
      <PassLanding countryCode="PNG" currency="PGK" />
      <Footer countryCode="PNG" brandName="VisitPNG" />
    </div>
  );
}
