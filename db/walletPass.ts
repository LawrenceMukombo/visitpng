export interface WalletPassData {
  passTypeIdentifier: string;
  serialNumber: string;
  teamIdentifier: string;
  organizationName: string;
  description: string;
  logoText: string;
  foregroundColor: string;
  backgroundColor: string;
  labelColor: string;
  member: {
    fullName: string;
    membershipNumber: string;
    tier: string;
    validUntil: string;
    qrToken: string;
  };
}

export function generateAppleWalletPayload(input: {
  countryCode?: string;
  fullName: string;
  membershipNumber: string;
  tier: string;
  validUntil: string;
  qrToken: string;
}): WalletPassData {
  const isZambia = (input.countryCode || "ZMB").toUpperCase() === "ZMB";
  const brandName = isZambia ? "ZamRoam" : "VisitPNG";

  return {
    passTypeIdentifier: `pass.com.lamtoninvestments.${isZambia ? "zamroam" : "visitpng"}`,
    serialNumber: input.membershipNumber,
    teamIdentifier: "LAMTON9988",
    organizationName: "Lamton Investments Ltd",
    description: `${brandName} Digital Pass`,
    logoText: `${brandName} Pass`,
    foregroundColor: "rgb(255, 255, 255)",
    backgroundColor: isZambia ? "rgb(27, 105, 96)" : "rgb(22, 90, 80)",
    labelColor: isZambia ? "rgb(222, 119, 57)" : "rgb(231, 117, 34)",
    member: {
      fullName: input.fullName,
      membershipNumber: input.membershipNumber,
      tier: input.tier,
      validUntil: input.validUntil,
      qrToken: input.qrToken
    }
  };
}

export function generateGoogleWalletJwtPayload(input: {
  countryCode?: string;
  fullName: string;
  membershipNumber: string;
  tier: string;
  validUntil: string;
  qrToken: string;
}) {
  const isZambia = (input.countryCode || "ZMB").toUpperCase() === "ZMB";
  const brandName = isZambia ? "ZamRoam" : "VisitPNG";

  return {
    iss: "service-account@lamtoninvestments.iam.gserviceaccount.com",
    aud: "google",
    typ: "savetogooglewallet",
    payload: {
      genericObjects: [
        {
          id: `3388000000022211999.${input.membershipNumber}`,
          classId: `3388000000022211999.${isZambia ? "zamroam_pass" : "visitpng_pass"}`,
          logo: {
            sourceUri: {
              uri: `https://${isZambia ? "zamroam.com" : "visitpng.lamtoninvestments.com"}/icon.png`
            }
          },
          cardTitle: {
            defaultValue: {
              language: "en",
              value: `${brandName} Pass`
            }
          },
          header: {
            defaultValue: {
              language: "en",
              value: input.tier.toUpperCase()
            }
          },
          subheader: {
            defaultValue: {
              language: "en",
              value: input.fullName
            }
          },
          barcode: {
            type: "QR_CODE",
            value: input.qrToken,
            alternateText: input.membershipNumber
          },
          hexBackgroundColor: isZambia ? "#1B6960" : "#165A50"
        }
      ]
    }
  };
}
