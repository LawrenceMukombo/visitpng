"use client";

import React from "react";
import PngInteractiveMap, { PNG_DESTINATION_PINS, DestinationPin } from "./PngInteractiveMap";

export default function PngOsmMap({ onSelectDestination }: { onSelectDestination?: (name: string) => void }) {
  return (
    <PngInteractiveMap onSelectDestination={onSelectDestination} />
  );
}

// Backward compatibility alias
export const ZambiaOsmMap = PngOsmMap;
export { PNG_DESTINATION_PINS };
export type { DestinationPin };
