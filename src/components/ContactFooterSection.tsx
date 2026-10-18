import React, { useState } from 'react';
import {
  Terminal,
  CheckCircle2,
  Dna,
  ShieldCheck,
  ArrowUpRight,
  Send,
  RotateCcw,
} from 'lucide-react';
import { Reveal, usePrefersReducedMotion } from './ui';

const FOCUS_OPTIONS = [
  'Computer Vision Microscopy',
  'LIMS & Workflow Automation',
  'Bioprocess AI',
  'Custom R&D',
] as const;

const FIELD_CLASS =
  'w-full px-4 py-3 bg-[#0F172A] border border-[#F4F4F0]/25 text-[#F4F4F0] placeholder-[#F4F4F0]/35 font-mono text-sm focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]';

const LABEL_CLASS = 'block font-mono text-xs uppercase tracking-wider text-[#F4F4F0]/85 mb-2';

export const ContactFooterSection: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [focusArea, setFocusArea] = useState<string>(FOCUS_OPTIONS[0]);
  const [parameters, setParameters] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const reduced = usePrefersReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !organization.trim()) {
      setErrorMessage('ERR_VALIDATION: Please provide Researcher/Executive Name and Organization/Lab Name.');
      return;
    }
    setErrorMessage('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setOrganization('');
    setFocusArea(FOCUS_OPTIONS[0]);
    setParameters('');
    setSubmitted(false);
    setErrorMessage('');
  };

  return (
    <footer id="contact" className="bg-[#0F172A] text-[#F4F4F0] pt-20 pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#F4F4F0]/15">
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#0D9488] mb-3">
                <span className="w-2 h-2 bg-[#0D9488]" aria-hidden="true" />
                <span>05 // INITIATE COLLABORATION</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#F4F4F0] tracking-tight text-balance">
                Ready to Automate Your Laboratory Infrastructure?
              </h2>
              <p className="text-[#F4F4F0]/75 mt-4 leading-relaxed text-sm sm:text-base">
                Transmit your wet-lab instrument topology, LIMS bottleneck, or microscopy assay parameters. Our
                Principal AI Architects and Bioprocess Engineers respond within 24 hours with a deterministic
                technical scoping brief.
              </p>
            </Reveal>

            <div className="space-y-3">
              <div className="p-4 border border-[#F4F4F0]/15 bg-[#F4F4F0]/[0.03]">
                <div className="font-mono text-xs text-[#0D9488] font-semibold">01 // ON-PREM &amp; AIR-GAPPED DEPLOYMENT</div>
                <p className="text-xs text-[#F4F4F0]/75 mt-1">
                  Full support for local TensorRT edge inference and private SQL/PostgreSQL instances with zero
                  external clinical data egress.
                </p>
              </div>
              <div className="p-4 border border-[#F4F4F0]/15 bg-[#F4F4F0]/[0.03]">
                <div className="font-mono text-xs text-[#0D9488] font-semibold">02 // REGULATORY VALIDATION PACKAGES</div>
                <p className="text-xs text-[#F4F4F0]/75 mt-1">
                  Delivered with IQ/OQ/PQ validation documentation aligned with FDA 21 CFR Part 11, ISO/IEC 17025,
                  and CLSI guidelines.
                </p>
              </div>
            </div>

            <div className="font-mono text-xs text-[#F4F4F0]/60 flex items-center justify-between pt-2 border-t border-[#F4F4F0]/10">
              <span>DIRECT DISPATCH CHANNEL:</span>
              <span className="text-[#0D9488]">ARCH@MUNGKASLAB.BIO</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-[#F4F4F0]/20 bg-[#F4F4F0]/[0.02]">
              <div className="px-5 py-3.5 bg-[#F4F4F0]/[0.05] border-b border-[#F4F4F0]/15 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-[#0D9488]" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold text-[#F4F4F0]">
                    MUNGKAS_TERMINAL // SPECIFICATION_DISPATCH.SH
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#0D9488]">TLS_1.3_ENCRYPTED</span>
              </div>

              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5" noValidate>
                {errorMessage && (
                  <div role="alert" className="p-3 bg-[#0F172A] border border-[#0D9488] font-mono text-xs text-[#0D9488]">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="researcher-name" className={LABEL_CLASS}>
                      Researcher / Executive Name *
                    </label>
                    <input
                      id="researcher-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. Elena Vance, PhD"
                      aria-invalid={errorMessage ? true : undefined}
                      className={FIELD_CLASS}
                    />
                  </div>
                  <div>
                    <label htmlFor="organization-name" className={LABEL_CLASS}>
                      Organization / Lab Name *
                    </label>
                    <input
                      id="organization-name"
                      type="text"
                      required
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Apex Clinical Microbiology"
                      aria-invalid={errorMessage ? true : undefined}
                      className={FIELD_CLASS}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="target-focus-area" className={LABEL_CLASS}>
                    Target Focus Area
                  </label>
                  <select
                    id="target-focus-area"
                    value={focusArea}
                    onChange={(e) => setFocusArea(e.target.value)}
                    className={`${FIELD_CLASS} cursor-pointer`}
                  >
                    {FOCUS_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="project-parameters" className={LABEL_CLASS}>
                    Project Parameters (Message)
                  </label>
                  <textarea
                    id="project-parameters"
                    rows={4}
                    value={parameters}
                    onChange={(e) => setParameters(e.target.value)}
                    placeholder="Specify target instruments (HPLC, Vitek, Nanopore), daily plate throughput, or LIMS integration goals..."
                    className={FIELD_CLASS}
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    className={`cursor-pointer inline-flex items-center justify-center gap-2.5 px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
                      submitted ? 'bg-[#0D9488] text-[#F4F4F0]' : 'bg-[#0D9488] hover:bg-[#0F766E] text-[#F4F4F0]'
                    }`}
                  >
                    {submitted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                        <span>Specification Received [REF_ID: ML-2026]</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden="true" />
                        <span>Transmit Specification</span>
                      </>
                    )}
                  </button>

                  {submitted && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="cursor-pointer inline-flex items-center justify-center gap-1.5 font-mono text-xs text-[#F4F4F0]/70 hover:text-[#0D9488] transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>New Transmission</span>
                    </button>
                  )}
                </div>

                {submitted && (
                  <Reveal
                    className="p-4 border border-[#0D9488] bg-[#0D9488]/10 font-mono text-xs text-[#F4F4F0] space-y-1"
                  >
                    <div className="text-[#0D9488] font-semibold">&gt; ACK_PACKET_COMMITTED // REF_ID: ML-2026</div>
                    <div>&gt; PRINCIPAL_LEAD: Assigned to {focusArea} Architecture Unit</div>
                    <div>&gt; ENTITY: {organization} ({name})</div>
                  </Reveal>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="pt-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#0D9488] text-[#0F172A] flex items-center justify-center" aria-hidden="true">
                <Dna className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold tracking-tight text-base text-[#F4F4F0]">MUNGKAS LAB</span>
            </div>
            <div className="px-3 py-1.5 border border-[#F4F4F0]/20 bg-[#F4F4F0]/[0.04] font-mono text-xs text-[#F4F4F0]/85">
              Mungkas Lab — Conceptual AI &amp; Biotech Automation Architecture Showcase.
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-6 font-mono text-xs">
            <button type="button" onClick={() => onNavigate('about')} className="cursor-pointer text-[#F4F4F0]/70 hover:text-[#0D9488] transition-colors">
              01. About
            </button>
            <button type="button" onClick={() => onNavigate('solutions')} className="cursor-pointer text-[#F4F4F0]/70 hover:text-[#0D9488] transition-colors">
              02. Divisions
            </button>
            <button type="button" onClick={() => onNavigate('projects')} className="cursor-pointer text-[#F4F4F0]/70 hover:text-[#0D9488] transition-colors">
              03. Case Studies
            </button>
            <button type="button" onClick={() => onNavigate('stack')} className="cursor-pointer text-[#F4F4F0]/70 hover:text-[#0D9488] transition-colors">
              04. Tech Stack
            </button>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-[#F4F4F0]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#F4F4F0]/60">
          <div className="flex items-center gap-2 text-[#0D9488]">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>SYS_STATUS: ALL NODES OPERATIONAL // ISO/IEC-17025</span>
          </div>
          <div className="flex items-center gap-4">
            <span>&copy; {new Date().getFullYear()} MUNGKAS LAB BIO-AI R&amp;D.</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
              className="cursor-pointer inline-flex items-center gap-1 text-[#F4F4F0] hover:text-[#0D9488] transition-colors"
            >
              <span>TOP</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
