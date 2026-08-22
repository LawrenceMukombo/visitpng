"use client";
import {useState, useMemo} from "react";
import {PNG_REGIONS, PNG_PROVINCES, findLocationSmartHierarchy as findPngSmartHierarchy} from "../../db/pngGeography";
import {ZAMBIA_REGIONS, ZAMBIA_PROVINCES} from "../../db/zambiaGeography";

export interface CascadeSelection {
  region: string;
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
  countryCode?: string;
  destinations: DestinationOption[];
  provinces: ProvinceOption[];
  selectedDestinationId?: number;
  selectedProvinceId?: number;
  selectedDistrict?: string;
  onSelect: (selection: CascadeSelection) => void;
  mode?: "destination-picker" | "location-manager";
}

export default function SmartLocationCascade({
  countryCode = "ZMB",
  destinations,
  provinces,
  selectedDestinationId = 0,
  selectedProvinceId = 0,
  selectedDistrict = "",
  onSelect,
  mode = "destination-picker"
}: SmartLocationCascadeProps) {
  const isZambia = (countryCode || "").toUpperCase() === "ZMB";

  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>("");
  const [districtValue, setDistrictValue] = useState<string>(selectedDistrict);
  const [selectedDestId, setSelectedDestId] = useState<number>(selectedDestinationId);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [smartMatchHint, setSmartMatchHint] = useState<string>("");

  const [prevCountry, setPrevCountry] = useState(countryCode);
  if (prevCountry !== countryCode) {
    setPrevCountry(countryCode);
    setSelectedRegion("");
    setSelectedProvinceCode("");
    setDistrictValue("");
    setSelectedDestId(0);
    setSearchQuery("");
    setSmartMatchHint("");
  }

  const [prevDestId, setPrevDestId] = useState(selectedDestinationId);
  if (prevDestId !== selectedDestinationId) {
    setPrevDestId(selectedDestinationId);
    if (mode === "destination-picker" && selectedDestinationId && destinations.length > 0) {
      const match = destinations.find(d => d.id === selectedDestinationId);
      if (match) {
        setSelectedDestId(match.id);
        setSelectedProvinceCode(match.provinceCode);
        setSelectedRegion(match.provinceRegion || "");
        setDistrictValue(match.district || "");
      }
    }
  }

  const [prevProvId, setPrevProvId] = useState(selectedProvinceId);
  if (prevProvId !== selectedProvinceId) {
    setPrevProvId(selectedProvinceId);
    if (mode === "location-manager" && selectedProvinceId && provinces.length > 0) {
      const prov = provinces.find(p => p.id === selectedProvinceId);
      if (prov) {
        setSelectedProvinceCode(prov.code);
        setSelectedRegion(prov.region || "");
      }
    }
  }

  const activeRegionsList = useMemo(() => {
    return isZambia ? ZAMBIA_REGIONS.map(r => r.name) : PNG_REGIONS.map(r => r.name);
  }, [isZambia]);

  const activeProvincesList = useMemo(() => {
    return isZambia ? ZAMBIA_PROVINCES : PNG_PROVINCES;
  }, [isZambia]);

  // Available provinces based on selected region
  const availableProvinces = useMemo(() => {
    return activeProvincesList.filter(p => !selectedRegion || p.region === selectedRegion);
  }, [activeProvincesList, selectedRegion]);

  // Available districts based on selected province
  const availableDistricts = useMemo(() => {
    if (!selectedProvinceCode) return [];
    const prov = activeProvincesList.find(p => p.code === selectedProvinceCode);
    if (!prov) return [];
    return prov.districts.map(d => typeof d === "string" ? d : d.name);
  }, [activeProvincesList, selectedProvinceCode]);

  // Available destinations filtered by cascade
  const availableDestinations = useMemo(() => {
    return destinations.filter(d => {
      if (selectedProvinceCode && d.provinceCode !== selectedProvinceCode) return false;
      if (selectedRegion && d.provinceRegion !== selectedRegion) return false;
      if (districtValue && d.district && !d.district.toLowerCase().includes(districtValue.toLowerCase())) return false;
      return true;
    });
  }, [destinations, selectedRegion, selectedProvinceCode, districtValue]);

  // Smart Search
  const handleSmartSearch = (text: string) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSmartMatchHint("");
      return;
    }

    const queryLower = text.toLowerCase();

    if (isZambia) {
      // Find in Zambian hierarchy
      let matchedProv = ZAMBIA_PROVINCES.find(p => p.name.toLowerCase().includes(queryLower) || p.capital.toLowerCase().includes(queryLower));
      let matchedDistName = "";
      let matchedDestName = "";

      if (!matchedProv) {
        for (const prov of ZAMBIA_PROVINCES) {
          for (const dist of prov.districts) {
            if (dist.name.toLowerCase().includes(queryLower)) {
              matchedProv = prov;
              matchedDistName = dist.name;
              break;
            }
            const keyDest = dist.keyDestinations.find(k => k.toLowerCase().includes(queryLower));
            if (keyDest) {
              matchedProv = prov;
              matchedDistName = dist.name;
              matchedDestName = keyDest;
              break;
            }
          }
          if (matchedProv) break;
        }
      }

      if (matchedProv) {
        setSelectedRegion(matchedProv.region);
        setSelectedProvinceCode(matchedProv.code);
        if (matchedDistName) setDistrictValue(matchedDistName);
        setSmartMatchHint(`Auto-detected: ${matchedDestName || matchedDistName || matchedProv.name} in ${matchedProv.name} (${matchedProv.region})`);

        const destMatch = destinations.find(d => 
          d.name.toLowerCase().includes(queryLower) || 
          (matchedDestName && d.name.toLowerCase().includes(matchedDestName.toLowerCase()))
        );
        const provMatch = provinces.find(p => p.code === matchedProv!.code);

        onSelect({
          region: matchedProv.region,
          provinceCode: matchedProv.code,
          provinceName: matchedProv.name,
          provinceId: provMatch?.id,
          district: matchedDistName,
          destinationId: destMatch?.id,
          destinationName: destMatch?.name || matchedDestName,
          destinationSlug: destMatch?.slug
        });
        return;
      }
    } else {
      const smart = findPngSmartHierarchy(text);
      if (smart) {
        setSelectedRegion(smart.region);
        setSelectedProvinceCode(smart.provinceCode);
        setDistrictValue(smart.districtName);
        setSmartMatchHint(`Auto-detected: ${smart.destinationName || smart.districtName} in ${smart.provinceName} (${smart.region} Region)`);

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
        return;
      }
    }

    setSmartMatchHint("");
  };

  const handleRegionChange = (reg: string) => {
    setSelectedRegion(reg);
    setSelectedProvinceCode("");
    setDistrictValue("");
    setSelectedDestId(0);
    setSearchQuery("");
  };

  const handleProvinceChange = (provCode: string) => {
    setSelectedProvinceCode(provCode);
    setDistrictValue("");
    setSelectedDestId(0);

    const provData = activeProvincesList.find(p => p.code === provCode);
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

  const handleDistrictSelect = (dist: string) => {
    setDistrictValue(dist);
    const provData = activeProvincesList.find(p => p.code === selectedProvinceCode);
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
      setSelectedRegion(dest.provinceRegion || "");
      if (dest.district) setDistrictValue(dest.district);

      onSelect({
        region: dest.provinceRegion || selectedRegion,
        provinceCode: dest.provinceCode,
        provinceName: dest.provinceName,
        provinceId: dest.provinceId,
        district: dest.district || districtValue,
        destinationId: dest.id,
        destinationName: dest.name,
        destinationSlug: dest.slug
      });
    }
  };

  const resetCascade = () => {
    setSelectedRegion("");
    setSelectedProvinceCode("");
    setDistrictValue("");
    setSelectedDestId(0);
    setSearchQuery("");
    setSmartMatchHint("");
  };

  const selectedProvName = activeProvincesList.find(p => p.code === selectedProvinceCode)?.name || provinces.find(p => p.code === selectedProvinceCode)?.name;
  const selectedDestObj = destinations.find(d => d.id === selectedDestId);

  return (
    <div className="smartCascadeContainer">
      <div className="smartCascadeHeader">
        <div className="smartSearchWrapper">
          <span className="smartSearchIcon">🔍</span>
          <input
            type="text"
            className="smartSearchInput"
            placeholder={isZambia ? "Type anywhere in Zambia (e.g. Livingstone, Mfuwe, Lower Zambezi, Kafue, Kariba...)" : "Type anywhere in PNG (e.g. Kokoda, Tufi, Sepik, Rabaul, Kimbe, Goroka...)"}
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
          <label>1. Region ({activeRegionsList.length})</label>
          <select value={selectedRegion} onChange={e => handleRegionChange(e.target.value)}>
            <option value="">{isZambia ? "All Zambia Regions" : "All PNG Regions"}</option>
            {activeRegionsList.map(r => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Step 2: Province */}
        <div className="cascadeStep">
          <label>2. Province ({availableProvinces.length})</label>
          <select value={selectedProvinceCode} onChange={e => handleProvinceChange(e.target.value)}>
            <option value="">Choose Province</option>
            {availableProvinces.map(p => (
              <option key={p.code} value={p.code}>
                {p.name} ({p.code})
              </option>
            ))}
          </select>
        </div>

        {/* Step 3: District */}
        <div className="cascadeStep">
          <label>3. District {selectedProvinceCode && `(${availableDistricts.length})`}</label>
          {availableDistricts.length > 0 ? (
            <select
              value={districtValue}
              onChange={e => handleDistrictSelect(e.target.value)}
            >
              <option value="">Select District</option>
              {availableDistricts.map(d => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              placeholder={selectedProvinceCode ? "Enter custom district" : "Select Province First"}
              value={districtValue}
              disabled={!selectedProvinceCode}
              onChange={e => handleDistrictSelect(e.target.value)}
            />
          )}
        </div>

        {/* Step 4: Destination */}
        {mode === "destination-picker" && (
          <div className="cascadeStep">
            <label>4. Destination ({availableDestinations.length})</label>
            <select
              value={selectedDestId || ""}
              onChange={e => handleDestinationChange(Number(e.target.value))}
            >
              <option value="">Choose Destination</option>
              {availableDestinations.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} {d.district ? `(${d.district})` : ""}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Selected location breadcrumb summary */}
      {(selectedProvName || selectedDestObj) && (
        <div className="cascadeBreadcrumbs">
          <span className="breadcrumbPill regionPill">🌐 {selectedRegion || (isZambia ? "Zambia" : "PNG")}</span>
          {selectedProvName && <span className="breadcrumbPill provPill">📍 {selectedProvName}</span>}
          {districtValue && <span className="breadcrumbPill distPill">🏘️ {districtValue}</span>}
          {selectedDestObj && <span className="breadcrumbPill destPill">⭐ {selectedDestObj.name}</span>}
        </div>
      )}
    </div>
  );
}
