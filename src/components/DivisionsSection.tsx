import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope, Workflow, Activity, CheckCircle2, ArrowUpRight, Cpu, ShieldCheck } from 'lucide-react';
import { SectionHeading, Reveal, usePrefersReducedMotion } from './ui';
import { DIVISIONS } from '../data/labData';

const TAB_ICONS = [Microscope, Workflow, Activity];

export const DivisionsSection: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>(DIVISIONS[0].id);
  const reduced = usePrefersReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = DIVISIONS.findIndex((d) => d.id === activeTab);
  const selectedDivision = DIVISIONS[activeIndex] ?? DIVISIONS[0];

  const focusTab = (nextIndex: number) => {
    const total = DIVISIONS.length;
    const wrapped = (nextIndex + total) % total;
    setActiveTab(DIVISIONS[wrapped].id);
    tabRefs.current[wrapped]?.focus();
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        focusTab(index + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        focusTab(index - 1);
        break;
      case 'Home':
        e.preventDefault();
        focusTab(0);
        break;
      case 'End':
        e.preventDefault();
        focusTab(DIVISIONS.length - 1);
        break;
    }
  };

  return (
    <section id="solutions" className="py-20 lg:py-28 border-b border-[#0F172A]/10 bg-[#F4F4F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          eyebrow="CORE R&D DIVISIONS"
          title="Specialized Applied AI Units for Wet-Lab & Clinical Scale"
          description="Each division combines domain microbiologists, bioprocess engineers, and principal systems architects to deliver deterministic production infrastructure."
        />

        <div
          role="tablist"
          aria-label="Mungkas Lab Core Divisions"
          className="mt-10 grid grid-cols-1 md:grid-cols-3 border-x border-b border-[#0F172A]/10 bg-[#EAEAE4]"
        >
          {DIVISIONS.map((division, index) => {
            const Icon = TAB_ICONS[index] ?? Workflow;
            const isSelected = division.id === activeTab;
            return (
              <button
                key={division.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                role="tab"
                id={`division-tab-${division.id}`}
                aria-selected={isSelected}
                aria-controls={`division-panel-${division.id}`}
                tabIndex={isSelected ? 0 : -1}
                type="button"
                onClick={() => setActiveTab(division.id)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={`cursor-pointer text-left p-6 transition-colors duration-200 border-b md:border-b-0 md:border-r last:border-r-0 border-[#0F172A]/10 ${
                  isSelected ? 'bg-[#0F172A] text-[#F4F4F0]' : 'bg-[#EAEAE4] text-[#0F172A] hover:bg-[#F4F4F0]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-mono text-xs uppercase tracking-wider px-2 py-0.5 border ${
                      isSelected
                        ? 'border-[#0D9488] text-[#0D9488] bg-[#0D9488]/10'
                        : 'border-[#0F172A]/15 text-[#334155]'
                    }`}
                  >
                    {division.code}
                  </span>
                  <span className={isSelected ? 'text-[#0D9488]' : 'text-[#0F172A]'} aria-hidden="true">
                    <Icon className="w-5 h-5" />
                  </span>
                </div>
                <div className="font-mono text-xs text-[#0D9488] font-medium mb-1">{division.roman}</div>
                <h3 className="font-heading text-lg font-bold tracking-tight">{division.title}</h3>
                <p className={`text-xs mt-2 line-clamp-2 ${isSelected ? 'text-[#F4F4F0]/75' : 'text-[#334155]'}`}>
                  {division.tagline}
                </p>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDivision.id}
            role="tabpanel"
            id={`division-panel-${selectedDivision.id}`}
            aria-labelledby={`division-tab-${selectedDivision.id}`}
            tabIndex={0}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="border-x border-b border-[#0F172A]/10 bg-[#F4F4F0] grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#0F172A]/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 font-mono text-xs text-[#0D9488] mb-3">
                  <span>{selectedDivision.roman.toUpperCase()}</span>
                  <span aria-hidden="true">//</span>
                  <span>{selectedDivision.code}</span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#0F172A]">
                  {selectedDivision.title}
                </h3>
                <p className="text-[#334155] mt-3 leading-relaxed">{selectedDivision.description}</p>

                <div className="mt-8 space-y-3">
                  <div className="font-mono text-xs uppercase tracking-wider text-[#334155]">
                    DEPLOYED TECHNICAL CAPABILITIES:
                  </div>
                  {selectedDivision.capabilities.map((cap, i) => (
                    <Reveal key={cap.name} delay={i * 0.06}>
                      <div className="p-4 bg-[#EAEAE4] border border-[#0F172A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <div className="font-heading font-semibold text-sm text-[#0F172A]">{cap.name}</div>
                            <div className="font-mono text-xs text-[#334155] mt-0.5">{cap.spec}</div>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-[#0F172A] text-[#0D9488] shrink-0 self-start sm:self-center">
                          {cap.metric}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#0F172A]/10 flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-xs text-[#334155]">STATUS: PRODUCTION-READY ARCHITECTURE</span>
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="cursor-pointer inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#0D9488] hover:text-[#0F766E] uppercase tracking-wider"
                >
                  <span>Inspect Division Case Studies</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 bg-[#EAEAE4] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#0F172A]/10">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
                    DIVISION SPECIFICATION MATRIX
                  </span>
                  <Cpu className="w-4 h-4 text-[#0D9488]" aria-hidden="true" />
                </div>

                <dl className="mt-6 space-y-5">
                  <div className="border-b border-[#0F172A]/10 pb-4">
                    <dt className="font-mono text-[11px] uppercase text-[#334155]">CORE AI / COMPUTE KERNEL</dt>
                    <dd className="font-mono text-sm font-semibold text-[#0F172A] mt-1">
                      {selectedDivision.telemetry.modelArch}
                    </dd>
                  </div>
                  <div className="border-b border-[#0F172A]/10 pb-4">
                    <dt className="font-mono text-[11px] uppercase text-[#334155]">BENCHMARK THROUGHPUT</dt>
                    <dd className="font-mono text-sm font-semibold text-[#0D9488] mt-1">
                      {selectedDivision.telemetry.throughput}
                    </dd>
                  </div>
                  <div className="border-b border-[#0F172A]/10 pb-4">
                    <dt className="font-mono text-[11px] uppercase text-[#334155]">REGULATORY &amp; QUALITY STANDARD</dt>
                    <dd className="font-mono text-sm font-semibold text-[#0F172A] mt-1">
                      {selectedDivision.telemetry.validation}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase text-[#334155]">HARDWARE &amp; DATA PROTOCOLS</dt>
                    <dd className="font-mono text-xs text-[#0F172A] mt-1 bg-[#F4F4F0] p-3 border border-[#0F172A]/10">
                      {selectedDivision.telemetry.interface}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 p-4 bg-[#0F172A] text-[#F4F4F0] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#0D9488]" aria-hidden="true" />
                  <span className="font-mono text-xs">DETERMINISTIC VALIDATION HARNESS</span>
                </div>
                <span className="font-mono text-[11px] text-[#0D9488]">PASS 100%</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
