import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Cpu, Database, Microscope, ShieldCheck, ArrowDownUp, Terminal, ChevronDown } from 'lucide-react';
import { SectionHeading, Reveal, usePrefersReducedMotion } from './ui';
import { ARCHITECTURE_LAYERS } from '../data/labData';

const DISPLAY_LAYERS = [...ARCHITECTURE_LAYERS].reverse();

function getLayerIcon(code: string) {
  if (code.startsWith('L4')) return ShieldCheck;
  if (code.startsWith('L3')) return Database;
  if (code.startsWith('L2')) return Cpu;
  return Microscope;
}

export const ArchitectureSection: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(0);
  const reduced = usePrefersReducedMotion();

  return (
    <section id="stack" className="py-20 lg:py-28 border-b border-[#0F172A]/10 bg-[#F4F4F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          eyebrow="ENGINEERING & SCIENTIFIC STACK"
          title="4-Layer Deterministic Bio-Intelligence Architecture"
          aside={
            <div className="flex items-center gap-2 font-mono text-xs text-[#334155] bg-[#EAEAE4] px-3.5 py-2 border border-[#0F172A]/10">
              <ArrowDownUp className="w-4 h-4 text-[#0D9488]" aria-hidden="true" />
              <span>WET-LAB OPTICS ↔ EDGE AI ↔ LIMS CLOUD</span>
            </div>
          }
        />

        <div className="mt-10 space-y-0">
          {DISPLAY_LAYERS.map((layer, idx) => {
            const isExpanded = selectedLayer === idx;
            const Icon = getLayerIcon(layer.code);
            return (
              <Reveal key={layer.code} delay={idx * 0.05}>
                <div
                  className={`border transition-colors duration-200 ${
                    isExpanded
                      ? 'border-[#0F172A] bg-[#EAEAE4]'
                      : 'border-[#0F172A]/15 bg-[#F4F4F0] hover:bg-[#EAEAE4]/60'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedLayer(isExpanded ? -1 : idx)}
                    aria-expanded={isExpanded}
                    aria-controls={`layer-panel-${layer.code}`}
                    className="cursor-pointer w-full text-left px-6 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`font-mono text-xs font-bold px-2.5 py-1 border ${
                          isExpanded
                            ? 'bg-[#0F172A] text-[#0D9488] border-[#0F172A]'
                            : 'bg-[#EAEAE4] text-[#0F172A] border-[#0F172A]/15'
                        }`}
                      >
                        {layer.layerNumber}
                      </span>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#0D9488]" aria-hidden="true" />
                        <h3 className="font-heading text-xl font-bold text-[#0F172A]">{layer.name}</h3>
                      </div>
                      <span className="font-mono text-xs text-[#334155] hidden sm:inline">— {layer.subtitle}</span>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs">
                      <span className="px-2.5 py-1 bg-[#F4F4F0] border border-[#0F172A]/10 text-[#0F172A]">
                        {layer.protocolSpec}
                      </span>
                      <span className="px-2.5 py-1 bg-[#0F172A] text-[#0D9488]">{layer.latencySpec}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#334155] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        id={`layer-panel-${layer.code}`}
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={reduced ? undefined : { height: 'auto', opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-[#0F172A]/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {layer.modules.map((mod) => (
                            <div key={mod.name} className="p-4 border bg-[#F4F4F0] border-[#0F172A]/20">
                              <div className="flex items-center justify-between font-mono text-[10px] text-[#0D9488] uppercase tracking-wider mb-1">
                                <span>{mod.role}</span>
                                <Layers className="w-3 h-3" aria-hidden="true" />
                              </div>
                              <div className="font-heading font-bold text-base text-[#0F172A]">{mod.name}</div>
                              <p className="text-xs text-[#334155] mt-2 leading-relaxed">{mod.spec}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {idx < ARCHITECTURE_LAYERS.length - 1 && (
                  <div className="flex items-center gap-3 py-1" aria-hidden="true">
                    <div className="w-10 h-px bg-[#0D9488]/30" />
                    <div className="flow-connector w-0.5 h-5" />
                    <span className="font-mono text-[10px] text-[#0D9488]/70">DATA BUS ↓ CONTROL BUS ↑</span>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-8 p-5 bg-[#0F172A] text-[#F4F4F0] border border-[#0F172A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-[#0D9488] shrink-0" aria-hidden="true" />
            <div>
              <div className="font-mono text-xs text-[#0D9488] font-semibold">
                DEPLOYMENT TOPOLOGY // AIR-GAPPED ON-PREM OR AWS/GCP BIO-VPC
              </div>
              <p className="text-xs text-[#F4F4F0]/80 mt-0.5">
                All vision models and LIMS agents support zero-egress local execution on NVIDIA Jetson Orin /
                TensorRT appliances inside BSL-2 &amp; BSL-3 containment facilities.
              </p>
            </div>
          </div>
          <div className="font-mono text-xs px-3 py-1.5 bg-[#0D9488] text-[#F4F4F0] shrink-0">
            ISO/IEC-17025 &amp; GAMP-5 READY
          </div>
        </Reveal>
      </div>
    </section>
  );
};
