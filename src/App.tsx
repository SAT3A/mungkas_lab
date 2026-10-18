import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Terminal, ArrowUpRight, Microscope, Cpu, Workflow, ShieldCheck } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroTelemetryWidget } from './components/HeroTelemetryWidget';
import { AboutSection } from './components/AboutSection';
import { DivisionsSection } from './components/DivisionsSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { RoiEstimatorSection } from './components/RoiEstimatorSection';
import { ContactFooterSection } from './components/ContactFooterSection';
import { Counter, Reveal, usePrefersReducedMotion } from './components/ui';

function useSmoothScroll() {
  const reduced = useReducedMotion();
  return (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }
  };
}

export function App() {
  const scrollToSection = useSmoothScroll();
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div id="top" className="min-h-screen bg-[#F4F4F0] text-[#0F172A] flex flex-col">
      {reduced ? (
        <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-[#0D9488]/40" aria-hidden="true" />
      ) : (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-[#0D9488] origin-left"
          style={{ scaleX }}
          aria-hidden="true"
        />
      )}

      <Navbar onNavigate={scrollToSection} />

      <main className="flex-grow">
        <section className="relative border-b border-[#0F172A]/10 pt-8 pb-20 lg:py-16 overflow-hidden">
          <div className="absolute inset-0 lab-grid-bg lab-grid-fade pointer-events-none" aria-hidden="true" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="px-4 py-2 bg-[#EAEAE4] border border-[#0F172A]/10 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[#334155] mb-10 lg:mb-12">
              <div className="flex items-center gap-3">
                <span className="text-[#0D9488] font-semibold">SYS_STATUS: ONLINE</span>
                <span aria-hidden="true">//</span>
                <span>LATENCY: 14ms</span>
                <span className="hidden sm:inline" aria-hidden="true">//</span>
                <span className="hidden sm:inline">ISO/IEC-17025 COMPLIANT</span>
              </div>
              <div className="flex items-center gap-3">
                <span>FDA 21 CFR PART 11</span>
                <span className="text-[#0D9488]" aria-hidden="true">●</span>
                <span>WET-LAB EDGE AI v4.2</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <Reveal className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EAEAE4] border border-[#0F172A]/15 font-mono text-xs font-semibold text-[#0D9488] tracking-wider">
                  <span className="w-2 h-2 bg-[#0D9488]" aria-hidden="true" />
                  <span>[ MUNGKAS LAB // AUTONOMOUS BIO-INTELLIGENCE ]</span>
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl lg:text-[52px] font-bold text-[#0F172A] leading-[1.06] tracking-tight text-balance">
                  Autonomous AI Architecture for the Modern Biotech &amp; Microbiology Lab.
                </h1>

                <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl">
                  We engineer intelligent multi-agent workflows, computer vision diagnostics, and automated
                  LIMS pipelines that eliminate manual bottlenecks in wet-lab R&amp;D and clinical operations.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('projects')}
                    className="cursor-pointer inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-[#F4F4F0] font-mono text-xs font-semibold uppercase tracking-wider transition-colors duration-200 rounded-sm"
                  >
                    <span>Explore Deployed Systems</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('stack')}
                    className="cursor-pointer inline-flex items-center gap-2.5 px-6 py-3.5 bg-transparent hover:bg-[#EAEAE4] text-[#0F172A] border border-[#0F172A] font-mono text-xs font-semibold uppercase tracking-wider transition-colors duration-200 rounded-sm"
                  >
                    <Terminal className="w-4 h-4 text-[#0D9488]" aria-hidden="true" />
                    <span>Inspect Architecture</span>
                  </button>
                </div>

                <div className="pt-6 grid grid-cols-3 border-t border-[#0F172A]/15 gap-4">
                  <div>
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-[#0F172A]">
                      <Counter value={99.4} decimals={1} />
                      <span className="text-[#0D9488]">%</span>
                    </div>
                    <div className="font-mono text-[11px] text-[#334155] uppercase mt-1">CFU Vision Concordance</div>
                  </div>
                  <div className="border-l border-[#0F172A]/15 pl-4">
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-[#0F172A]">
                      <Counter value={12} />
                      <span className="text-[#0D9488]">x</span>
                    </div>
                    <div className="font-mono text-[11px] text-[#334155] uppercase mt-1">Assay Turnaround Speed</div>
                  </div>
                  <div className="border-l border-[#0F172A]/15 pl-4">
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-[#0F172A]">
                      <Counter value={100} />
                      <span className="text-[#0D9488]">%</span>
                    </div>
                    <div className="font-mono text-[11px] text-[#334155] uppercase mt-1">21 CFR Part 11 Audit Trail</div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.12} className="lg:col-span-6">
                <HeroTelemetryWidget />
              </Reveal>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Microscope, label: 'EDGE OPTICS', val: 'TELECENTRIC ARRAY' },
                { icon: Cpu, label: 'EDGE TENSORRT NODES', val: 'FP16 DETERMINISTIC' },
                { icon: Workflow, label: 'LIMS & ERP CONNECTORS', val: 'HL7 / ASTM / SAP' },
                { icon: ShieldCheck, label: 'CONTAINMENT READY', val: 'BSL-2 & BSL-3 AIRGAP' },
              ].map((item) => (
                <div key={item.label} className="p-3.5 bg-[#EAEAE4] border border-[#0F172A]/10 flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-[#0D9488] shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-mono text-[10px] text-[#334155]">{item.label}</div>
                    <div className="font-mono text-xs font-bold text-[#0F172A]">{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AboutSection />
        <DivisionsSection onNavigate={scrollToSection} />
        <CaseStudiesSection />
        <ArchitectureSection />
        <RoiEstimatorSection onNavigate={scrollToSection} />
      </main>

      <ContactFooterSection onNavigate={scrollToSection} />
    </div>
  );
}

export default App;
