# Role & Objective
Act as a Principal Frontend Engineer and UI/UX Architect. Build a complete, production-ready, highly interactive, single-page corporate portfolio website for **"Mungkas Lab"** — a premier AI R&D and enterprise automation company specializing exclusively in Biotechnology, Microbiology Laboratories, and Clinical Operations.

The website must be written entirely in **English**, featuring a prestigious "Organic Intelligence & Clinical Precision" aesthetic (reminiscent of Anthropic, Ginkgo Bioworks, and Stripe).

---

# 1. Tech Stack & Setup Specifications
- **Framework:** Next.js (App Router) or React (Vite) with TypeScript (use whichever is initialized in the current workspace, or initialize a clean React + Tailwind + Lucide React + Framer Motion setup).
- **Styling:** Tailwind CSS.
- **Icons:** `lucide-react` (use scientific, computational, and structural icons like `Microscope`, `Cpu`, `Workflow`, `Database`, `Activity`, `Dna`, `ShieldCheck`, `Terminal`, `ArrowUpRight`).
- **Animations:** `framer-motion` for smooth scroll reveals, interactive tab switching, number counters, and subtle telemetry animations.
- **No Missing Assets:** Do NOT use broken external image URLs. For visual showcases, construct sleek **CSS/SVG-based interactive UI mockups, data telemetry cards, live terminal simulations, and petri-dish radar grids** directly in code.

---

# 2. Strict Color Palette (3-Color System)
Configure and strictly enforce these exact hex codes across the entire application:
1. **Primary (Background & Canvas):** `#F4F4F0` (Warm Lab Bone) — Use for the main background. Utilize `#EAEAE4` for secondary surface cards and subtle section dividers.
2. **Secondary (Typography, Structure & Dark Contrast Cards):** `#0F172A` (Deep Slate) — Use for primary headings, crisp 1px structural borders (`border-[#0F172A]/10`), and high-contrast inverted sections/cards. Use `#334155` for muted body text.
3. **Accent (Highlight, Telemetry & Interactive States):** `#0D9488` (Deep Clinical Teal) — Use for primary CTAs, active tabs, live status indicators, data chart highlights, and badge accents. Hover state: `#0F766E`.

---

# 3. Typography & Visual Aesthetic
- **Design Language:** Technical editorial grid with crisp `1px solid` hairline borders (`rgba(15, 23, 42, 0.12)`), exposed technical metadata (e.g., `SYS_STATUS: ONLINE`, `LATENCY: 14ms`, `ISO/IEC-17025 COMPLIANT`), and clean whitespace.
- **Fonts:**
  - Headings: `Space Grotesk` or `Inter` (tight tracking, semi-bold).
  - Body: `Inter` or `Plus Jakarta Sans`.
  - Technical Data / Metrics / Code: `JetBrains Mono` (use `font-mono` for all numbers, coordinates, IDs, and badges).

---

# 4. Single-Page Architecture & Section Specifications

## A. Sticky Navigation Bar
- Glassmorphic header (`bg-[#F4F4F0]/85 backdrop-blur-md border-b border-[#0F172A]/10`).
- **Left:** Brand Logo (`MUNGKAS LAB` with a geometric teal dot/DNA node icon and a small mono badge `BIO-AI R&D`).
- **Center:** Smooth-scroll anchor links: `01. About`, `02. Divisions`, `03. Case Studies`, `04. Tech Stack`.
- **Right:** Status indicator (`● LAB SYSTEMS NOMINAL` in `#0D9488`) + Primary CTA button (`Initiate Consultation` in `#0F172A` text `#F4F4F0`, hover `#0D9488`).

## B. Hero Section
- **Top Pill Badge:** `[ MUNGKAS LAB // AUTONOMOUS BIO-INTELLIGENCE ]`
- **Main Headline:** "Autonomous AI Architecture for the Modern Biotech & Microbiology Lab."
- **Sub-headline:** "We engineer intelligent multi-agent workflows, computer vision diagnostics, and automated LIMS pipelines that eliminate manual bottlenecks in wet-lab R&D and clinical operations."
- **Primary CTAs:**
  - Button 1 (Solid `#0D9488` text white): "Explore Deployed Systems" (scrolls to Case Studies).
  - Button 2 (Outline `#0F172A`): "Inspect Architecture" (scrolls to Tech Stack).
- **Right/Bottom Hero Interactive Component (Code-Built Visual):**
  Build a live, interactive **"Mungkas Bio-OS Telemetry Widget"** in dark mode (`#0F172A` card) featuring:
  - A simulated real-time Petri-Dish Computer Vision scanner grid with animated bounding boxes (`E. coli CFU: 142`, `Contamination: 0.00%`, `Confidence: 99.4%`).
  - A live scrolling terminal log showing autonomous agent actions (e.g., `[AGENT_LIMS]: Reconciling Mass-Spec batch #884A... OK`, `[CV_NODE]: Morphological segmentation complete in 38ms`).

## C. Section 01: About the Lab (`#about`)
- **Section Header:** `01 // THE CONFLUENCE OF SILICON & BIOLOGY`
- **Narrative Copy:** Explain that traditional microbiology and biotech laboratories are held back by fragmented data, manual colony counting, and error-prone spreadsheet reconciliation. Mungkas Lab bridges enterprise software engineering with wet-lab science.
- **3 Key Pillars (Bento Grid with 1px structural borders):**
  1. **Zero-Touch Wet Lab:** Automating physical observation and assay reading via edge computer vision.
  2. **Autonomous LIMS Orchestration:** Event-driven AI agents that connect lab instruments directly to cloud databases and ERP systems.
  3. **Audit-Ready Compliance:** Deterministic data pipelines engineered for FDA 21 CFR Part 11, GLP, and ISO standards.

## D. Section 02: Core Solutions & Divisions (`#solutions`)
- **Section Header:** `02 // CORE R&D DIVISIONS`
- Display an interactive 3-column or tabbed layout detailing Mungkas Lab's focus areas:
  - **Division I: Computer Vision & Microscopy AI** (Automated CFU counting, AST zone inhibition measurement, high-content cell morphology tracking).
  - **Division II: Autonomous Lab Operations & LIMS Agents** (Multi-agent orchestration for sample tracking, automated QA/QC reconciliation, and cold-chain reagent inventory).
  - **Division III: Computational R&D & Bioprocess Twin** (Predictive fermentation modeling, bioreactor telemetry anomaly detection, and automated literature/patent synthesis).

## E. Section 03: Flagship Case Studies / Deployed Products (`#projects`)
- **Section Header:** `03 // PRODUCTION CASE STUDIES & DEPLOYED SYSTEMS`
- **Interactive Feature:** Allow users to filter by tag (`All`, `Computer Vision`, `Enterprise Automation`, `Bioprocess AI`) AND click any project to view its **Architecture Flow, Real-World Problem, Solution, and Quantifiable Impact**.
- **Include these exact 5 grounded, real-world-inspired Biotech AI Projects:**

  1. **ColonySight CV — Automated Petri-Dish & AST Zone Analyzer**
     - *Category:* `Computer Vision` | `Clinical Microbiology`
     - *Real-World Inspiration:* High-throughput clinical plate readers & automated Antimicrobial Susceptibility Testing (AST).
     - *The Challenge:* Microbiologists spent 4+ hours daily manually counting Colony Forming Units (CFUs) and measuring antibiotic inhibition zones with calipers, leading to inter-operator variance.
     - *Mungkas Lab Solution:* Engineered an edge-deployed vision pipeline using fine-tuned YOLOv8/SAM segmentation under telecentric lighting to count mixed-culture colonies and measure Kirby-Bauer inhibition zones down to sub-millimeter precision.
     - *Key Metrics:* `99.2% Concordance with Senior Microbiologists` | `12x Faster Plate Turnaround` | `Zero Manual Entry Errors`
     - *Tech Tags:* `PyTorch`, `OpenCV`, `FastAPI`, `Edge TensorRT`, `PostgreSQL`

  2. **AutoLIMS Nexus — Multi-Agent Lab Data Reconciliation & Compliance Engine**
     - *Category:* `Enterprise Automation` | `Data Engineering`
     - *Real-World Inspiration:* Automated LIMS-to-ERP reconciliation and audit-trail generation in pharmaceutical QC labs.
     - *The Challenge:* A regional diagnostics network suffered from fragmented data across legacy HPLC/PCR machines, SQL databases, and manual Excel QC sheets, delaying batch release by 48 hours.
     - *Mungkas Lab Solution:* Deployed an event-driven multi-agent automation pipeline (powered by n8n, custom Python microservices, and LLM document parsers) that ingests raw instrument outputs, cross-verifies calibration logs, flags out-of-spec anomalies, and auto-generates regulatory PDF certificates.
     - *Key Metrics:* `85% Reduction in QA/QC Reconciliation Time` | `100% Automated Audit Trail` | `15,000+ Samples Processed/Week`
     - *Tech Tags:* `Python`, `n8n Workflows`, `LLM Agents`, `SQL Server`, `Docker`

  3. **FermentIQ — Predictive Bioreactor Telemetry & Anomaly Detection**
     - *Category:* `Bioprocess AI` | `IoT Telemetry`
     - *Real-World Inspiration:* Industrial precision fermentation monitoring and digital twins.
     - *The Challenge:* Batch contamination and dissolved oxygen (DO) drift in 500L microbial fermentation tanks were only detected post-run, costing tens of thousands of dollars in ruined media.
     - *Mungkas Lab Solution:* Built a real-time time-series anomaly detection engine ingesting pH, DO, agitation, and off-gas spectrometry streams. Recommends closed-loop nutrient feed adjustments 4 hours before metabolic crash occurs.
     - *Key Metrics:* `22% Increase in Biomass Yield` | `94% Early Contamination Detection` | `<50ms Telemetry Latency`
     - *Tech Tags:* `TimescaleDB`, `FastAPI`, `Scikit-Learn`, `MQTT`, `React Telemetry UI`

  4. **PathoSeq Auto-Pipeline — Automated Metagenomic NGS Triage Workflow**
     - *Category:* `Bioinformatics Automation` | `Cloud R&D`
     - *Real-World Inspiration:* Automated pathogen identification and resistance gene calling from Nanopore/Illumina sequencing reads.
     - *The Challenge:* Wet-lab researchers struggled with complex CLI bioinformatics tools to process raw FASTQ files for hospital pathogen surveillance.
     - *Mungkas Lab Solution:* Created a zero-CLI, automated cloud orchestration pipeline triggered automatically upon sequencer run completion. Executes quality trimming, taxonomic classification, and antibiotic resistance gene (ARG) mapping, delivering an executive dashboard report.
     - *Key Metrics:* `From Raw FASTQ to Clinical Report in 18 Mins` | `Zero CLI Intervention Required` | `Automated Resistance Profiling`
     - *Tech Tags:* `Nextflow`, `AWS Batch`, `Python`, `Docker`, `Next.js`

  5. **BioChain Cold-Guard — Autonomous Reagent Inventory & Cold-Chain Sentinel**
     - *Category:* `Enterprise Automation` | `Lab Operations`
     - *Real-World Inspiration:* Automated ultra-low temperature (-80°C) freezer monitoring and predictive reagent procurement.
     - *The Challenge:* Expired PCR master mixes, unlogged sample thawing, and stockouts of critical microbiological media caused recurring R&D halts.
     - *Mungkas Lab Solution:* Integrated IoT thermal sensors with an autonomous procurement agent that tracks lot expiration dates, predicts burn-rate of lab consumables based on scheduled assays, and automatically drafts purchase orders in the ERP before stock hits safety thresholds.
     - *Key Metrics:* `$42K/Year Saved in Spoiled Reagents` | `0 Stockout Incidents` | `24/7 Automated Thermal Escalation`
     - *Tech Tags:* `Node.js / NestJS`, `Python`, `Webhook Automation`, `REST APIs`, `Redis`

## F. Section 04: The Mungkas Lab Architecture / Tech Stack (`#stack`)
- **Section Header:** `04 // ENGINEERING & SCIENTIFIC STACK`
- Design an interactive **"System Architecture Diagram"** or structured 4-layer matrix showing how Mungkas Lab builds solutions:
  - **Layer 1: Wet-Lab & Edge Ingestion:** Microscopy Optics, IoT Biosensors, HL7/ASTM Instrument Parsers,DICOM/TIFF Streams.
  - **Layer 2: AI & Computational Core:** PyTorch, OpenCV, Autonomous LLM Agents, Time-Series Forecasting, Biopython.
  - **Layer 3: Orchestration & Backend:** Python (FastAPI), Node.js (NestJS), n8n Enterprise Workflows, Docker, SQL Server / PostgreSQL.
  - **Layer 4: Interface & Compliance:** Next.js, Tailwind CSS, Real-Time Telemetry Dashboards, Automated Audit Logs.

## G. Interactive Lab ROI / Efficiency Estimator (Bonus Engagement Widget)
- Include a sleek, interactive calculator card on the page where visitors can toggle:
  - *Lab Type:* Clinical Microbiology / Biotech R&D / Pharma QC
  - *Daily Sample Volume Slider:* 50 to 5,000 samples/day
- Dynamically calculates estimated **Hours Saved/Month**, **Error Reduction %**, and **Throughput Multiplier** using `#0D9488` accent highlights.

## H. Section 05: Initiate Collaboration / Contact & Footer (`#contact`)
- High-contrast dark card (`bg-[#0F172A] text-[#F4F4F0]`) to anchor the bottom of the page.
- **Headline:** "Ready to Automate Your Laboratory Infrastructure?"
- **Interactive Terminal-Style Inquiry Form:**
  - Fields: `Researcher / Executive Name`, `Organization / Lab Name`, `Target Focus Area` (Dropdown: *Computer Vision Microscopy*, *LIMS & Workflow Automation*, *Bioprocess AI*, *Custom R&D*), and `Project Parameters (Message)`.
  - Submit button with interactive state (`Transmit Specification -> Specification Received [REF_ID: ML-2026]`).
- **Footer:**
  - Disclaimer badge for portfolio authenticity: *"Mungkas Lab — Conceptual AI & Biotech Automation Architecture Showcase."*
  - Quick links, system status (`ALL NODES OPERATIONAL`), and copyright.

---

# 5. Execution Guidelines for the Coding Agent
1. **Completeness:** Write all components, mock data arrays (for the 5 projects), interactive states, and styling completely. Never leave `// TODO` or placeholder text.
2. **Interactivity:** Ensure the project filters, project detail modal/drawer, ROI calculator slider, and simulated live lab telemetry in the Hero section actually work and respond to user clicks.
3. **Responsive Design:** Ensure flawless layout on both Desktop (multi-column technical grids) and Mobile (clean stacked cards).