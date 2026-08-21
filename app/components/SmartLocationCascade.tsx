"use client";
import {useState, useEffect, useMemo} from "react";
import {PNG_REGIONS, PNG_PROVINCES, findLocationSmartHierarchy, PngRegion} from "../../db/pngGeography";

export interface CascadeSelection {
  region: PngRegion | "";
  provinceCode: string;
  provinceName: string;
  provinceId?: number;
  district: string;
  destinationId?: number;
  destinationName: string;
  destinationSlug?: string;
}

interface DestinationOption {
  id: number;
  name: string;
  slug: string;
  district: string | null;
  provinceId: number;
  provinceName: string;
  provinceCode: string;
  provinceRegion: string;
}

interface ProvinceOption {
  id: number;
  code: string;
  name: string;
  region: string;
}

interface SmartLocationCascadeProps {
  destinations: DestinationOption[];
  provinces: ProvinceOption[];
  selectedDestinationId?: number;
  onSelect: (selection: CascadeSelection) => void;
  mode?: "destination-picker" | "location-manager";
}

export default function SmartLocationCascade({
  destinations,
  provinces,
  selectedDestinationId = 0,
  onSelect,
  mode = "destination-picker"
}: SmartLocationCascadeProps) {
  const [selectedRegion, setSelectedRegion] = useState<PngRegion | "">("");
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedDestId, setSelectedDestId] = useState<number>(selectedDestinationId);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [smartMatchHint, setSmartMatchHint] = useState<string>("");

  // Synchronize from parent selectedDestinationId
  useEffect(() => {
    if (selectedDestinationId && destinations.length > 0) {
      const match = destinations.find(d => d.id === selectedDestinationId);
      if (match) {
        setSelectedDestId(match.id);
        setSelectedProvinceCode(match.provinceCode);
        setSelectedRegion((match.provinceRegion as PngRegion) || "");
        setSelectedDistrict(match.district || "");
      }
    }
  }, [selectedDestinationId, destinations]);

  // Available provinces based on selected region
  const availableProvinces = useMemo(() => {
    return PNG_PROVINCES.filter(p => !selectedRegion || p.region === selectedRegion);
  }, [selectedRegion]);

  // Available districts based on selected province
  const availableDistricts = useMemo(() => {
    if (!selectedProvinceCode) return [];
    const prov = PNG_PROVINCES.find(p => p.code === selectedProvinceCode);
    return prov ? prov.districts : [];
  }, [selectedProvinceCode]);

  // Available destinations filtered by cascade
  const availableDestinations = useMemo(() => {
    return destinations.filter(d => {
      if (selectedProvinceCode && d.provinceCode !== selectedProvinceCode) return false;
      if (selectedRegion && d.provinceRegion !== selectedRegion) return false;
      if (selectedDistrict && d.district && !d.district.toLowerCase().includes(selectedDistrict.toLowerCase())) return false;
      return true;
    });
  }, [destinations, selectedRegion, selectedProvinceCode, selectedDistrict]);

  // Handle Smart Search Input
  const handleSmartSearch = (text: string) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSmartMatchHint("");
      return;
    }

    const smart = findLocationSmartHierarchy(text);
    if (smart) {
      setSelectedRegion(smart.region);
      setSelectedProvinceCode(smart.provinceCode);
      setSelectedDistrict(smart.districtName);
      setSmartMatchHint(`Auto-detected: ${smart.destinationName || smart.districtName} in ${smart.provinceName} (${smart.region} Region)`);

      // Match destination in DB if available
      const destMatch = destinations.find(d => 
        d.name.toLowerCase().includes(text.toLowerCase()) || 
        (smart.destinationName && d.name.toLowerCase().includes(smart.destinationName.toLowerCase()))
      );

      const provMatch = provinces.find(p => p.code === smart.provinceCode);

      onSelect({
        region: smart.region,
        provinceCode: smart.provinceCode,
        provinceName: smart.provinceName,
        provinceId: provMatch?.id,
        district: smart.districtName,
        destinationId: destMatch?.id,
        destinationName: destMatch?.name || smart.destinationName,
        destinationSlug: destMatch?.slug
      });
    } else {
      setSmartMatchHint("");
    }
  };

  const handleRegionChange = (reg: PngRegion | "") => {
    setSelectedRegion(reg);
    setSelectedProvinceCode("");
    setSelectedDistrict("");
    setSelectedDestId(0);
    setSearchQuery("");
  };

  const handleProvinceChange = (provCode: string) => {
    setSelectedProvinceCode(provCode);
    setSelectedDistrict("");
    setSelectedDestId(0);

    const provData = PNG_PROVINCES.find(p => p.code === provCode);
    if (provData && (!selectedRegion || selectedRegion !== provData.region)) {
      setSelectedRegion(provData.region);
    }

    const provDb = provinces.find(p => p.code === provCode);
    onSelect({
      region: provData?.region || selectedRegion,
      provinceCode: provCode,
      provinceName: provData?.name || "",
      provinceId: provDb?.id,
      district: "",
      destinationName: ""
    });
  };

  const handleDistrictChange = (dist: string) => {
    setSelectedDistrict(dist);
    const provData = PNG_PROVINCES.find(p => p.code === selectedProvinceCode);
    const provDb = provinces.find(p => p.code === selectedProvinceCode);
    onSelect({
      region: provData?.region || selectedRegion,
      provinceCode: selectedProvinceCode,
      provinceName: provData?.name || "",
      provinceId: provDb?.id,
      district: dist,
      destinationName: ""
    });
  };

  const handleDestinationChange = (destId: number) => {
    setSelectedDestId(destId);
    const dest = destinations.find(d => d.id === destId);
    if (dest) {
      setSelectedProvinceCode(dest.provinceCode);
      setSelectedRegion((dest.provinceRegion as PngRegion) || "");
      if (dest.district) setSelectedDistrict(dest.district);

      onSelect({
        region: (dest.provinceRegion as PngRegion) || selectedRegion,
        provinceCode: dest.provinceCode,
        provinceName: dest.provinceName,
        provinceId: dest.provinceId,
        district: dest.district || selectedDistrict,
        destinationId: dest.id,
        destinationName: dest.name,
        destinationSlug: dest.slug
      });
    }
  };

  const resetCascade = () => {
    setSelectedRegion("");
    setSelectedProvinceCode("");
    setSelectedDistrict("");
    setSelectedDestId(0);
    setSearchQuery("");
    setSmartMatchHint("");
  };

  const selectedProvName = PNG_PROVINCES.find(p => p.code === selectedProvinceCode)?.name;
  const selectedDestObj = destinations.find(d => d.id === selectedDestId);

  return (
    <div className="smartCascadeContainer">
      <div className="smartCascadeHeader">
        <div className="smartSearchWrapper">
          <span className="smartSearchIcon">🔍</span>
          <input
            type="text"
            className="smartSearchInput"
            placeholder="Smart PNG Search: type e.g. Kokoda, Tufi, Sepik, Rabaul, Goroka..."
            value={searchQuery}
            onChange={e => handleSmartSearch(e.target.value)}
          />
          {searchQuery && (
            <button type="button" className="smartClearBtn" onClick={resetCascade} title="Reset cascade">
              ✕
            </button>
          )}
        </div>
        {smartMatchHint && (
          <p className="smartMatchHint" aria-live="polite">
            ⚡ {smartMatchHint}
          </p>
        )}
      </div>

      <div className="smartCascadeGrid">
        {/* Step 1: Region */}
        <div className="cascadeStep">
          <label>1. Region (4)</label>
          <select value={selectedRegion} onChange={e => handleRegionChange(e.target.value as PngRegion | "")}>
            <option value="">All PNG Regions</option>
            {PNG_REGIONS.map(r => (
              <option key={r.name} value={r.name}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {/* Step 2: Province */}
        <div className="cascadeStep">
          <label>2. Province ({availableProvinces.length})</label>
          <select value={selectedProvinceCode} onChange={e => handleProvinceChange(e.target.value)}>
            <option value="">{selectedRegion ? `Select ${selectedRegion} Province` : "Choose Province"}</option>
            {availableProvinces.map(p => (
              <option key={p.code} value={p.code}>
                [{p.code}] {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Step 3: District */}
        <div className="cascadeStep">
          <label>3. District {availableDistricts.length ? `(${availableDistricts.length})` : ""}</label>
          <select
            value={selectedDistrict}
            onChange={e => handleDistrictChange(e.target.value)}
            disabled={!selectedProvinceCode}
          >
            <option value="">{selectedProvinceCode ? "Choose District / Area" : "Select Province First"}</option>
            {availableDistricts.map(d => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Step 4: Destination/Location (in picker mode) */}
        {mode === "destination-picker" && (
          <div className="cascadeStep">
            <label>4. Registered Location / Place</label>
            <select
              value={selectedDestId}
              onChange={e => handleDestinationChange(Number(e.target.value))}
            >
              <option value="0">
                {availableDestinations.length ? "Choose Destination" : "No places in selection"}
              </option>
              {availableDestinations.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.provinceName}{d.district ? ` · ${d.district}` : ""})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Visual Breadcrumb Trail */}
      {(selectedRegion || selectedProvinceCode || selectedDistrict || selectedDestObj) && (
        <div className="cascadeBreadcrumb">
          <span className="breadcrumbLabel">Smart Cascade Location:</span>
          {selectedRegion && <span className="cascadeChip region">{selectedRegion} Region</span>}
          {selectedProvName && <span className="cascadeChip province">{selectedProvName}</span>}
          {selectedDistrict && <span className="cascadeChip district">{selectedDistrict}</span>}
          {selectedDestObj && <span className="cascadeChip destination">{selectedDestObj.name}</span>}
        </div>
      )}
    </div>
  );
}
