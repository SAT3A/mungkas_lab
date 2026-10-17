import { motion } from 'framer-motion';
import {
  Microscope,
  Cpu,
  Workflow,
  Database,
  Activity,
  Dna,
  ShieldCheck,
  Terminal,
  ArrowUpRight,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroTelemetryWidget } from './components/HeroTelemetryWidget';
import { DivisionsSection } from './components/DivisionsSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { RoiEstimatorSection } from './components/RoiEstimatorSection';
import { ContactFooterSection } from './components/ContactFooterSection';

export function App() {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="top" className="min-h-screen bg-[#F4F4F0] text-[#0F172A] flex flex-col">
      {/* A. Sticky Navigation Bar */}
      <Navbar onNavigate={scrollToSection} />

      <main className="flex-grow">
        {/* B. Hero Section */}
        <section className="relative lab-grid-bg border-b border-[#0F172A]/10 pt-10 pb-20 lg:py-20">
          {/* Exposed Technical Metadata Strip */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="px-4 py-2 bg-[#EAEAE4] border border-[#0F172A]/10 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[#334155]">
              <div className="flex items-center gap-3">
                <span className="text-[#0D9488] font-semibold">SYS_STATUS: ONLINE</span>
                <span>//</span>
                <span>LATENCY: 14ms</span>
                <span className="hidden sm:inline">//</span>
                <span className="hidden sm:inline">ISO/IEC-17025 COMPLIANT</span>
              </div>
              <div className="flex items-center gap-3">
                <span>FDA 21 CFR PART 11</span>
                <span className="text-[#0D9488]">●</span>
                <span>WET-LAB EDGE AI v4.2</span>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Headline, Sub-headline, CTAs, Quick Specs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="lg:col-span-6 space-y-6"
              >
                {/* Top Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EAEAE4] border border-[#0F172A]/15 font-mono text-xs font-semibold text-[#0D9488] tracking-wider">
                  <Dna className="w-3.5 h-3.5" />
                  <span>[ MUNGKAS LAB // AUTONOMOUS BIO-INTELLIGENCE ]</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-[52px] font-bold text-[#0F172A] leading-[1.08] tracking-tight">
                  Autonomous AI Architecture for the Modern Biotech &amp; Microbiology Lab.
                </h1>

                {/* Sub-headline */}
                <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl">
                  We engineer intelligent multi-agent workflows, computer vision diagnostics, and automated LIMS pipelines that eliminate manual bottlenecks in wet-lab R&amp;D and clinical operations.
                </p>

                {/* Primary CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('projects')}
                    className="cursor-pointer inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-[#F4F4F0] font-mono text-xs font-semibold uppercase tracking-wider transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488] focus-visible:ring-offset-2"
                  >
                    <span>Explore Deployed Systems</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('stack')}
                    className="cursor-pointer inline-flex items-center gap-2.5 px-6 py-3.5 bg-transparent hover:bg-[#EAEAE4] text-[#0F172A] border border-[#0F172A] font-mono text-xs font-semibold uppercase tracking-wider transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488]"
                  >
                    <Terminal className="w-4 h-4 text-[#0D9488]" />
                    <span>Inspect Architecture</span>
                  </button>
                </div>

                {/* Structural Telemetry Proof Strip */}
                <div className="pt-6 grid grid-cols-3 border-t border-[#0F172A]/15 gap-4">
                  <div>
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-[#0F172A]">
                      99.4<span className="text-[#0D9488]">%</span>
                    </div>
                    <div className="font-mono text-[11px] text-[#334155] uppercase mt-1">
                      CFU Vision Concordance
                    </div>
                  </div>
                  <div className="border-l border-[#0F172A]/15 pl-4">
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-[#0F172A]">
                      12<span className="text-[#0D9488]">x</span>
                    </div>
                    <div className="font-mono text-[11px] text-[#334155] uppercase mt-1">
                      Assay Turnaround Speed
                    </div>
                  </div>
                  <div className="border-l border-[#0F172A]/15 pl-4">
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-[#0F172A]">
                      100<span className="text-[#0D9488]">%</span>
                    </div>
                    <div className="font-mono text-[11px] text-[#334155] uppercase mt-1">
                      21 CFR Part 11 Audit Trail
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Live Interactive Mungkas Bio-OS Telemetry Widget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="lg:col-span-6"
              >
                <HeroTelemetryWidget />
              </motion.div>
            </div>
          </div>
        </section>

        {/* C. Section 01: About the Lab (#about) */}
        <section
          id="about"
          className="py-20 lg:py-28 border-b border-[#0F172A]/10 bg-[#F4F4F0]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header & Narrative Copy */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#0F172A]/10">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#0D9488] mb-3">
                  <span className="w-2 h-2 bg-[#0D9488]" />
                  <span>01 // THE CONFLUENCE OF SILICON &amp; BIOLOGY</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
                  Bridging Principal Systems Engineering with Wet-Lab Precision
                </h2>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
                  Traditional microbiology and biotechnology laboratories remain constrained by fragmented instrument outputs, manual colony counting under magnifying lamps, and error-prone spreadsheet reconciliation. Billions of dollars in R&amp;D velocity are lost to human transcription bottlenecks.
                </p>
                <p className="text-sm sm:text-base text-[#0F172A] font-medium leading-relaxed">
                  Mungkas Lab engineers deterministic AI infrastructure that integrates directly with optical microscopes, bioreactors, sequencers, and enterprise LIMS—transforming physical biological assays into autonomous, audit-ready data streams.
                </p>
              </div>
            </div>

            {/* 3 Key Pillars (Bento Grid with 1px structural borders) */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 border border-[#0F172A]/15 bg-[#EAEAE4]">
              {/* Pillar 1 */}
              <div className="p-8 border-b lg:border-b-0 lg:border-r border-[#0F172A]/15 flex flex-col justify-between bg-[#F4F4F0]">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-[#EAEAE4] text-[#0D9488] border border-[#0F172A]/10">
                      PILLAR_01 // EDGE_OPTICS
                    </span>
                    <Microscope className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-[#0F172A]">
                    Zero-Touch Wet Lab
                  </h3>
                  <p className="text-sm text-[#334155] mt-3 leading-relaxed">
                    Automating physical observation and assay reading via edge computer vision. Sub-millimeter colony segmentation, chromogenic phenotyping, and Kirby-Bauer AST caliper measurement without human eyepiece fatigue.
                  </p>
                </div>

                {/* Code-Built Visual Micro-Card */}
                <div className="mt-8 p-4 bg-[#EAEAE4] border border-[#0F172A]/10 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-[#0F172A]">
                    <span>OPTICAL_CONCORDANCE</span>
                    <span className="text-[#0D9488] font-bold">99.2%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F4F4F0]">
                    <div className="h-full bg-[#0D9488] w-[99%]" />
                  </div>
                  <div className="text-[11px] text-[#334155] flex justify-between">
                    <span>INTER-OPERATOR VARIANCE: 0.0%</span>
                    <span>24ms/PLATE</span>
                  </div>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-8 border-b lg:border-b-0 lg:border-r border-[#0F172A]/15 flex flex-col justify-between bg-[#F4F4F0]">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-[#EAEAE4] text-[#0D9488] border border-[#0F172A]/10">
                      PILLAR_02 // MULTI_AGENT_BUS
                    </span>
                    <Workflow className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-[#0F172A]">
                    Autonomous LIMS Orchestration
                  </h3>
                  <p className="text-sm text-[#334155] mt-3 leading-relaxed">
                    Event-driven AI agents that connect lab instruments directly to cloud databases and ERP systems. Raw HPLC, PCR, and Mass-Spec outputs are parsed, cross-checked against calibration curves, and reconciled automatically.
                  </p>
                </div>

                <div className="mt-8 p-4 bg-[#EAEAE4] border border-[#0F172A]/10 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-[#0F172A]">
                    <span>QA/QC CYCLE COMPRESSION</span>
                    <span className="text-[#0D9488] font-bold">-85% TIME</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F4F4F0]">
                    <div className="h-full bg-[#0D9488] w-[85%]" />
                  </div>
                  <div className="text-[11px] text-[#334155] flex justify-between">
                    <span>ASTM / HL7 / FHIR NATIVE</span>
                    <span>ZERO CLIPBOARDS</span>
                  </div>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-8 flex flex-col justify-between bg-[#F4F4F0]">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-[#EAEAE4] text-[#0D9488] border border-[#0F172A]/10">
                      PILLAR_03 // DETERMINISTIC_QA
                    </span>
                    <ShieldCheck className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-[#0F172A]">
                    Audit-Ready Compliance
                  </h3>
                  <p className="text-sm text-[#334155] mt-3 leading-relaxed">
                    Deterministic data pipelines engineered for FDA 21 CFR Part 11, GLP, and ISO standards. Every computer vision bounding box, agent action, and reagent lot assignment is cryptographically hashed and version-locked.
                  </p>
                </div>

                <div className="mt-8 p-4 bg-[#0F172A] text-[#F4F4F0] font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#0D9488]">SHA-256 AUDIT LEDGER</span>
                    <span>IMMUTABLE</span>
                  </div>
                  <div className="text-[11px] text-[#F4F4F0]/75 flex items-center justify-between pt-1 border-t border-[#F4F4F0]/15">
                    <span>FDA 21 CFR PART 11</span>
                    <span>ISO/IEC-17025</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Telemetry Bar */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Cpu, label: 'EDGE TENSORRT NODES', val: 'FP16 DETERMINISTIC' },
                { icon: Database, label: 'LIMS & ERP CONNECTORS', val: 'HL7 / ASTM / SAP' },
                { icon: Activity, label: 'BIOREACTOR TELEMETRY', val: '100HZ STREAMING' },
                { icon: ShieldCheck, label: 'CONTAINMENT READY', val: 'BSL-2 & BSL-3 AIRGAP' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-3.5 bg-[#EAEAE4] border border-[#0F172A]/10 flex items-center gap-3"
                >
                  <item.icon className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] text-[#334155]">
                      {item.label}
                    </div>
                    <div className="font-mono text-xs font-bold text-[#0F172A]">
                      {item.val}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* D. Section 02: Core Solutions & Divisions (#solutions) */}
        <DivisionsSection onNavigate={scrollToSection} />

        {/* E. Section 03: Flagship Case Studies / Deployed Products (#projects) */}
        <CaseStudiesSection />

        {/* F. Section 04: The Mungkas Lab Architecture / Tech Stack (#stack) */}
        <ArchitectureSection />

        {/* G. Interactive Lab ROI / Efficiency Estimator */}
        <RoiEstimatorSection onNavigate={scrollToSection} />
      </main>

      {/* H. Section 05: Initiate Collaboration / Contact & Footer (#contact) */}
      <ContactFooterSection onNavigate={scrollToSection} />
    </div>
  );
}

export default App;
