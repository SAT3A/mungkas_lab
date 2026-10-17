import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Microscope,
  Workflow,
  Activity,
  CheckCircle2,
  ArrowUpRight,
  Cpu,
  ShieldCheck,
} from 'lucide-react';
import { DIVISIONS } from '../data/labData';

export const DivisionsSection: React.FC<{ onNavigate: (id: string) => void }> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<string>(DIVISIONS[0].id);

  const selectedDivision =
    DIVISIONS.find((d) => d.id === activeTab) || DIVISIONS[0];

  const getIcon = (id: string) => {
    switch (id) {
      case 'cv-microscopy':
        return <Microscope className="w-5 h-5" />;
      case 'autonomous-lims':
        return <Workflow className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="solutions"
      className="py-20 lg:py-28 border-b border-[#0F172A]/10 bg-[#F4F4F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#0F172A]/10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#0D9488] mb-3">
              <span className="w-2 h-2 bg-[#0D9488]" />
              <span>02 // CORE R&amp;D DIVISIONS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              Specialized Applied AI Units for Wet-Lab &amp; Clinical Scale
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#334155] max-w-md">
            Each division combines domain microbiologists, bioprocess engineers, and principal systems architects to deliver deterministic production infrastructure.
          </p>
        </div>

        {/* Interactive 3-Division Selector Tabs */}
        <div
          role="tablist"
          aria-label="Mungkas Lab Core Divisions"
          className="grid grid-cols-1 md:grid-cols-3 border-x border-b border-[#0F172A]/10 bg-[#EAEAE4]"
        >
          {DIVISIONS.map((div) => {
            const isSelected = div.id === activeTab;
            return (
              <button
                key={div.id}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => setActiveTab(div.id)}
                className={`cursor-pointer text-left p-6 transition-all duration-200 border-b md:border-b-0 md:border-r last:border-r-0 border-[#0F172A]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0D9488] ${
                  isSelected
                    ? 'bg-[#0F172A] text-[#F4F4F0]'
                    : 'bg-[#EAEAE4] text-[#0F172A] hover:bg-[#F4F4F0]'
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
                    {div.code}
                  </span>
                  <span className={isSelected ? 'text-[#0D9488]' : 'text-[#0F172A]'}>
                    {getIcon(div.id)}
                  </span>
                </div>
                <div className="font-mono text-xs text-[#0D9488] font-medium mb-1">
                  {div.roman}
                </div>
                <h3 className="font-heading text-lg font-bold tracking-tight">
                  {div.title}
                </h3>
                <p
                  className={`text-xs mt-2 line-clamp-2 ${
                    isSelected ? 'text-[#F4F4F0]/75' : 'text-[#334155]'
                  }`}
                >
                  {div.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Division Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDivision.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="border-x border-b border-[#0F172A]/10 bg-[#F4F4F0] grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Left Narrative & Capabilities */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#0F172A]/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 font-mono text-xs text-[#0D9488] mb-3">
                  <span>{selectedDivision.roman.toUpperCase()}</span>
                  <span>//</span>
                  <span>{selectedDivision.code}</span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#0F172A]">
                  {selectedDivision.title}
                </h3>
                <p className="text-[#334155] mt-3 leading-relaxed">
                  {selectedDivision.description}
                </p>

                <div className="mt-8 space-y-3">
                  <div className="font-mono text-xs uppercase tracking-wider text-[#334155]">
                    DEPLOYED TECHNICAL CAPABILITIES:
                  </div>
                  {selectedDivision.capabilities.map((cap) => (
                    <div
                      key={cap.name}
                      className="p-4 bg-[#EAEAE4] border border-[#0F172A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-heading font-semibold text-sm text-[#0F172A]">
                            {cap.name}
                          </div>
                          <div className="font-mono text-xs text-[#334155] mt-0.5">
                            {cap.spec}
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-[#0F172A] text-[#0D9488] shrink-0 self-start sm:self-center">
                        {cap.metric}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#0F172A]/10 flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-xs text-[#334155]">
                  STATUS: PRODUCTION-READY ARCHITECTURE
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="cursor-pointer inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#0D9488] hover:text-[#0F766E] uppercase tracking-wider"
                >
                  <span>Inspect Division Case Studies</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Division Telemetry Specification Card */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 bg-[#EAEAE4] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#0F172A]/10">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
                    DIVISION SPECIFICATION MATRIX
                  </span>
                  <Cpu className="w-4 h-4 text-[#0D9488]" />
                </div>

                <dl className="mt-6 space-y-5">
                  <div className="border-b border-[#0F172A]/10 pb-4">
                    <dt className="font-mono text-[11px] uppercase text-[#334155]">
                      CORE AI / COMPUTE KERNEL
                    </dt>
                    <dd className="font-mono text-sm font-semibold text-[#0F172A] mt-1">
                      {selectedDivision.telemetry.modelArch}
                    </dd>
                  </div>

                  <div className="border-b border-[#0F172A]/10 pb-4">
                    <dt className="font-mono text-[11px] uppercase text-[#334155]">
                      BENCHMARK THROUGHPUT
                    </dt>
                    <dd className="font-mono text-sm font-semibold text-[#0D9488] mt-1">
                      {selectedDivision.telemetry.throughput}
                    </dd>
                  </div>

                  <div className="border-b border-[#0F172A]/10 pb-4">
                    <dt className="font-mono text-[11px] uppercase text-[#334155]">
                      REGULATORY &amp; QUALITY STANDARD
                    </dt>
                    <dd className="font-mono text-sm font-semibold text-[#0F172A] mt-1">
                      {selectedDivision.telemetry.validation}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-mono text-[11px] uppercase text-[#334155]">
                      HARDWARE &amp; DATA PROTOCOLS
                    </dt>
                    <dd className="font-mono text-xs text-[#0F172A] mt-1 bg-[#F4F4F0] p-3 border border-[#0F172A]/10">
                      {selectedDivision.telemetry.interface}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 p-4 bg-[#0F172A] text-[#F4F4F0] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
                  <span className="font-mono text-xs">
                    DETERMINISTIC VALIDATION HARNESS
                  </span>
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
