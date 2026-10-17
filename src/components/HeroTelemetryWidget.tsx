import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Microscope,
  Terminal,
  Activity,
  ShieldCheck,
  Cpu,
  RefreshCw,
  Eye,
  CheckCircle2,
} from 'lucide-react';

interface ColonyNode {
  id: string;
  x: number;
  y: number;
  r: number;
  strain: string;
  confidence: string;
  astZone?: number;
}

const SPECIMEN_PLATES: {
  plateId: string;
  medium: string;
  strainLabel: string;
  cfuCount: number;
  contamination: string;
  confidence: string;
  astMeanMm: string;
  colonies: ColonyNode[];
}[] = [
  {
    plateId: 'PLATE_#884A // MUELLER-HINTON',
    medium: 'Chromogenic Selective Agar // 37.0°C',
    strainLabel: 'E. coli ATCC 25922',
    cfuCount: 142,
    contamination: '0.00%',
    confidence: '99.4%',
    astMeanMm: '28.4 mm (SUSCEPTIBLE)',
    colonies: [
      { id: 'C-01', x: 30, y: 28, r: 9, strain: 'E. coli', confidence: '99.7%', astZone: 22 },
      { id: 'C-02', x: 66, y: 32, r: 8, strain: 'E. coli', confidence: '99.2%', astZone: 19 },
      { id: 'C-03', x: 48, y: 54, r: 10, strain: 'E. coli', confidence: '99.6%', astZone: 24 },
      { id: 'C-04', x: 26, y: 66, r: 7, strain: 'E. coli', confidence: '99.1%' },
      { id: 'C-05', x: 71, y: 67, r: 8, strain: 'E. coli', confidence: '99.5%', astZone: 20 },
      { id: 'C-06', x: 52, y: 24, r: 6, strain: 'E. coli', confidence: '99.3%' },
    ],
  },
  {
    plateId: 'PLATE_#912C // MACCONKEY_II',
    medium: 'Bile Salts Crystal Violet // 36.8°C',
    strainLabel: 'K. pneumoniae Carbapenem-Screen',
    cfuCount: 89,
    contamination: '0.00%',
    confidence: '99.1%',
    astMeanMm: '21.8 mm (INTERMEDIATE)',
    colonies: [
      { id: 'K-01', x: 35, y: 36, r: 10, strain: 'K. pneumo', confidence: '99.3%', astZone: 21 },
      { id: 'K-02', x: 64, y: 42, r: 9, strain: 'K. pneumo', confidence: '99.0%', astZone: 18 },
      { id: 'K-03', x: 44, y: 68, r: 9, strain: 'K. pneumo', confidence: '99.4%', astZone: 22 },
      { id: 'K-04', x: 62, y: 70, r: 7, strain: 'K. pneumo', confidence: '98.9%' },
      { id: 'K-05', x: 27, y: 52, r: 7, strain: 'K. pneumo', confidence: '99.2%' },
    ],
  },
  {
    plateId: 'PLATE_#409F // SABOURAUD_DEX',
    medium: 'Mycological QC Assay // 30.0°C',
    strainLabel: 'C. albicans Clinical Isolate',
    cfuCount: 216,
    contamination: '0.00%',
    confidence: '99.6%',
    astMeanMm: '31.2 mm (SUSCEPTIBLE)',
    colonies: [
      { id: 'M-01', x: 28, y: 34, r: 8, strain: 'C. albicans', confidence: '99.8%', astZone: 23 },
      { id: 'M-02', x: 56, y: 29, r: 9, strain: 'C. albicans', confidence: '99.5%', astZone: 21 },
      { id: 'M-03', x: 72, y: 50, r: 8, strain: 'C. albicans', confidence: '99.6%', astZone: 20 },
      { id: 'M-04', x: 42, y: 58, r: 9, strain: 'C. albicans', confidence: '99.7%', astZone: 25 },
      { id: 'M-05', x: 58, y: 73, r: 7, strain: 'C. albicans', confidence: '99.4%' },
      { id: 'M-06', x: 31, y: 69, r: 7, strain: 'C. albicans', confidence: '99.5%' },
    ],
  },
];

const AGENT_LOGS = [
  {
    time: '09:42:11.04',
    node: '[AGENT_LIMS]',
    msg: 'Reconciling Mass-Spec batch #884A... OK',
    state: 'VERIFIED',
  },
  {
    time: '09:42:12.42',
    node: '[CV_NODE]',
    msg: 'Morphological segmentation complete in 38ms',
    state: '38ms',
  },
  {
    time: '09:42:14.19',
    node: '[AST_CALIPER]',
    msg: 'Kirby-Bauer inhibition zone: 28.4mm (CLSI M100 S)',
    state: 'PASS',
  },
  {
    time: '09:42:15.88',
    node: '[FERMENT_IQ]',
    msg: 'Vessel 500L-B2 dissolved oxygen trajectory nominal (34.8%)',
    state: 'LOCKED',
  },
  {
    time: '09:42:17.30',
    node: '[AUDIT_21CFR]',
    msg: 'SHA-256 e-Signature committed to PostgreSQL LIMS ledger',
    state: 'SIGNED',
  },
  {
    time: '09:42:19.05',
    node: '[COLD_GUARD]',
    msg: 'Cryo-Vault ULT-04 thermal bus steady at -80.4°C',
    state: 'NOMINAL',
  },
];

export const HeroTelemetryWidget: React.FC = () => {
  const [plateIndex, setPlateIndex] = useState(0);
  const [selectedColony, setSelectedColony] = useState<string>('C-01');
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [showAstRings, setShowAstRings] = useState(true);
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const [scanTick, setScanTick] = useState(0);

  const currentPlate = SPECIMEN_PLATES[plateIndex];

  useEffect(() => {
    setSelectedColony(currentPlate.colonies[0].id);
  }, [plateIndex, currentPlate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLogIndex((prev) => (prev + 1) % AGENT_LOGS.length);
      setScanTick((prev) => (prev + 1) % 100);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const inspectedColony =
    currentPlate.colonies.find((c) => c.id === selectedColony) || currentPlate.colonies[0];

  const visibleLogs = [
    AGENT_LOGS[activeLogIndex % AGENT_LOGS.length],
    AGENT_LOGS[(activeLogIndex + 1) % AGENT_LOGS.length],
    AGENT_LOGS[(activeLogIndex + 2) % AGENT_LOGS.length],
    AGENT_LOGS[(activeLogIndex + 3) % AGENT_LOGS.length],
  ];

  return (
    <div className="bg-[#0F172A] text-[#F4F4F0] border border-[#0F172A] shadow-xl overflow-hidden">
      {/* Top Telemetry Bar */}
      <div className="px-4 py-3 bg-[#0F172A] border-b border-[#F4F4F0]/15 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="inline-block w-2.5 h-2.5 bg-[#0D9488]" />
          <span className="font-mono text-xs font-semibold tracking-wider text-[#F4F4F0]">
            MUNGKAS BIO-OS // TELEMETRY WIDGET v4.2
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] text-[#F4F4F0]/75">
          <span>SYS_STATUS: ONLINE</span>
          <span className="text-[#0D9488]">|</span>
          <span>LATENCY: 14ms</span>
          <span className="hidden sm:inline text-[#0D9488]">|</span>
          <span className="hidden sm:inline text-[#0D9488]">ISO/IEC-17025 COMPLIANT</span>
        </div>
      </div>

      {/* Specimen Selector & Vision Layer Controls */}
      <div className="px-4 py-2.5 bg-[#0F172A] border-b border-[#F4F4F0]/10 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {SPECIMEN_PLATES.map((plate, idx) => (
            <button
              key={plate.plateId}
              type="button"
              onClick={() => setPlateIndex(idx)}
              className={`cursor-pointer font-mono text-[11px] px-2.5 py-1 border transition-colors ${
                plateIndex === idx
                  ? 'bg-[#0D9488] text-[#F4F4F0] border-[#0D9488] font-medium'
                  : 'bg-[#0F172A] text-[#F4F4F0]/70 border-[#F4F4F0]/15 hover:border-[#0D9488]'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488]`}
            >
              SPECIMEN 0{idx + 1}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowBoundingBoxes((prev) => !prev)}
            className={`cursor-pointer font-mono text-[11px] px-2.5 py-1 border flex items-center gap-1.5 transition-colors ${
              showBoundingBoxes
                ? 'border-[#0D9488] text-[#0D9488] bg-[#0D9488]/10'
                : 'border-[#F4F4F0]/15 text-[#F4F4F0]/60'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>BBOX_OVERLAY</span>
          </button>
          <button
            type="button"
            onClick={() => setShowAstRings((prev) => !prev)}
            className={`cursor-pointer font-mono text-[11px] px-2.5 py-1 border flex items-center gap-1.5 transition-colors ${
              showAstRings
                ? 'border-[#0D9488] text-[#0D9488] bg-[#0D9488]/10'
                : 'border-[#F4F4F0]/15 text-[#F4F4F0]/60'
            }`}
          >
            <Activity className="w-3 h-3" />
            <span>AST_CALIPER</span>
          </button>
        </div>
      </div>

      {/* Main Radar + Telemetry Readout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[#F4F4F0]/15">
        {/* Left: Petri-Dish Computer Vision Scanner */}
        <div className="md:col-span-7 p-5 dark-grid-bg relative flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#F4F4F0]/15">
          <div className="w-full flex items-center justify-between font-mono text-[11px] text-[#F4F4F0]/70 mb-2">
            <span>{currentPlate.plateId}</span>
            <span className="text-[#0D9488]">TELECENTRIC_DARKFIELD // 42MP</span>
          </div>

          {/* Interactive SVG Petri Dish */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-1">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full overflow-visible"
              role="img"
              aria-label="Simulated real-time Petri-Dish Computer Vision scanner grid"
            >
              {/* Outer Petri Rim */}
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="#0F172A"
                stroke="#F4F4F0"
                strokeOpacity="0.25"
                strokeWidth="1"
              />
              <circle
                cx="50"
                cy="50"
                r="43"
                fill="none"
                stroke="#0D9488"
                strokeOpacity="0.35"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
              {/* Polar Coordinate Rings */}
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="none"
                stroke="#F4F4F0"
                strokeOpacity="0.1"
                strokeWidth="0.4"
              />
              <circle
                cx="50"
                cy="50"
                r="16"
                fill="none"
                stroke="#F4F4F0"
                strokeOpacity="0.1"
                strokeWidth="0.4"
              />
              {/* Crosshairs */}
              <line
                x1="4"
                y1="50"
                x2="96"
                y2="50"
                stroke="#F4F4F0"
                strokeOpacity="0.12"
                strokeWidth="0.4"
              />
              <line
                x1="50"
                y1="4"
                x2="50"
                y2="96"
                stroke="#F4F4F0"
                strokeOpacity="0.12"
                strokeWidth="0.4"
              />

              {/* Animated Laser Scan Line */}
              <motion.line
                x1="8"
                x2="92"
                initial={{ y1: 15, y2: 15 }}
                animate={{ y1: [15, 85, 15], y2: [15, 85, 15] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
                stroke="#0D9488"
                strokeWidth="0.7"
                strokeOpacity="0.85"
              />

              {/* Colony Nodes & AST Inhibition Zones */}
              {currentPlate.colonies.map((colony) => {
                const isSelected = colony.id === inspectedColony.id;
                return (
                  <g
                    key={colony.id}
                    onClick={() => setSelectedColony(colony.id)}
                    className="cursor-pointer"
                  >
                    {/* AST Inhibition Zone Ring */}
                    {showAstRings && colony.astZone && (
                      <circle
                        cx={colony.x}
                        cy={colony.y}
                        r={colony.astZone / 2}
                        fill="#0D9488"
                        fillOpacity={isSelected ? '0.16' : '0.07'}
                        stroke="#0D9488"
                        strokeWidth={isSelected ? '0.7' : '0.4'}
                        strokeDasharray="1.5 1"
                      />
                    )}

                    {/* Colony Core */}
                    <circle
                      cx={colony.x}
                      cy={colony.y}
                      r={2.3}
                      fill="#0D9488"
                      stroke="#F4F4F0"
                      strokeWidth="0.5"
                    />

                    {/* YOLOv8 Bounding Box */}
                    {showBoundingBoxes && (
                      <g>
                        <rect
                          x={colony.x - colony.r / 2}
                          y={colony.y - colony.r / 2}
                          width={colony.r}
                          height={colony.r}
                          fill="none"
                          stroke={isSelected ? '#F4F4F0' : '#0D9488'}
                          strokeWidth={isSelected ? '0.9' : '0.55'}
                        />
                        <text
                          x={colony.x - colony.r / 2}
                          y={colony.y - colony.r / 2 - 1.5}
                          fill={isSelected ? '#F4F4F0' : '#0D9488'}
                          fontSize="3.1"
                          fontFamily="JetBrains Mono, monospace"
                        >
                          {colony.id}:{colony.confidence}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="w-full flex items-center justify-between font-mono text-[11px] text-[#F4F4F0]/75 pt-2 border-t border-[#F4F4F0]/10">
            <span>CLICK COLONY NODE TO INSPECT ROI</span>
            <span className="text-[#0D9488]">ROI_SELECTED: {inspectedColony.id}</span>
          </div>
        </div>

        {/* Right: Primary Telemetry Metrics */}
        <div className="md:col-span-5 p-5 flex flex-col justify-between bg-[#0F172A]">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#F4F4F0]/60">
                LIVE ASSAY METRICS
              </span>
              <button
                type="button"
                onClick={() => setPlateIndex((prev) => (prev + 1) % SPECIMEN_PLATES.length)}
                className="cursor-pointer inline-flex items-center gap-1 font-mono text-[11px] text-[#0D9488] hover:text-[#F4F4F0] transition-colors"
                title="Cycle Specimen Plate"
              >
                <RefreshCw className="w-3 h-3" />
                <span>NEXT PLATE</span>
              </button>
            </div>

            {/* Required Metric 1: E. coli CFU: 142 */}
            <div className="p-3 border border-[#F4F4F0]/15 bg-[#F4F4F0]/[0.03]">
              <div className="flex items-center justify-between font-mono text-[11px] text-[#F4F4F0]/70">
                <span>ORGANISM // {currentPlate.strainLabel}</span>
                <Microscope className="w-3.5 h-3.5 text-[#0D9488]" />
              </div>
              <div className="mt-1 font-mono text-lg font-semibold text-[#F4F4F0]">
                E. coli CFU: <span className="text-[#0D9488]">{currentPlate.cfuCount}</span>
              </div>
              <div className="font-mono text-[11px] text-[#F4F4F0]/60 mt-0.5">
                {currentPlate.medium}
              </div>
            </div>

            {/* Required Metric 2 & 3: Contamination: 0.00% & Confidence: 99.4% */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 border border-[#F4F4F0]/15 bg-[#F4F4F0]/[0.03]">
                <div className="font-mono text-[10px] text-[#F4F4F0]/65 uppercase">
                  Contamination
                </div>
                <div className="font-mono text-base font-semibold text-[#0D9488] mt-1">
                  {currentPlate.contamination}
                </div>
                <div className="font-mono text-[10px] text-[#F4F4F0]/60 mt-0.5">
                  STERILE_PASS
                </div>
              </div>

              <div className="p-3 border border-[#F4F4F0]/15 bg-[#F4F4F0]/[0.03]">
                <div className="font-mono text-[10px] text-[#F4F4F0]/65 uppercase">
                  Confidence
                </div>
                <div className="font-mono text-base font-semibold text-[#0D9488] mt-1">
                  {currentPlate.confidence}
                </div>
                <div className="font-mono text-[10px] text-[#F4F4F0]/60 mt-0.5">
                  YOLOv8x-SAM
                </div>
              </div>
            </div>

            {/* Selected Colony ROI Inspector */}
            <div className="p-3 border border-[#0D9488]/40 bg-[#0D9488]/10">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#0D9488] font-semibold">
                  ACTIVE ROI // {inspectedColony.id}
                </span>
                <span className="text-[#F4F4F0]">{inspectedColony.confidence}</span>
              </div>
              <div className="mt-1.5 font-mono text-xs text-[#F4F4F0]/90 space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#F4F4F0]/65">COORDINATES:</span>
                  <span>
                    X:{inspectedColony.x}.4mm Y:{inspectedColony.y}.1mm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F4F4F0]/65">AST ZONE:</span>
                  <span className="text-[#0D9488]">{currentPlate.astMeanMm}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-[#F4F4F0]/15 flex items-center justify-between font-mono text-[11px] text-[#F4F4F0]/70">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
              21 CFR PART 11 SIGNED
            </span>
            <span>FRAME #{1040 + scanTick}</span>
          </div>
        </div>
      </div>

      {/* Bottom: Live Scrolling Terminal Log */}
      <div className="p-4 bg-[#0F172A]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#0D9488]">
            <Terminal className="w-3.5 h-3.5" />
            <span>AUTONOMOUS AGENT STREAM // LIVE LIMS &amp; CV TELEMETRY</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#F4F4F0]/60">
            <Cpu className="w-3 h-3 text-[#0D9488]" />
            <span>TENSORRT_FP16</span>
          </div>
        </div>

        <div className="space-y-1.5 font-mono text-xs">
          {visibleLogs.map((log, i) => (
            <div
              key={`${log.time}-${i}`}
              className={`px-2.5 py-1.5 border flex items-center justify-between gap-2 transition-colors ${
                i === 0
                  ? 'border-[#0D9488]/60 bg-[#0D9488]/10 text-[#F4F4F0]'
                  : 'border-[#F4F4F0]/10 bg-[#F4F4F0]/[0.02] text-[#F4F4F0]/75'
              }`}
            >
              <div className="truncate">
                <span className="text-[#F4F4F0]/50 mr-2">{log.time}</span>
                <span className="text-[#0D9488] font-medium mr-1.5">{log.node}:</span>
                <span>{log.msg}</span>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-[#0F172A] border border-[#0D9488]/40 text-[#0D9488]">
                <CheckCircle2 className="w-2.5 h-2.5" />
                {log.state}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
