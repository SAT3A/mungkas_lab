import React, { useState, useEffect } from 'react';
import { Dna, ArrowUpRight, Menu, X, Terminal } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  useEffect(() => {
    const sections = ['about', 'solutions', 'projects', 'stack', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '01. About', target: 'about' },
    { label: '02. Divisions', target: 'solutions' },
    { label: '03. Case Studies', target: 'projects' },
    { label: '04. Tech Stack', target: 'stack' },
  ];

  const handleLinkClick = (target: string) => {
    setMobileMenuOpen(false);
    onNavigate(target);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F4F4F0]/85 backdrop-blur-md border-b border-[#0F172A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488] p-1"
        >
          <div className="relative w-10 h-10 bg-[#0F172A] text-[#F4F4F0] flex items-center justify-center border border-[#0F172A]">
            <Dna className="w-5 h-5 text-[#0D9488] transition-transform duration-300 group-hover:rotate-45" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#0D9488] border border-[#F4F4F0]" />
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

        {/* Center: Smooth-scroll anchor links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <button
                key={item.target}
                type="button"
                onClick={() => handleLinkClick(item.target)}
                className={`cursor-pointer font-mono text-xs px-3.5 py-2 transition-colors duration-200 border ${
                  isActive
                    ? 'bg-[#EAEAE4] text-[#0D9488] border-[#0F172A]/15 font-medium'
                    : 'text-[#334155] border-transparent hover:text-[#0F172A] hover:bg-[#EAEAE4]/60'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488]`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Status indicator + Primary CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#EAEAE4] border border-[#0F172A]/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0D9488] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0D9488]" />
            </span>
            <span className="font-mono text-[11px] font-medium text-[#0D9488] tracking-wider">
              ● LAB SYSTEMS NOMINAL
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className="cursor-pointer inline-flex items-center gap-2 bg-[#0F172A] text-[#F4F4F0] hover:bg-[#0D9488] active:bg-[#0F766E] px-4 py-2.5 text-xs font-mono font-medium tracking-wider uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488] focus-visible:ring-offset-2"
          >
            <span>Initiate Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="cursor-pointer p-2.5 bg-[#EAEAE4] border border-[#0F172A]/15 text-[#0F172A] hover:bg-[#0D9488] hover:text-[#F4F4F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F4F4F0] border-b border-[#0F172A]/15 px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between px-3 py-2 bg-[#EAEAE4] border border-[#0F172A]/10">
            <span className="font-mono text-[11px] font-medium text-[#0D9488]">
              ● LAB SYSTEMS NOMINAL
            </span>
            <span className="font-mono text-[11px] text-[#334155]">LATENCY: 14ms</span>
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => handleLinkClick(item.target)}
                className="cursor-pointer w-full text-left font-mono text-xs px-3 py-3 bg-[#EAEAE4]/60 hover:bg-[#EAEAE4] text-[#0F172A] border border-[#0F172A]/10 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#0D9488]" />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className="cursor-pointer w-full flex items-center justify-center gap-2 bg-[#0F172A] text-[#F4F4F0] hover:bg-[#0D9488] py-3 text-xs font-mono font-medium uppercase tracking-wider transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Initiate Consultation</span>
          </button>
        </div>
      )}
    </header>
  );
};
