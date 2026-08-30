import React from "react";
import { PartnerLanding } from "../components/PartnerLanding";
import { Footer } from "../components/Footer";

export default function PartnersPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f8fbfb" }}>
      <PartnerLanding countryCode="PNG" currency="PGK" />
      <Footer countryCode="PNG" brandName="VisitPNG" />
    </div>
  );
}
