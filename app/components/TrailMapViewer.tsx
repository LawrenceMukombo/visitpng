"use client";
import {useState, useEffect} from "react";
import {TrailPack, generateGpx} from "../../db/trailPacks";

interface TrailMapViewerProps {
  trail: TrailPack;
}

export default function TrailMapViewer({trail}: TrailMapViewerProps) {
  const [isSavedOffline, setIsSavedOffline] = useState(false);
  const [selectedWaypointIndex, setSelectedWaypointIndex] = useState<number | null>(null);
  const [downloadNotice, setDownloadNotice] = useState("");

  useEffect(() => {
    let active = true;
    try {
      const savedPacks = JSON.parse(localStorage.getItem("visitpng_offline_trails") || "[]");
      if (active) {
        setIsSavedOffline(savedPacks.includes(trail.id));
      }
    } catch {
      if (active) setIsSavedOffline(false);
    }
    return () => { active = false; };
  }, [trail.id]);

  const toggleSaveOffline = () => {
    try {
      const savedPacks: string[] = JSON.parse(localStorage.getItem("visitpng_offline_trails") || "[]");
      let next: string[];
      if (savedPacks.includes(trail.id)) {
        next = savedPacks.filter(id => id !== trail.id);
        localStorage.setItem(`visitpng_trail_${trail.id}`, "");
        setIsSavedOffline(false);
        setDownloadNotice(`Removed "${trail.name}" from offline storage.`);
      } else {
        next = [...savedPacks, trail.id];
        localStorage.setItem(`visitpng_trail_${trail.id}`, JSON.stringify(trail));
        setIsSavedOffline(true);
        setDownloadNotice(`✅ "${trail.name}" downloaded for offline wilderness use! You can access this without cellular signal.`);
      }
      localStorage.setItem("visitpng_offline_trails", JSON.stringify(next));
    } catch {
      setDownloadNotice("Local storage not available.");
    }
    setTimeout(() => setDownloadNotice(""), 4000);
  };

  const handleExportGpx = () => {
    const gpxText = generateGpx(trail);
    const blob = new Blob([gpxText], {type: "application/gpx+xml;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${trail.id}.gpx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadNotice(`Downloaded ${trail.id}.gpx for your GPS device.`);
    setTimeout(() => setDownloadNotice(""), 3000);
  };

  // Build SVG Elevation Graph
  const minEle = Math.min(...trail.waypoints.map(w => w.elevationMeters), 0);
  const maxEle = Math.max(...trail.waypoints.map(w => w.elevationMeters), 1000);
  const maxDist = Math.max(...trail.waypoints.map(w => w.distanceKm), 1);
  const svgWidth = 600;
  const svgHeight = 160;
  const padding = 30;

  const points = trail.waypoints.map(w => {
    const x = padding + (w.distanceKm / maxDist) * (svgWidth - padding * 2);
    const y = svgHeight - padding - ((w.elevationMeters - minEle) / (maxEle - minEle || 1)) * (svgHeight - padding * 2);
    return {x, y, waypoint: w};
  });

  const pathD = points.length > 0 
    ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ")
    : "";

  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${svgHeight - padding} L ${points[0].x} ${svgHeight - padding} Z`
    : "";

  return (
    <div className="trailPackCard">
      <div className="trailPackHeader" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${trail.coverImage})`}}>
        <div className="trailPackBadges">
          <span className="trailDiffBadge">{trail.difficulty}</span>
          <span className="trailRegionBadge">{trail.province}</span>
          {isSavedOffline && <span className="offlineSavedBadge">✅ Ready Offline (No Signal Needed)</span>}
        </div>
        <h2>{trail.name}</h2>
        <p>{trail.subtitle}</p>
      </div>

      <div className="trailStatsGrid">
        <div className="trailStat">
          <small>Total Distance</small>
          <strong>{trail.totalDistanceKm} km</strong>
        </div>
        <div className="trailStat">
          <small>Duration</small>
          <strong>{trail.durationDays}</strong>
        </div>
        <div className="trailStat">
          <small>Max Elevation</small>
          <strong>{trail.highestPointMeters} m</strong>
        </div>
        <div className="trailStat">
          <small>Elevation Gain</small>
          <strong>+{trail.elevationGainMeters} m</strong>
        </div>
      </div>

      <div className="trailBody">
        <p className="trailOverview">{trail.overview}</p>

        {/* Elevation Profile Graph */}
        <div className="elevationSection">
          <div className="elevationHeader">
            <strong>📈 Elevation Profile & Waypoint Map</strong>
            <small>Hover/click point on the elevation chart below</small>
          </div>
          <div className="elevationGraphWrapper">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="elevationSvg">
              <defs>
                <linearGradient id={`grad-${trail.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--action-primary)" stopOpacity="0.45"/>
                  <stop offset="100%" stopColor="var(--action-primary)" stopOpacity="0.02"/>
                </linearGradient>
              </defs>
              <path d={areaD} fill={`url(#grad-${trail.id})`}/>
              <path d={pathD} fill="none" stroke="var(--action-primary)" strokeWidth="3" strokeLinecap="round"/>
              
              {points.map((p, idx) => (
                <g key={idx} className="waypointNode" onClick={() => setSelectedWaypointIndex(idx)}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={selectedWaypointIndex === idx ? "7" : "5"}
                    fill={p.waypoint.isCampsite ? "var(--status-danger)" : "var(--brand-deep-teal)"}
                    stroke="var(--brand-white)"
                    strokeWidth="2"
                  />
                  <text
                    x={p.x}
                    y={p.y - 10}
                    textAnchor="middle"
                    className="waypointSvgText"
                  >
                    {p.waypoint.elevationMeters}m
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Waypoints List */}
        <div className="waypointsListSection">
          <strong>📍 Expedition Waypoints & Key Landmarks:</strong>
          <div className="waypointsTimeline">
            {trail.waypoints.map((wp, idx) => (
              <div
                key={idx}
                className={`waypointItem ${selectedWaypointIndex === idx ? "selected" : ""}`}
                onClick={() => setSelectedWaypointIndex(idx)}
              >
                <div className="wpMarker">
                  <span>{idx + 1}</span>
                </div>
                <div className="wpDetails">
                  <div className="wpTitleRow">
                    <b>{wp.name}</b>
                    <span className="wpElevation">{wp.elevationMeters} m · {wp.distanceKm} km</span>
                  </div>
                  <p>{wp.description}</p>
                  <div className="wpTags">
                    {wp.isCampsite && <span className="wpTag campsite">⛺ Campsite</span>}
                    {wp.waterAvailable && <span className="wpTag water">💧 Water Source</span>}
                    <span className="wpTag gps">GPS: {wp.latitude.toFixed(4)}, {wp.longitude.toFixed(4)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency & Permit Notes */}
        <div className="trailSafetyNotice">
          <div>
            <strong>🎫 Required Permits:</strong>
            <p>{trail.requiredPermits}</p>
          </div>
          <div>
            <strong>📻 Emergency & Ranger Radio Frequencies:</strong>
            <p>{trail.emergencyFrequencies}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="trailActions">
          <button
            type="button"
            className={`saveOfflineBtn ${isSavedOffline ? "active" : ""}`}
            onClick={toggleSaveOffline}
          >
            {isSavedOffline ? "✅ Pack Saved Offline" : "💾 Download Offline Pack (No Cell Signal)"}
          </button>
          <button
            type="button"
            className="exportGpxBtn"
            onClick={handleExportGpx}
          >
            📥 Export GPX for Garmin / GPS Watch
          </button>
        </div>

        {downloadNotice && (
          <p className="trailNoticeAlert" aria-live="polite">
            {downloadNotice}
          </p>
        )}
      </div>
    </div>
  );
}
