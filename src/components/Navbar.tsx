import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Dna, ArrowUpRight, Menu, X, Terminal } from 'lucide-react';
import { usePrefersReducedMotion } from './ui';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { label: '01. About', target: 'about' },
  { label: '02. Divisions', target: 'solutions' },
  { label: '03. Case Studies', target: 'projects' },
  { label: '04. Tech Stack', target: 'stack' },
] as const;

const SECTION_IDS = ['about', 'solutions', 'projects', 'stack', 'contact'];

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      let current = '';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (target: string) => {
    setMobileMenuOpen(false);
    onNavigate(target);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F4F4F0]/85 backdrop-blur-md border-b border-[#0F172A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
          }}
          className="flex items-center gap-3 group cursor-pointer p-1 rounded-sm"
        >
          <div className="relative w-10 h-10 bg-[#0F172A] text-[#F4F4F0] flex items-center justify-center border border-[#0F172A]">
            <Dna className="w-5 h-5 text-[#0D9488] transition-transform duration-300 group-hover:rotate-45" />
            <span
              className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#0D9488] border border-[#F4F4F0] soft-pulse"
              aria-hidden="true"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold tracking-tight text-lg text-[#0F172A] leading-none">
                MUNGKAS LAB
              </span>
              <span className="font-mono text-[10px] font-medium px-1.5 py-0.5 bg-[#EAEAE4] text-[#0D9488] border border-[#0F172A]/15 tracking-wider">
                BIO-AI R&amp;D
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#334155] tracking-widest mt-1">
              SYS_NODE // ID-JKT-04
            </span>
          </div>
        </a>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <button
                key={item.target}
                type="button"
                onClick={() => handleLinkClick(item.target)}
                aria-current={isActive ? 'true' : undefined}
                className={`cursor-pointer font-mono text-xs px-3.5 py-2 transition-colors duration-200 border ${
                  isActive
                    ? 'bg-[#EAEAE4] text-[#0D9488] border-[#0F172A]/15 font-semibold'
                    : 'text-[#334155] border-transparent hover:text-[#0F172A] hover:bg-[#EAEAE4]/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <div
            className="flex items-center gap-2 px-3 py-1.5 bg-[#EAEAE4] border border-[#0F172A]/10"
            role="status"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              {!reduced && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0D9488] opacity-75" />
              )}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0D9488]" />
            </span>
            <span className="font-mono text-[11px] font-medium text-[#0D9488] tracking-wider">
              LAB SYSTEMS NOMINAL
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className="cursor-pointer inline-flex items-center gap-2 bg-[#0F172A] text-[#F4F4F0] hover:bg-[#0D9488] active:bg-[#0F766E] px-4 py-2.5 text-xs font-mono font-medium tracking-wider uppercase transition-colors duration-200 rounded-sm"
          >
            <span>Initiate Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="cursor-pointer p-2.5 bg-[#EAEAE4] border border-[#0F172A]/15 text-[#0F172A] hover:bg-[#0D9488] hover:text-[#F4F4F0] transition-colors rounded-sm"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={reduced ? undefined : { height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-[#F4F4F0] border-b border-[#0F172A]/15"
          >
            <div className="px-4 pt-3 pb-6 space-y-3">
              <div className="flex items-center justify-between px-3 py-2 bg-[#EAEAE4] border border-[#0F172A]/10">
                <span className="font-mono text-[11px] font-medium text-[#0D9488]">
                  ● LAB SYSTEMS NOMINAL
                </span>
                <span className="font-mono text-[11px] text-[#334155]">LATENCY: 14ms</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.target}
                    type="button"
                    onClick={() => handleLinkClick(item.target)}
                    className="cursor-pointer w-full text-left font-mono text-xs px-3 py-3 bg-[#EAEAE4]/60 hover:bg-[#EAEAE4] text-[#0F172A] border border-[#0F172A]/10 flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0D9488]" aria-hidden="true" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleLinkClick('contact')}
                className="cursor-pointer w-full flex items-center justify-center gap-2 bg-[#0F172A] text-[#F4F4F0] hover:bg-[#0D9488] py-3 text-xs font-mono font-medium uppercase tracking-wider transition-colors"
              >
                <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Initiate Consultation</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
