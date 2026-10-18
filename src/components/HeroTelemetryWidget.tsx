import React, { useEffect, useRef, useState } from 'react';
import {
  Microscope,
  Terminal,
  Activity,
  ShieldCheck,
  Cpu,
  Pause,
  Play,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { usePrefersReducedMotion } from './ui';

interface ColonyNode {
  id: string;
  x: number;
  y: number;
  r: number;
  confidence: string;
  astZone?: number;
}

interface SpecimenPlate {
  plateId: string;
  medium: string;
  strainLabel: string;
  shortStrain: string;
  cfuCount: number;
  contamination: string;
  confidence: string;
  astMeanMm: string;
  colonies: ColonyNode[];
}

const SPECIMEN_PLATES: SpecimenPlate[] = [
  {
    plateId: 'PLATE_#884A // MUELLER-HINTON',
    medium: 'Chromogenic Selective Agar // 37.0°C',
    strainLabel: 'E. coli ATCC 25922',
    shortStrain: 'E. coli',
    cfuCount: 142,
    contamination: '0.00%',
    confidence: '99.4%',
    astMeanMm: '28.4 mm (SUSCEPTIBLE)',
    colonies: [
      { id: 'C-01', x: 30, y: 28, r: 9, confidence: '99.7%', astZone: 22 },
      { id: 'C-02', x: 66, y: 32, r: 8, confidence: '99.2%', astZone: 19 },
      { id: 'C-03', x: 48, y: 54, r: 10, confidence: '99.6%', astZone: 24 },
      { id: 'C-04', x: 26, y: 66, r: 7, confidence: '99.1%' },
      { id: 'C-05', x: 71, y: 67, r: 8, confidence: '99.5%', astZone: 20 },
      { id: 'C-06', x: 52, y: 24, r: 6, confidence: '99.3%' },
    ],
  },
  {
    plateId: 'PLATE_#912C // MACCONKEY_II',
    medium: 'Bile Salts Crystal Violet // 36.8°C',
    strainLabel: 'K. pneumoniae Carbapenem-Screen',
    shortStrain: 'K. pneumoniae',
    cfuCount: 89,
    contamination: '0.00%',
    confidence: '99.1%',
    astMeanMm: '21.8 mm (INTERMEDIATE)',
    colonies: [
      { id: 'K-01', x: 35, y: 36, r: 10, confidence: '99.3%', astZone: 21 },
      { id: 'K-02', x: 64, y: 42, r: 9, confidence: '99.0%', astZone: 18 },
      { id: 'K-03', x: 44, y: 68, r: 9, confidence: '99.4%', astZone: 22 },
      { id: 'K-04', x: 62, y: 70, r: 7, confidence: '98.9%' },
      { id: 'K-05', x: 27, y: 52, r: 7, confidence: '99.2%' },
    ],
  },
  {
    plateId: 'PLATE_#409F // SABOURAUD_DEX',
    medium: 'Mycological QC Assay // 30.0°C',
    strainLabel: 'C. albicans Clinical Isolate',
    shortStrain: 'C. albicans',
    cfuCount: 216,
    contamination: '0.00%',
    confidence: '99.6%',
    astMeanMm: '31.2 mm (SUSCEPTIBLE)',
    colonies: [
      { id: 'M-01', x: 28, y: 34, r: 8, confidence: '99.8%', astZone: 23 },
      { id: 'M-02', x: 56, y: 29, r: 9, confidence: '99.5%', astZone: 21 },
      { id: 'M-03', x: 72, y: 50, r: 8, confidence: '99.6%', astZone: 20 },
      { id: 'M-04', x: 42, y: 58, r: 9, confidence: '99.7%', astZone: 25 },
      { id: 'M-05', x: 58, y: 73, r: 7, confidence: '99.4%' },
      { id: 'M-06', x: 31, y: 69, r: 7, confidence: '99.5%' },
    ],
  },
];

interface LogTemplate {
  node: string;
  msg: string;
  state: string;
}

const LOG_POOL: LogTemplate[] = [
  { node: '[AGENT_LIMS]', msg: 'Reconciling Mass-Spec batch #884A... OK', state: 'VERIFIED' },
  { node: '[CV_NODE]', msg: 'Morphological segmentation complete in 38ms', state: '38ms' },
  { node: '[AST_CALIPER]', msg: 'Kirby-Bauer inhibition zone: 28.4mm (CLSI M100 S)', state: 'PASS' },
  { node: '[FERMENT_IQ]', msg: 'Vessel 500L-B2 dissolved oxygen trajectory nominal (34.8%)', state: 'LOCKED' },
  { node: '[AUDIT_21CFR]', msg: 'SHA-256 e-Signature committed to PostgreSQL LIMS ledger', state: 'SIGNED' },
  { node: '[COLD_GUARD]', msg: 'Cryo-Vault ULT-04 thermal bus steady at -80.4°C', state: 'NOMINAL' },
  { node: '[SEQ_WATCH]', msg: 'FASTQ run-complete detected. Spawning Nextflow DAG', state: 'TRIGGERED' },
  { node: '[OOS_SENTINEL]', msg: 'Control R²=0.999 within acceptance window', state: 'IN-SPEC' },
  { node: '[CV_NODE]', msg: 'CFU recount batch #912C: 89 colonies, 0 merge errors', state: '99.1%' },
  { node: '[AGENT_ERP]', msg: 'Purchase requisition drafted — media stock 11d runway', state: 'QUEUED' },
  { node: '[TWIN_KERNEL]', msg: 'Respiratory quotient drift +0.04 — advisory issued', state: 'WATCH' },
  { node: '[HL7_PARSER]', msg: 'ASTM E1394 frame decoded from Vitek-2 (RS-232)', state: 'DECODED' },
];

interface LogLine extends LogTemplate {
  key: number;
  time: string;
}

function formatClock(baseMs: number): string {
  const d = new Date(baseMs);
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  const ss = String(d.getUTCSeconds()).padStart(2, '0');
  const cs = String(Math.floor(d.getUTCMilliseconds() / 10)).padStart(2, '0');
  return `${hh}:${mm}:${ss}.${cs}`;
}

const SEED_CLOCK = Date.UTC(2026, 0, 1, 9, 42, 11, 40);

function buildSeedLines(count: number): LogLine[] {
  return Array.from({ length: count }, (_, i) => ({
    ...LOG_POOL[i % LOG_POOL.length],
    key: i,
    time: formatClock(SEED_CLOCK + i * 1740),
  }));
}

const MAX_LINES = 40;

export const HeroTelemetryWidget: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  const [plateIndex, setPlateIndex] = useState(0);
  const [selectedColony, setSelectedColony] = useState<string>('C-01');
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [showAstRings, setShowAstRings] = useState(true);
  const [lines, setLines] = useState<LogLine[]>(() => buildSeedLines(7));
  const [live, setLive] = useState(!reduced);
  const [frame, setFrame] = useState(1040);
  const [liveLatency, setLiveLatency] = useState(14);

  const keyRef = useRef(1000);
  const clockRef = useRef(SEED_CLOCK + 7 * 1740);
  const feedRef = useRef<HTMLDivElement | null>(null);

  const currentPlate = SPECIMEN_PLATES[plateIndex];

  useEffect(() => {
    setSelectedColony(currentPlate.colonies[0].id);
  }, [currentPlate]);

  useEffect(() => {
    if (!live) return;
    const interval = setInterval(() => {
      clockRef.current += 900 + Math.floor(Math.random() * 1400);
      const template = LOG_POOL[keyRef.current % LOG_POOL.length];
      keyRef.current += 1;
      setLines((prev) => {
        const next = [...prev, { ...template, key: keyRef.current, time: formatClock(clockRef.current) }];
        return next.length > MAX_LINES ? next.slice(next.length - MAX_LINES) : next;
      });
      setFrame((f) => f + 1);
      setLiveLatency(12 + Math.floor(Math.random() * 6));
    }, 1700);
    return () => clearInterval(interval);
  }, [live]);

  useEffect(() => {
    const feed = feedRef.current;
    if (feed && !reduced) {
      feed.scrollTop = feed.scrollHeight;
    }
  }, [lines, reduced]);

  const inspectedColony =
    currentPlate.colonies.find((c) => c.id === selectedColony) || currentPlate.colonies[0];

  return (
    <div className="bg-[#0F172A] text-[#F4F4F0] border border-[#0F172A] shadow-xl overflow-hidden">
      <div className="px-4 py-3 bg-[#0F172A] border-b border-[#F4F4F0]/15 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="inline-block w-2.5 h-2.5 bg-[#0D9488]" aria-hidden="true" />
          <span className="font-mono text-xs font-semibold tracking-wider text-[#F4F4F0]">
            MUNGKAS BIO-OS // TELEMETRY WIDGET v4.2
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] text-[#F4F4F0]/75">
          <span>SYS_STATUS: ONLINE</span>
          <span className="text-[#0D9488]" aria-hidden="true">|</span>
          <span>LATENCY: {liveLatency}ms</span>
          <span className="hidden sm:inline text-[#0D9488]" aria-hidden="true">|</span>
          <span className="hidden sm:inline text-[#0D9488]">ISO/IEC-17025 COMPLIANT</span>
        </div>
      </div>

      <div className="px-4 py-2.5 bg-[#0F172A] border-b border-[#F4F4F0]/10 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5" role="group" aria-label="Select specimen plate">
          {SPECIMEN_PLATES.map((plate, idx) => (
            <button
              key={plate.plateId}
              type="button"
              onClick={() => setPlateIndex(idx)}
              aria-pressed={plateIndex === idx}
              className={`cursor-pointer font-mono text-[11px] px-2.5 py-1 border transition-colors ${
                plateIndex === idx
                  ? 'bg-[#0D9488] text-[#F4F4F0] border-[#0D9488] font-medium'
                  : 'bg-[#0F172A] text-[#F4F4F0]/70 border-[#F4F4F0]/15 hover:border-[#0D9488]'
              }`}
            >
              SPECIMEN 0{idx + 1}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowBoundingBoxes((prev) => !prev)}
            aria-pressed={showBoundingBoxes}
            className={`cursor-pointer font-mono text-[11px] px-2.5 py-1 border flex items-center gap-1.5 transition-colors ${
              showBoundingBoxes
                ? 'border-[#0D9488] text-[#0D9488] bg-[#0D9488]/10'
                : 'border-[#F4F4F0]/15 text-[#F4F4F0]/60'
            }`}
          >
            <Eye className="w-3 h-3" aria-hidden="true" />
            <span>BBOX_OVERLAY</span>
          </button>
          <button
            type="button"
            onClick={() => setShowAstRings((prev) => !prev)}
            aria-pressed={showAstRings}
            className={`cursor-pointer font-mono text-[11px] px-2.5 py-1 border flex items-center gap-1.5 transition-colors ${
              showAstRings
                ? 'border-[#0D9488] text-[#0D9488] bg-[#0D9488]/10'
                : 'border-[#F4F4F0]/15 text-[#F4F4F0]/60'
            }`}
          >
            <Activity className="w-3 h-3" aria-hidden="true" />
            <span>AST_CALIPER</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[#F4F4F0]/15">
        <div className="md:col-span-7 p-5 dark-grid-bg relative flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#F4F4F0]/15">
          <div className="w-full flex items-center justify-between font-mono text-[11px] text-[#F4F4F0]/70 mb-2">
            <span>{currentPlate.plateId}</span>
            <span className="text-[#0D9488]">TELECENTRIC_DARKFIELD // 42MP</span>
          </div>

          <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-1">
            <div
              className="radar-sweep absolute inset-[8%] rounded-full pointer-events-none"
              aria-hidden="true"
            />
            <svg
              viewBox="0 0 100 100"
              className="relative w-full h-full overflow-visible"
              role="img"
              aria-label="Simulated real-time Petri dish computer vision scanner grid"
            >
              <circle cx="50" cy="50" r="46" fill="#0F172A" stroke="#F4F4F0" strokeOpacity="0.25" strokeWidth="1" />
              <circle cx="50" cy="50" r="43" fill="none" stroke="#0D9488" strokeOpacity="0.35" strokeWidth="0.5" strokeDasharray="2 2" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#F4F4F0" strokeOpacity="0.1" strokeWidth="0.4" />
              <circle cx="50" cy="50" r="16" fill="none" stroke="#F4F4F0" strokeOpacity="0.1" strokeWidth="0.4" />
              <line x1="4" y1="50" x2="96" y2="50" stroke="#F4F4F0" strokeOpacity="0.12" strokeWidth="0.4" />
              <line x1="50" y1="4" x2="50" y2="96" stroke="#F4F4F0" strokeOpacity="0.12" strokeWidth="0.4" />

              {currentPlate.colonies.map((colony) => {
                const isSelected = colony.id === inspectedColony.id;
                return (
                  <g
                    key={`${currentPlate.plateId}-${colony.id}`}
                    onClick={() => setSelectedColony(colony.id)}
                    className="cursor-pointer"
                    role="button"
                    aria-label={`Inspect colony ${colony.id}`}
                  >
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
                    <circle cx={colony.x} cy={colony.y} r={2.3} fill="#0D9488" stroke="#F4F4F0" strokeWidth="0.5" />
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
              >
                <Microscope className="w-3 h-3" aria-hidden="true" />
                <span>CYCLE PLATE</span>
              </button>
            </div>

            <div className="p-3 border border-[#F4F4F0]/15 bg-[#F4F4F0]/[0.03]">
              <div className="flex items-center justify-between font-mono text-[11px] text-[#F4F4F0]/70">
                <span>ORGANISM // {currentPlate.strainLabel}</span>
                <Microscope className="w-3.5 h-3.5 text-[#0D9488]" aria-hidden="true" />
              </div>
              <div className="mt-1 font-mono text-lg font-semibold text-[#F4F4F0]">
                {currentPlate.shortStrain} CFU: <span className="text-[#0D9488]">{currentPlate.cfuCount}</span>
              </div>
              <div className="font-mono text-[11px] text-[#F4F4F0]/60 mt-0.5">{currentPlate.medium}</div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 border border-[#F4F4F0]/15 bg-[#F4F4F0]/[0.03]">
                <div className="font-mono text-[10px] text-[#F4F4F0]/65 uppercase">Contamination</div>
                <div className="font-mono text-base font-semibold text-[#0D9488] mt-1">{currentPlate.contamination}</div>
                <div className="font-mono text-[10px] text-[#F4F4F0]/60 mt-0.5">STERILE_PASS</div>
              </div>
              <div className="p-3 border border-[#F4F4F0]/15 bg-[#F4F4F0]/[0.03]">
                <div className="font-mono text-[10px] text-[#F4F4F0]/65 uppercase">Confidence</div>
                <div className="font-mono text-base font-semibold text-[#0D9488] mt-1">{currentPlate.confidence}</div>
                <div className="font-mono text-[10px] text-[#F4F4F0]/60 mt-0.5">YOLOv8x-SAM</div>
              </div>
            </div>

            <div className="p-3 border border-[#0D9488]/40 bg-[#0D9488]/10">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#0D9488] font-semibold">ACTIVE ROI // {inspectedColony.id}</span>
                <span className="text-[#F4F4F0]">{inspectedColony.confidence}</span>
              </div>
              <div className="mt-1.5 font-mono text-xs text-[#F4F4F0]/90 space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#F4F4F0]/65">COORDINATES:</span>
                  <span>X:{inspectedColony.x}.4mm Y:{inspectedColony.y}.1mm</span>
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
              <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" aria-hidden="true" />
              21 CFR PART 11 SIGNED
            </span>
            <span>FRAME #{frame}</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-[#0F172A]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#0D9488]">
            <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
            <span>AUTONOMOUS AGENT STREAM // LIVE LIMS &amp; CV TELEMETRY</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#F4F4F0]/60">
              <Cpu className="w-3 h-3 text-[#0D9488]" aria-hidden="true" />
              <span>TENSORRT_FP16</span>
            </div>
            <button
              type="button"
              onClick={() => setLive((prev) => !prev)}
              aria-pressed={live}
              aria-label={live ? 'Pause live telemetry stream' : 'Resume live telemetry stream'}
              className={`cursor-pointer inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-1 border transition-colors ${
                live
                  ? 'border-[#0D9488]/50 text-[#0D9488] bg-[#0D9488]/10'
                  : 'border-[#F4F4F0]/20 text-[#F4F4F0]/60 hover:border-[#0D9488]'
              }`}
            >
              {live ? <Pause className="w-3 h-3" aria-hidden="true" /> : <Play className="w-3 h-3" aria-hidden="true" />}
              <span>{live ? 'LIVE' : 'PAUSED'}</span>
            </button>
          </div>
        </div>

        <div
          ref={feedRef}
          role="log"
          aria-live={live ? 'polite' : 'off'}
          aria-label="Autonomous agent activity log"
          className="terminal-scroll space-y-1.5 font-mono text-xs h-44 overflow-y-auto pr-1"
        >
          {lines.map((log) => (
            <div
              key={log.key}
              className="log-line-in px-2.5 py-1.5 border flex items-center justify-between gap-2 border-[#F4F4F0]/10 bg-[#F4F4F0]/[0.02] text-[#F4F4F0]/80"
            >
              <div className="truncate">
                <span className="text-[#F4F4F0]/50 mr-2">{log.time}</span>
                <span className="text-[#0D9488] font-medium mr-1.5">{log.node}:</span>
                <span>{log.msg}</span>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-[#0F172A] border border-[#0D9488]/40 text-[#0D9488]">
                <CheckCircle2 className="w-2.5 h-2.5" aria-hidden="true" />
                {log.state}
              </span>
            </div>
          ))}
          <div className="px-2.5 font-mono text-xs text-[#0D9488]">
            {live ? '>' : '$'} <span className="terminal-cursor">█</span>
          </div>
        </div>
      </div>
    </div>
  );
};
