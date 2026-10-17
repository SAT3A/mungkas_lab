import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Layers,
  Terminal,
  X,
  Cpu,
  Workflow,
  Activity,
} from 'lucide-react';
import {
  CASE_STUDIES,
  CaseStudyProject,
  ProjectFilterTag,
} from '../data/labData';

const FILTER_TAGS: ProjectFilterTag[] = [
  'All',
  'Computer Vision',
  'Enterprise Automation',
  'Bioprocess AI',
];

export const CaseStudiesSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterTag>('All');
  const [selectedProject, setSelectedProject] = useState<CaseStudyProject | null>(
    null
  );

  const filteredProjects =
    activeFilter === 'All'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((project) => project.filterCategory === activeFilter);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="py-20 lg:py-28 border-b border-[#0F172A]/10 bg-[#F4F4F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#0F172A]/10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#0D9488] mb-3">
              <span className="w-2 h-2 bg-[#0D9488]" />
              <span>03 // PRODUCTION CASE STUDIES &amp; DEPLOYED SYSTEMS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              Grounded Biotech AI &amp; Laboratory Automation Systems
            </h2>
          </div>

          {/* Interactive Tag Filter */}
          <div
            role="group"
            aria-label="Filter case studies by category"
            className="flex flex-wrap items-center gap-2"
          >
            {FILTER_TAGS.map((tag) => {
              const isActive = activeFilter === tag;
              const count =
                tag === 'All'
                  ? CASE_STUDIES.length
                  : CASE_STUDIES.filter((p) => p.filterCategory === tag).length;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveFilter(tag)}
                  className={`cursor-pointer font-mono text-xs px-3.5 py-2 border transition-colors duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488] ${
                    isActive
                      ? 'bg-[#0D9488] text-[#F4F4F0] border-[#0D9488] font-semibold'
                      : 'bg-[#EAEAE4] text-[#0F172A] border-[#0F172A]/15 hover:border-[#0D9488]'
                  }`}
                >
                  <span>{tag}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 ${
                      isActive
                        ? 'bg-[#0F172A] text-[#F4F4F0]'
                        : 'bg-[#F4F4F0] text-[#334155]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Case Study Cards Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isFeatured =
                activeFilter === 'All' && index === 0;
              return (
                <motion.article
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setSelectedProject(project)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  role="button"
                  aria-label={`Inspect architecture and case study for ${project.title}`}
                  className={`cursor-pointer group bg-[#EAEAE4] border border-[#0F172A]/15 hover:border-[#0D9488] transition-all duration-200 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488] ${
                    isFeatured ? 'lg:col-span-2' : ''
                  }`}
                >
                  {/* Card Top Metadata Bar */}
                  <div>
                    <div className="px-6 py-3 bg-[#F4F4F0] border-b border-[#0F172A]/10 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-[#0F172A]">
                          {project.code}
                        </span>
                        <span className="text-[#0F172A]/30">|</span>
                        {project.categoryBadges.map((badge) => (
                          <span
                            key={badge}
                            className="font-mono text-[11px] px-2 py-0.5 bg-[#EAEAE4] text-[#0D9488] border border-[#0F172A]/10 font-medium"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                      <div className="font-mono text-[11px] text-[#334155] flex items-center gap-2">
                        <span>{project.telemetryPreview.compliance}</span>
                        <span className="text-[#0D9488]">●</span>
                        <span>{project.telemetryPreview.latency}</span>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0F172A] group-hover:text-[#0D9488] transition-colors">
                            {project.title}
                          </h3>
                          <p className="font-mono text-xs text-[#334155] mt-1">
                            Real-World Inspiration: {project.inspiration}
                          </p>
                        </div>
                        <span className="shrink-0 w-10 h-10 bg-[#0F172A] text-[#F4F4F0] group-hover:bg-[#0D9488] flex items-center justify-center transition-colors">
                          <ArrowUpRight className="w-5 h-5" />
                        </span>
                      </div>

                      {/* Challenge & Solution 2-Column Split */}
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-[#F4F4F0] border border-[#0F172A]/10">
                          <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#334155] mb-1.5">
                            THE WET-LAB CHALLENGE
                          </div>
                          <p className="text-sm text-[#334155] leading-relaxed">
                            {project.challenge}
                          </p>
                        </div>

                        <div className="p-4 bg-[#F4F4F0] border border-[#0F172A]/10">
                          <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#0D9488] mb-1.5">
                            MUNGKAS LAB ARCHITECTURE
                          </div>
                          <p className="text-sm text-[#0F172A] leading-relaxed">
                            {project.solution}
                          </p>
                        </div>
                      </div>

                      {/* Quantifiable Impact Metrics */}
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {project.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="p-3.5 bg-[#0F172A] text-[#F4F4F0] border border-[#0F172A]"
                          >
                            <div className="font-mono text-xl font-bold text-[#0D9488]">
                              {m.value}
                            </div>
                            <div className="font-mono text-[11px] text-[#F4F4F0]/80 mt-0.5">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Tech Stack Tags + Action Trigger */}
                  <div className="px-6 py-4 bg-[#F4F4F0] border-t border-[#0F172A]/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {project.techTags.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[11px] px-2.5 py-1 bg-[#EAEAE4] text-[#0F172A] border border-[#0F172A]/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <span className="font-mono text-xs font-semibold text-[#0D9488] group-hover:text-[#0F766E] inline-flex items-center gap-1.5 uppercase">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Inspect Architecture Flow</span>
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Interactive Case Study Architecture Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-[#F4F4F0] text-[#0F172A] border-2 border-[#0F172A] shadow-2xl overflow-hidden my-8"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-[#0F172A] text-[#F4F4F0] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Terminal className="w-4 h-4 text-[#0D9488]" />
                  <span className="font-mono text-xs tracking-wider uppercase text-[#0D9488]">
                    {selectedProject.code} // SYSTEM ARCHITECTURE SPECIFICATION
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close specification modal"
                  className="cursor-pointer p-1.5 bg-[#F4F4F0]/10 text-[#F4F4F0] hover:bg-[#0D9488] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {selectedProject.categoryBadges.map((b) => (
                      <span
                        key={b}
                        className="font-mono text-xs px-2.5 py-0.5 bg-[#EAEAE4] text-[#0D9488] border border-[#0F172A]/15 font-medium"
                      >
                        {b}
                      </span>
                    ))}
                    <span className="font-mono text-xs px-2.5 py-0.5 bg-[#0F172A] text-[#F4F4F0]">
                      {selectedProject.telemetryPreview.compliance}
                    </span>
                  </div>
                  <h3
                    id="modal-project-title"
                    className="font-heading text-2xl sm:text-3xl font-bold text-[#0F172A]"
                  >
                    {selectedProject.title}
                  </h3>
                  <p className="font-mono text-xs text-[#334155] mt-1">
                    {selectedProject.inspiration}
                  </p>
                </div>

                {/* Problem & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-[#EAEAE4] border border-[#0F172A]/15">
                    <div className="font-mono text-xs font-semibold uppercase text-[#334155] mb-2">
                      01 // REAL-WORLD BOTTLENECK
                    </div>
                    <p className="text-sm text-[#0F172A] leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>
                  <div className="p-5 bg-[#EAEAE4] border border-[#0D9488]/50">
                    <div className="font-mono text-xs font-semibold uppercase text-[#0D9488] mb-2">
                      02 // MUNGKAS LAB DEPLOYED SOLUTION
                    </div>
                    <p className="text-sm text-[#0F172A] leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* 4-Stage Architecture Flow Diagram */}
                <div className="p-5 bg-[#0F172A] text-[#F4F4F0]">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F4F4F0]/15">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#0D9488]">
                      <Workflow className="w-4 h-4" />
                      <span>END-TO-END PRODUCTION DATAFLOW PIPELINE</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#F4F4F0]/70">
                      NODE: {selectedProject.telemetryPreview.unit}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {selectedProject.architectureNodes.map((node, idx) => (
                      <div
                        key={node.step}
                        className="p-3.5 bg-[#F4F4F0]/[0.04] border border-[#F4F4F0]/15 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between font-mono text-[10px] text-[#0D9488] mb-1.5">
                            <span>{node.step}</span>
                            <span>0{idx + 1}/04</span>
                          </div>
                          <div className="font-heading font-semibold text-sm text-[#F4F4F0]">
                            {node.node}
                          </div>
                          <p className="text-xs text-[#F4F4F0]/70 mt-2 leading-relaxed">
                            {node.detail}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-[#F4F4F0]/10 font-mono text-[10px] text-[#0D9488]">
                          {node.protocol}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantifiable Impact */}
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-[#334155] mb-3">
                    VERIFIED PRODUCTION METRICS:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedProject.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="p-4 bg-[#EAEAE4] border border-[#0F172A]/15 flex items-center gap-3"
                      >
                        <Activity className="w-5 h-5 text-[#0D9488] shrink-0" />
                        <div>
                          <div className="font-mono text-xl font-bold text-[#0F172A]">
                            {metric.value}
                          </div>
                          <div className="font-mono text-xs text-[#334155]">
                            {metric.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Tags & Footer */}
                <div className="pt-4 border-t border-[#0F172A]/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#0D9488]" />
                    {selectedProject.techTags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-2.5 py-1 bg-[#EAEAE4] text-[#0F172A] border border-[#0F172A]/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="cursor-pointer font-mono text-xs px-5 py-2.5 bg-[#0F172A] text-[#F4F4F0] hover:bg-[#0D9488] transition-colors uppercase tracking-wider"
                  >
                    Close Specification
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
