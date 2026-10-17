import React, { useState } from 'react';
import { Activity, Clock, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

type LabType = 'Clinical Microbiology' | 'Biotech R&D' | 'Pharma QC';

const LAB_PROFILES: Record<
  LabType,
  {
    code: string;
    manualMinsPerSample: number;
    automationEfficiency: number;
    errorReductionPct: number;
    throughputMultiplier: string;
    primaryBottleneck: string;
    recommendedModule: string;
  }
> = {
  'Clinical Microbiology': {
    code: 'PROFILE_01 // CLINICAL_AST',
    manualMinsPerSample: 3.4,
    automationEfficiency: 0.86,
    errorReductionPct: 99.2,
    throughputMultiplier: '12.0x',
    primaryBottleneck: 'Manual CFU colony counting & caliper Kirby-Bauer AST zone reading',
    recommendedModule: 'ColonySight CV + HL7 LIMS Auto-Verification',
  },
  'Biotech R&D': {
    code: 'PROFILE_02 // WETLAB_BIOPROCESS',
    manualMinsPerSample: 4.8,
    automationEfficiency: 0.82,
    errorReductionPct: 94.5,
    throughputMultiplier: '8.4x',
    primaryBottleneck: 'FASTQ bioinformatics CLI triage & 500L bioreactor DO drift',
    recommendedModule: 'FermentIQ Digital Twin + PathoSeq Cloud Pipeline',
  },
  'Pharma QC': {
    code: 'PROFILE_03 // GMP_COMPLIANCE',
    manualMinsPerSample: 5.5,
    automationEfficiency: 0.85,
    errorReductionPct: 99.8,
    throughputMultiplier: '9.6x',
    primaryBottleneck: 'HPLC/PCR batch spreadsheet reconciliation & 21 CFR Part 11 CoA signing',
    recommendedModule: 'AutoLIMS Nexus + BioChain Cold-Guard Sentinel',
  },
};

export const RoiEstimatorSection: React.FC<{ onNavigate: (id: string) => void }> = ({
  onNavigate,
}) => {
  const [labType, setLabType] = useState<LabType>('Clinical Microbiology');
  const [dailyVolume, setDailyVolume] = useState<number>(650);

  const profile = LAB_PROFILES[labType];

  // Monthly calculation (26 operational lab days)
  const monthlySamples = dailyVolume * 26;
  const totalManualHours = (monthlySamples * profile.manualMinsPerSample) / 60;
  const hoursSavedMonth = Math.round(totalManualHours * profile.automationEfficiency);
  const annualReagentAndLaborSavings = Math.round(hoursSavedMonth * 12 * 48);

  return (
    <section className="py-20 lg:py-28 border-b border-[#0F172A]/10 bg-[#EAEAE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4F4F0] border border-[#0F172A]/15 overflow-hidden">
          {/* Top Bar */}
          <div className="px-6 py-4 bg-[#0F172A] text-[#F4F4F0] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 bg-[#0D9488]" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                INTERACTIVE TELEMETRY BENCHMARK // LAB ROI &amp; EFFICIENCY ESTIMATOR
              </span>
            </div>
            <span className="font-mono text-xs text-[#0D9488]">
              {profile.code}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Controls */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#0F172A]/10 space-y-8">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0F172A]">
                  Quantify Wet-Lab Automation Impact
                </h2>
                <p className="text-sm text-[#334155] mt-2">
                  Configure your facility profile and daily specimen throughput to model FTE hours reclaimed and quality concordance gains.
                </p>
              </div>

              {/* Lab Type Toggle */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#0F172A] font-semibold mb-3">
                  01. SELECT LABORATORY ENVIRONMENT:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(Object.keys(LAB_PROFILES) as LabType[]).map((type) => {
                    const active = labType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setLabType(type)}
                        className={`cursor-pointer px-3.5 py-3 font-mono text-xs text-left border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488] ${
                          active
                            ? 'bg-[#0D9488] text-[#F4F4F0] border-[#0D9488] font-semibold'
                            : 'bg-[#EAEAE4] text-[#0F172A] border-[#0F172A]/15 hover:border-[#0D9488]'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Daily Sample Volume Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label
                    htmlFor="sample-volume-slider"
                    className="font-mono text-xs uppercase tracking-wider text-[#0F172A] font-semibold"
                  >
                    02. DAILY SAMPLE / PLATE VOLUME:
                  </label>
                  <span className="font-mono text-lg font-bold text-[#0D9488] bg-[#EAEAE4] px-3 py-1 border border-[#0F172A]/15">
                    {dailyVolume.toLocaleString()} samples / day
                  </span>
                </div>

                <input
                  id="sample-volume-slider"
                  type="range"
                  min={50}
                  max={5000}
                  step={50}
                  value={dailyVolume}
                  onChange={(e) => setDailyVolume(Number(e.target.value))}
                  className="w-full clinical-slider"
                />

                <div className="flex justify-between font-mono text-[11px] text-[#334155] mt-2">
                  <span>50 / DAY (BOUTIQUE R&amp;D)</span>
                  <span>2,500 / DAY (REGIONAL LAB)</span>
                  <span>5,000 / DAY (ENTERPRISE NETWORK)</span>
                </div>
              </div>

              {/* Bottleneck & Architecture Recommendation */}
              <div className="p-4 bg-[#EAEAE4] border border-[#0F172A]/10 space-y-2">
                <div className="font-mono text-[11px] text-[#334155] uppercase">
                  TARGETED MANUAL BOTTLENECK:
                </div>
                <div className="text-sm font-medium text-[#0F172A]">
                  {profile.primaryBottleneck}
                </div>
                <div className="pt-2 border-t border-[#0F172A]/10 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#334155]">RECOMMENDED STACK:</span>
                  <span className="text-[#0D9488] font-semibold">
                    {profile.recommendedModule}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Dynamic Telemetry Readouts */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 bg-[#0F172A] text-[#F4F4F0] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#F4F4F0]/15">
                  <span className="font-mono text-xs text-[#0D9488] uppercase tracking-wider">
                    PROJECTED OPERATIONAL TELEMETRY
                  </span>
                  <span className="font-mono text-xs text-[#F4F4F0]/70">
                    {(dailyVolume * 26).toLocaleString()} SAMPLES / MONTH
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Metric 1: Hours Saved/Month */}
                  <div className="p-5 bg-[#F4F4F0]/[0.04] border border-[#0D9488]/50">
                    <div className="flex items-center justify-between text-[#0D9488] mb-2">
                      <span className="font-mono text-[11px] uppercase">
                        Hours Saved / Mo
                      </span>
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="font-mono text-3xl font-bold text-[#0D9488]">
                      {hoursSavedMonth.toLocaleString()}
                      <span className="text-sm font-normal text-[#F4F4F0]/80 ml-1">
                        hrs
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-[#F4F4F0]/65 mt-2">
                      &asymp; {Math.max(1, Math.round(hoursSavedMonth / 160))} Senior Lab FTEs Reclaimed
                    </div>
                  </div>

                  {/* Metric 2: Error Reduction % */}
                  <div className="p-5 bg-[#F4F4F0]/[0.04] border border-[#F4F4F0]/15">
                    <div className="flex items-center justify-between text-[#0D9488] mb-2">
                      <span className="font-mono text-[11px] uppercase">
                        Error Reduction
                      </span>
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="font-mono text-3xl font-bold text-[#0D9488]">
                      {profile.errorReductionPct}%
                    </div>
                    <div className="font-mono text-[11px] text-[#F4F4F0]/65 mt-2">
                      Zero Manual Transcription Drift
                    </div>
                  </div>

                  {/* Metric 3: Throughput Multiplier */}
                  <div className="p-5 bg-[#F4F4F0]/[0.04] border border-[#F4F4F0]/15">
                    <div className="flex items-center justify-between text-[#0D9488] mb-2">
                      <span className="font-mono text-[11px] uppercase">
                        Throughput Gain
                      </span>
                      <Activity className="w-4 h-4" />
                    </div>
                    <div className="font-mono text-3xl font-bold text-[#0D9488]">
                      {profile.throughputMultiplier}
                    </div>
                    <div className="font-mono text-[11px] text-[#F4F4F0]/65 mt-2">
                      Assay Turnaround Velocity
                    </div>
                  </div>
                </div>

                {/* Secondary Financial & Compliance Bar */}
                <div className="mt-6 p-5 bg-[#F4F4F0]/[0.03] border border-[#F4F4F0]/15 space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#F4F4F0]/70">
                      ESTIMATED ANNUAL OPERATIONAL SAVINGS:
                    </span>
                    <span className="text-base font-bold text-[#0D9488]">
                      ${annualReagentAndLaborSavings.toLocaleString()} / YEAR
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#F4F4F0]/10 overflow-hidden">
                    <div
                      className="h-full bg-[#0D9488] transition-all duration-300"
                      style={{
                        width: `${Math.min(100, Math.max(12, (dailyVolume / 5000) * 100))}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#F4F4F0]/60">
                    <span>AUDIT COMPLIANCE: FDA 21 CFR PART 11</span>
                    <span>PAYBACK PERIOD: &lt; 4.2 MONTHS</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-[#F4F4F0]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 font-mono text-xs text-[#F4F4F0]/75">
                  <Cpu className="w-4 h-4 text-[#0D9488]" />
                  <span>Custom validation protocol available for your SOPs</span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-[#F4F4F0] font-mono text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <span>Request Custom Lab Audit</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
