# Mungkas Lab — Home Page Override (`design_web.md` Strict Specification)

## Strict 3-Color System
1. **Primary (Background & Canvas):**
   - Main Canvas: `#F4F4F0` (Warm Lab Bone)
   - Secondary Surface Cards & Dividers: `#EAEAE4`
2. **Secondary (Typography, Structure & Dark Contrast Cards):**
   - Primary Headings & Dark Contrast Cards: `#0F172A` (Deep Slate)
   - Muted Body Text: `#334155`
   - Structural Borders: `1px solid rgba(15, 23, 42, 0.12)` / `border-[#0F172A]/10`
3. **Accent (Highlight, Telemetry & Interactive States):**
   - Primary Accent: `#0D9488` (Deep Clinical Teal)
   - Hover Accent: `#0F766E`

## Typography Tri-Stack
- **Headings:** `Space Grotesk` (semi-bold/bold, tight tracking)
- **Body:** `Inter`
- **Technical Data / Metrics / Coordinates / Badges:** `JetBrains Mono` (`font-mono`)

## UI/UX Pro Max Quality Rules Applied
- Visible keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-[#0D9488]`)
- `scroll-padding-top: 5rem` so sticky header never obscures focused/scrolled targets
- Touch targets >= 44x44px, `cursor-pointer` on all interactive controls
- SVG Lucide icons exclusively (`Microscope`, `Cpu`, `Workflow`, `Database`, `Activity`, `Dna`, `ShieldCheck`, `Terminal`, `ArrowUpRight`, etc.)
- `prefers-reduced-motion` support
