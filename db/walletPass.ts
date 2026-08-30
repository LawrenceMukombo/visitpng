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
  const brandName = "VisitPNG";

  return {
    passTypeIdentifier: "pass.com.visitpng.pass",
    serialNumber: input.membershipNumber,
    teamIdentifier: "VPNG9988",
    organizationName: "VisitPNG Tourism Services Ltd",
    description: `${brandName} Digital Pass`,
    logoText: `${brandName} Pass`,
    foregroundColor: "rgb(255, 255, 255)",
    backgroundColor: "rgb(27, 105, 96)",
    labelColor: "rgb(231, 117, 34)",
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
  const brandName = "VisitPNG";

  return {
    iss: "service-account@visitpng.iam.gserviceaccount.com",
    aud: "google",
    typ: "savetogooglewallet",
    payload: {
      genericObjects: [
        {
          id: `3388000000022211999.${input.membershipNumber}`,
          classId: "3388000000022211999.visitpng_pass",
          logo: {
            sourceUri: {
              uri: "https://visitpng.com/icon.png"
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
          hexBackgroundColor: "#1B6960"
        }
      ]
    }
  };
}
