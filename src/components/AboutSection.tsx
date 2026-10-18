import React from 'react';
import { Microscope, Workflow, ShieldCheck, Cpu, Database, Activity } from 'lucide-react';
import { MeterBar, Reveal, SectionHeading, Counter } from './ui';

const PILLARS = [
  {
    code: 'PILLAR_01 // EDGE_OPTICS',
    icon: Microscope,
    title: 'Zero-Touch Wet Lab',
    body: 'Automating physical observation and assay reading via edge computer vision. Sub-millimeter colony segmentation, chromogenic phenotyping, and Kirby-Bauer AST caliper measurement without human eyepiece fatigue.',
    meter: { label: 'OPTICAL_CONCORDANCE', value: 99, display: '99.2%' },
    footLeft: 'INTER-OPERATOR VARIANCE: 0.0%',
    footRight: '24ms/PLATE',
  },
  {
    code: 'PILLAR_02 // MULTI_AGENT_BUS',
    icon: Workflow,
    title: 'Autonomous LIMS Orchestration',
    body: 'Event-driven AI agents that connect lab instruments directly to cloud databases and ERP systems. Raw HPLC, PCR, and Mass-Spec outputs are parsed, cross-checked against calibration curves, and reconciled automatically.',
    meter: { label: 'QA/QC CYCLE COMPRESSION', value: 85, display: '-85% TIME' },
    footLeft: 'ASTM / HL7 / FHIR NATIVE',
    footRight: 'ZERO CLIPBOARDS',
  },
  {
    code: 'PILLAR_03 // DETERMINISTIC_QA',
    icon: ShieldCheck,
    title: 'Audit-Ready Compliance',
    body: 'Deterministic data pipelines engineered for FDA 21 CFR Part 11, GLP, and ISO standards. Every computer vision bounding box, agent action, and reagent lot assignment is cryptographically hashed and version-locked.',
    meter: null,
    footLeft: 'FDA 21 CFR PART 11',
    footRight: 'ISO/IEC-17025',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 border-b border-[#0F172A]/10 bg-[#F4F4F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          eyebrow="THE CONFLUENCE OF SILICON & BIOLOGY"
          title="Bridging Principal Systems Engineering with Wet-Lab Precision"
          description="Traditional microbiology and biotechnology laboratories remain constrained by fragmented instrument outputs, manual colony counting under magnifying lamps, and error-prone spreadsheet reconciliation. Billions of dollars in R&D velocity are lost to human transcription bottlenecks."
          aside={
            <p className="text-sm font-medium text-[#0F172A] leading-relaxed border-l-2 border-[#0D9488] pl-4">
              Mungkas Lab engineers deterministic AI infrastructure that integrates directly with optical
              microscopes, bioreactors, sequencers, and enterprise LIMS—transforming physical biological assays
              into autonomous, audit-ready data streams.
            </p>
          }
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 border border-[#0F172A]/15 bg-[#EAEAE4]">
          {PILLARS.map((pillar, idx) => (
            <Reveal
              key={pillar.code}
              delay={idx * 0.08}
              className={`flex flex-col justify-between bg-[#F4F4F0] p-8 ${
                idx < PILLARS.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-[#0F172A]/15' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-[#EAEAE4] text-[#0D9488] border border-[#0F172A]/10">
                    {pillar.code}
                  </span>
                  <pillar.icon className="w-6 h-6 text-[#0D9488]" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#0F172A]">{pillar.title}</h3>
                <p className="text-sm text-[#334155] mt-3 leading-relaxed">{pillar.body}</p>
              </div>

              {pillar.meter ? (
                <div className="mt-8 p-4 bg-[#EAEAE4] border border-[#0F172A]/10 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-[#0F172A]">
                    <span>{pillar.meter.label}</span>
                    <span className="text-[#0D9488] font-bold">{pillar.meter.display}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F4F4F0]">
                    <MeterBar percent={pillar.meter.value} />
                  </div>
                  <div className="text-[11px] text-[#334155] flex justify-between">
                    <span>{pillar.footLeft}</span>
                    <span>{pillar.footRight}</span>
                  </div>
                </div>
              ) : (
                <div className="mt-8 p-4 bg-[#0F172A] text-[#F4F4F0] font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#0D9488]">SHA-256 AUDIT LEDGER</span>
                    <span>IMMUTABLE</span>
                  </div>
                  <div className="text-[11px] text-[#F4F4F0]/75 flex items-center justify-between pt-1 border-t border-[#F4F4F0]/15">
                    <span>{pillar.footLeft}</span>
                    <span>{pillar.footRight}</span>
                  </div>
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: Cpu, label: 'EDGE INFERENCE', val: '24ms PLATE-TO-VERDICT' },
            { icon: Database, label: 'SPECIMENS / WEEK', val: '15,000+ PROCESSED' },
            { icon: Activity, label: 'BIOREACTOR TELEMETRY', val: '100HZ STREAMING' },
            { icon: ShieldCheck, label: 'AUDIT TRAIL', val: '100% AUTOMATED' },
          ].map((item, idx) => (
            <div key={item.label} className="p-3.5 bg-[#EAEAE4] border border-[#0F172A]/10 flex items-center gap-3">
              <item.icon className="w-4 h-4 text-[#0D9488] shrink-0" aria-hidden="true" />
              <div>
                <div className="font-mono text-[10px] text-[#334155]">{item.label}</div>
                <div className="font-mono text-xs font-bold text-[#0F172A]">
                  {idx === 1 ? (
                    <>
                      <Counter value={15000} />+ PROCESSED
                    </>
                  ) : (
                    item.val
                  )}
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};
