import React from "react";
import { PartnerLanding } from "../components/PartnerLanding";
import { Footer } from "../components/Footer";

export default function PartnersPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f8fbfb" }}>
      <PartnerLanding countryCode="ZMB" currency="ZMW" />
      <Footer countryCode="ZMB" brandName="ZamRoam" />
    </div>
  );
}
