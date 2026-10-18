import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function usePrefersReducedMotion(): boolean {
  return useReducedMotion() ?? false;
}

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className }) => {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

interface CounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({
  value,
  duration = 1200,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}) => {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const start = performance.now();
        const from = 0;
        const to = value;

        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(from + (to - from) * eased);
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setDisplay(to);
          }
        };
        requestAnimationFrame(tick);

        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration, decimals, reduced]);

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  aside?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  eyebrow,
  title,
  description,
  aside,
}) => {
  return (
    <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#0F172A]/10">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#0D9488] mb-3">
          <span className="w-2 h-2 bg-[#0D9488] shrink-0" aria-hidden="true" />
          <span>
            {index} // {eyebrow}
          </span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight text-balance">
          {title}
        </h2>
      </div>
      {(description || aside) && (
        <div className="max-w-md space-y-3">
          {description && (
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              {description}
            </p>
          )}
          {aside}
        </div>
      )}
    </Reveal>
  );
};

export const HairRule: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`h-px bg-[#0F172A]/12 ${className ?? ''}`} aria-hidden="true" />
);

interface MeterBarProps {
  percent: number;
  className?: string;
}

export const MeterBar: React.FC<MeterBarProps> = ({ percent, className }) => {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={`h-1.5 bg-[#0D9488] ${className ?? ''}`} style={{ width: `${percent}%` }} />;
  }

  return (
    <motion.div
      className={`h-1.5 bg-[#0D9488] ${className ?? ''}`}
      initial={{ width: 0 }}
      whileInView={{ width: `${percent}%` }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    />
  );
};

export const MetadataStrip: React.FC<{ items: string[]; accentIndex?: number }> = ({
  items,
  accentIndex,
}) => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-[#334155]">
    {items.map((item, i) => (
      <React.Fragment key={item}>
        {i > 0 && <span aria-hidden="true">//</span>}
        <span className={accentIndex === i ? 'text-[#0D9488] font-semibold' : undefined}>
          {item}
        </span>
      </React.Fragment>
    ))}
  </div>
);
