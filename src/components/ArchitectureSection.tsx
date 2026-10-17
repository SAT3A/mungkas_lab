import React, { useState } from 'react';
import {
  Layers,
  Cpu,
  Database,
  Microscope,
  ShieldCheck,
  ArrowDownUp,
  Terminal,
} from 'lucide-react';
import { ARCHITECTURE_LAYERS } from '../data/labData';

export const ArchitectureSection: React.FC = () => {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);

  const getLayerIcon = (code: string) => {
    if (code.startsWith('L4')) return <ShieldCheck className="w-4 h-4 text-[#0D9488]" />;
    if (code.startsWith('L3')) return <Database className="w-4 h-4 text-[#0D9488]" />;
    if (code.startsWith('L2')) return <Cpu className="w-4 h-4 text-[#0D9488]" />;
    return <Microscope className="w-4 h-4 text-[#0D9488]" />;
  };

  return (
    <section
      id="stack"
      className="py-20 lg:py-28 border-b border-[#0F172A]/10 bg-[#F4F4F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#0F172A]/10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#0D9488] mb-3">
              <span className="w-2 h-2 bg-[#0D9488]" />
              <span>04 // ENGINEERING &amp; SCIENTIFIC STACK</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              4-Layer Deterministic Bio-Intelligence Architecture
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#334155] bg-[#EAEAE4] px-3.5 py-2 border border-[#0F172A]/10">
            <ArrowDownUp className="w-4 h-4 text-[#0D9488]" />
            <span>WET-LAB OPTICS &harr; EDGE AI &harr; LIMS CLOUD</span>
          </div>
        </div>

        {/* Interactive 4-Layer Matrix */}
        <div className="mt-10 space-y-4">
          {ARCHITECTURE_LAYERS.map((layer, idx) => {
            const isExpanded = selectedLayerIndex === idx;
            return (
              <div
                key={layer.code}
                className={`border transition-colors duration-200 ${
                  isExpanded
                    ? 'border-[#0F172A] bg-[#EAEAE4]'
                    : 'border-[#0F172A]/15 bg-[#F4F4F0] hover:bg-[#EAEAE4]/60'
                }`}
              >
                {/* Layer Header Row */}
                <button
                  type="button"
                  onClick={() => setSelectedLayerIndex(idx)}
                  aria-expanded={isExpanded}
                  className="cursor-pointer w-full text-left px-6 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488]"
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
                      {getLayerIcon(layer.code)}
                      <h3 className="font-heading text-xl font-bold text-[#0F172A]">
                        {layer.name}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-[#334155] hidden sm:inline">
                      — {layer.subtitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="px-2.5 py-1 bg-[#F4F4F0] border border-[#0F172A]/10 text-[#0F172A]">
                      {layer.protocolSpec}
                    </span>
                    <span className="px-2.5 py-1 bg-[#0F172A] text-[#0D9488]">
                      {layer.latencySpec}
                    </span>
                  </div>
                </button>

                {/* Layer 4-Module Matrix */}
                <div className="px-6 pb-6 pt-2 border-t border-[#0F172A]/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {layer.modules.map((mod) => (
                    <div
                      key={mod.name}
                      className={`p-4 border transition-colors ${
                        isExpanded
                          ? 'bg-[#F4F4F0] border-[#0F172A]/20'
                          : 'bg-[#EAEAE4]/60 border-[#0F172A]/10'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] text-[#0D9488] uppercase tracking-wider mb-1">
                        <span>{mod.role}</span>
                        <Layers className="w-3 h-3" />
                      </div>
                      <div className="font-heading font-bold text-base text-[#0F172A]">
                        {mod.name}
                      </div>
                      <p className="text-xs text-[#334155] mt-2 leading-relaxed">
                        {mod.spec}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Hardware-to-Cloud Telemetry Strip */}
        <div className="mt-8 p-5 bg-[#0F172A] text-[#F4F4F0] border border-[#0F172A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-[#0D9488] shrink-0" />
            <div>
              <div className="font-mono text-xs text-[#0D9488] font-semibold">
                DEPLOYMENT TOPOLOGY // AIR-GAPPED ON-PREM OR AWS/GCP BIO-VPC
              </div>
              <p className="text-xs text-[#F4F4F0]/80 mt-0.5">
                All vision models and LIMS agents support zero-egress local execution on NVIDIA Jetson Orin / TensorRT appliances inside BSL-2 &amp; BSL-3 containment facilities.
              </p>
            </div>
          </div>
          <div className="font-mono text-xs px-3 py-1.5 bg-[#0D9488] text-[#F4F4F0] shrink-0">
            ISO/IEC-17025 &amp; GAMP-5 READY
          </div>
        </div>
      </div>
    </section>
  );
};
