export type ProjectCategory =
  | 'All'
  | 'Computer Vision'
  | 'Enterprise Automation'
  | 'Bioprocess AI';

export interface ArchitectureStep {
  node: string;
  title: string;
  detail: string;
  latency: string;
}

export interface CaseStudyProject {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  filterCategory: Exclude<ProjectCategory, 'All'>;
  categoryBadges: string[];
  inspiration: string;
  challenge: string;
  solution: string;
  metrics: {
    value: string;
    label: string;
  }[];
  techTags: string[];
  complianceBadge: string;
  architectureFlow: ArchitectureStep[];
  telemetrySnapshot: {
    parameter: string;
    reading: string;
    status: string;
  }[];
}

export const CASE_STUDIES: CaseStudyProject[] = [
  {
    id: 'colonysight-cv',
    code: 'SYS_DEP_01',
    title: 'ColonySight CV — Automated Petri-Dish & AST Zone Analyzer',
    subtitle: 'Sub-millimeter morphological colony segmentation & Kirby-Bauer inhibition profiling',
    filterCategory: 'Computer Vision',
    categoryBadges: ['Computer Vision', 'Clinical Microbiology'],
    inspiration: 'High-throughput clinical plate readers & automated Antimicrobial Susceptibility Testing (AST).',
    challenge:
      'Microbiologists spent 4+ hours daily manually counting Colony Forming Units (CFUs) and measuring antibiotic inhibition zones with calipers, leading to inter-operator variance.',
    solution:
      'Engineered an edge-deployed vision pipeline using fine-tuned YOLOv8/SAM segmentation under telecentric lighting to count mixed-culture colonies and measure Kirby-Bauer inhibition zones down to sub-millimeter precision.',
    metrics: [
      { value: '99.2%', label: 'Concordance with Senior Microbiologists' },
      { value: '12x', label: 'Faster Plate Turnaround' },
      { value: '0.00%', label: 'Manual Entry Errors' },
    ],
    techTags: ['PyTorch', 'OpenCV', 'FastAPI', 'Edge TensorRT', 'PostgreSQL'],
    complianceBadge: 'CLSI M100 & ISO-15189 VALIDATED',
    architectureFlow: [
      {
        node: 'STAGE_01 // OPTICS',
        title: 'Telecentric Darkfield Capture',
        detail: '12MP global-shutter CMOS sensor captures chromatic & blood agar plates under coaxial LED ring illumination.',
        latency: '8ms',
      },
      {
        node: 'STAGE_02 // SEGMENTATION',
        title: 'YOLOv8x + SAM Edge TensorRT',
        detail: 'De-clusters overlapping mixed-flora CFUs and computes radial Kirby-Bauer inhibition diameters.',
        latency: '24ms',
      },
      {
        node: 'STAGE_03 // CLSI ENGINE',
        title: 'Breakpoint Susceptibility Mapping',
        detail: 'Cross-references zone diameters (mm) against CLSI M100 MIC tables to classify S / I / R phenotypes.',
        latency: '4ms',
      },
      {
        node: 'STAGE_04 // LIMS COMMIT',
        title: 'HL7 / PostgreSQL Audit Dispatch',
        detail: 'Writes signed segmentation masks and colony telemetry directly into clinical LIMS with zero human transcription.',
        latency: '6ms',
      },
    ],
    telemetrySnapshot: [
      { parameter: 'MEAN_RADIAL_PRECISION', reading: '±0.08 mm', status: 'NOMINAL' },
      { parameter: 'INFERENCE_LATENCY', reading: '38.4 ms/plate', status: 'OPTIMAL' },
      { parameter: 'MIXED_FLORA_RECALL', reading: '99.42%', status: 'VERIFIED' },
    ],
  },
  {
    id: 'autolims-nexus',
    code: 'SYS_DEP_02',
    title: 'AutoLIMS Nexus — Multi-Agent Lab Data Reconciliation & Compliance Engine',
    subtitle: 'Autonomous LIMS-to-ERP verification and regulatory certificate synthesis',
    filterCategory: 'Enterprise Automation',
    categoryBadges: ['Enterprise Automation', 'Data Engineering'],
    inspiration: 'Automated LIMS-to-ERP reconciliation and audit-trail generation in pharmaceutical QC labs.',
    challenge:
      'A regional diagnostics network suffered from fragmented data across legacy HPLC/PCR machines, SQL databases, and manual Excel QC sheets, delaying batch release by 48 hours.',
    solution:
      'Deployed an event-driven multi-agent automation pipeline (powered by n8n, custom Python microservices, and LLM document parsers) that ingests raw instrument outputs, cross-verifies calibration logs, flags out-of-spec anomalies, and auto-generates regulatory PDF certificates.',
    metrics: [
      { value: '85%', label: 'Reduction in QA/QC Reconciliation Time' },
      { value: '100%', label: 'Automated Audit Trail' },
      { value: '15,000+', label: 'Samples Processed/Week' },
    ],
    techTags: ['Python', 'n8n Workflows', 'LLM Agents', 'SQL Server', 'Docker'],
    complianceBadge: 'FDA 21 CFR PART 11 COMPLIANT',
    architectureFlow: [
      {
        node: 'STAGE_01 // INGESTION',
        title: 'ASTM / HL7 & Raw HPLC Watchers',
        detail: 'File-system & serial daemon listeners capture raw chromatograms, qPCR Ct curves, and balance logs.',
        latency: '12ms',
      },
      {
        node: 'STAGE_02 // AGENT VERIFICATION',
        title: 'Multi-Agent Calibration & Spec Check',
        detail: 'Deterministic Python validators + LLM parsers cross-verify reagent lot IDs and pipette calibration timestamps.',
        latency: '110ms',
      },
      {
        node: 'STAGE_03 // ANOMALY TRIAGE',
        title: 'Out-of-Specification (OOS) Sentinel',
        detail: 'Flags Westgard rule violations and routes variance packets to Lead QA Officer with cryptographic hash.',
        latency: '19ms',
      },
      {
        node: 'STAGE_04 // COA SYNTHESIS',
        title: 'ERP Sync & CoA PDF Generation',
        detail: 'Commits reconciled batch records to SQL Server ERP and issues tamper-evident Certificate of Analysis.',
        latency: '45ms',
      },
    ],
    telemetrySnapshot: [
      { parameter: 'BATCH_RELEASE_WINDOW', reading: '4.2 hrs (was 48h)', status: 'ACCELERATED' },
      { parameter: 'HASH_CHAIN_INTEGRITY', reading: 'SHA-256 VERIFIED', status: 'LOCKED' },
      { parameter: 'WEEKLY_SAMPLE_THROUGHPUT', reading: '15,420 units', status: 'NOMINAL' },
    ],
  },
  {
    id: 'fermentiq',
    code: 'SYS_DEP_03',
    title: 'FermentIQ — Predictive Bioreactor Telemetry & Anomaly Detection',
    subtitle: 'Digital twin time-series forecasting for 500L microbial fermentation vessels',
    filterCategory: 'Bioprocess AI',
    categoryBadges: ['Bioprocess AI', 'IoT Telemetry'],
    inspiration: 'Industrial precision fermentation monitoring and digital twins.',
    challenge:
      'Batch contamination and dissolved oxygen (DO) drift in 500L microbial fermentation tanks were only detected post-run, costing tens of thousands of dollars in ruined media.',
    solution:
      'Built a real-time time-series anomaly detection engine ingesting pH, DO, agitation, and off-gas spectrometry streams. Recommends closed-loop nutrient feed adjustments 4 hours before metabolic crash occurs.',
    metrics: [
      { value: '+22%', label: 'Increase in Biomass Yield' },
      { value: '94%', label: 'Early Contamination Detection' },
      { value: '<50ms', label: 'Telemetry Latency' },
    ],
    techTags: ['TimescaleDB', 'FastAPI', 'Scikit-Learn', 'MQTT', 'React Telemetry UI'],
    complianceBadge: 'GAMP-5 BIOPROCESS VALIDATED',
    architectureFlow: [
      {
        node: 'STAGE_01 // MQTT BROKER',
        title: 'High-Frequency PLC Sensor Stream',
        detail: 'Ingests 10Hz telemetry for Dissolved Oxygen (DO), pH, impeller RPM, substrate feed rate, and off-gas CO2/O2.',
        latency: '9ms',
      },
      {
        node: 'STAGE_02 // TIMESCALEDB',
        title: 'Hypertable Sliding-Window Store',
        detail: 'Continuous aggregates compute rolling respiratory quotient (RQ) and specific growth rate (μ) derivatives.',
        latency: '14ms',
      },
      {
        node: 'STAGE_03 // DIGITAL TWIN',
        title: 'Monod-Kinetic + Isolation Forest Model',
        detail: 'Detects phage/bacterial contamination signatures and dissolved oxygen drift 4 hours prior to crash.',
        latency: '18ms',
      },
      {
        node: 'STAGE_04 // CLOSED-LOOP',
        title: 'PID Feed-Rate Advisory Dispatch',
        detail: 'Pushes optimal glucose/ammonia bolus setpoints to operator SCADA console and bioreactor PLC.',
        latency: '7ms',
      },
    ],
    telemetrySnapshot: [
      { parameter: 'PREDICTIVE_HORIZON', reading: 'T-240 mins lead', status: 'ACTIVE' },
      { parameter: 'DISSOLVED_O2_STABILITY', reading: '34.8% ± 0.3%', status: 'LOCKED' },
      { parameter: 'STREAM_LATENCY_P99', reading: '42.1 ms', status: 'NOMINAL' },
    ],
  },
  {
    id: 'pathoseq-pipeline',
    code: 'SYS_DEP_04',
    title: 'PathoSeq Auto-Pipeline — Automated Metagenomic NGS Triage Workflow',
    subtitle: 'Zero-CLI Nanopore/Illumina FASTQ pathogen surveillance & resistance gene calling',
    filterCategory: 'Bioprocess AI',
    categoryBadges: ['Bioinformatics Automation', 'Cloud R&D'],
    inspiration: 'Automated pathogen identification and resistance gene calling from Nanopore/Illumina sequencing reads.',
    challenge:
      'Wet-lab researchers struggled with complex CLI bioinformatics tools to process raw FASTQ files for hospital pathogen surveillance.',
    solution:
      'Created a zero-CLI, automated cloud orchestration pipeline triggered automatically upon sequencer run completion. Executes quality trimming, taxonomic classification, and antibiotic resistance gene (ARG) mapping, delivering an executive dashboard report.',
    metrics: [
      { value: '18 Mins', label: 'From Raw FASTQ to Clinical Report' },
      { value: 'Zero CLI', label: 'Manual Intervention Required' },
      { value: '100%', label: 'Automated Resistance Profiling' },
    ],
    techTags: ['Nextflow', 'AWS Batch', 'Python', 'Docker', 'Next.js'],
    complianceBadge: 'ISO/IEC-17025 BIOINFORMATICS PIPELINE',
    architectureFlow: [
      {
        node: 'STAGE_01 // SEQUENCER HOOK',
        title: 'Run-Complete S3 Event Trigger',
        detail: 'Detects demultiplexed FASTQ output from Illumina MiSeq / Oxford Nanopore GridION and verifies MD5 checksums.',
        latency: '2.1s',
      },
      {
        node: 'STAGE_02 // NEXTFLOW DAG',
        title: 'Containerized QC & Host Depletion',
        detail: 'Spins up ephemeral AWS Batch Docker workers for Fastp trimming and human GRCh38 host-read subtraction.',
        latency: '5.4m',
      },
      {
        node: 'STAGE_03 // TAXONOMY & ARG',
        title: 'Kraken2 + CARD Resistance Alignment',
        detail: 'Maps microbial k-mers and screens contigs against Comprehensive Antibiotic Resistance Database (CARD).',
        latency: '8.2m',
      },
      {
        node: 'STAGE_04 // CLINICAL REPORT',
        title: 'Interactive Phylogeny & AST Dashboard',
        detail: 'Publishes abundance matrices, mecA/blaKPC alerts, and downloadable PDF report to clinical portal.',
        latency: '2.3m',
      },
    ],
    telemetrySnapshot: [
      { parameter: 'END_TO_END_RUNTIME', reading: '17m 48s avg', status: 'OPTIMAL' },
      { parameter: 'HOST_DEPLETION_EFFICIENCY', reading: '99.94% removed', status: 'VERIFIED' },
      { parameter: 'CARD_ARG_SENSITIVITY', reading: '99.1% recall', status: 'NOMINAL' },
    ],
  },
  {
    id: 'biochain-cold-guard',
    code: 'SYS_DEP_05',
    title: 'BioChain Cold-Guard — Autonomous Reagent Inventory & Cold-Chain Sentinel',
    subtitle: 'Predictive -80°C ultra-low freezer telemetry & automated ERP procurement agent',
    filterCategory: 'Enterprise Automation',
    categoryBadges: ['Enterprise Automation', 'Lab Operations'],
    inspiration: 'Automated ultra-low temperature (-80°C) freezer monitoring and predictive reagent procurement.',
    challenge:
      'Expired PCR master mixes, unlogged sample thawing, and stockouts of critical microbiological media caused recurring R&D halts.',
    solution:
      'Integrated IoT thermal sensors with an autonomous procurement agent that tracks lot expiration dates, predicts burn-rate of lab consumables based on scheduled assays, and automatically drafts purchase orders in the ERP before stock hits safety thresholds.',
    metrics: [
      { value: '$42K/Yr', label: 'Saved in Spoiled Reagents' },
      { value: '0', label: 'Stockout Incidents' },
      { value: '24/7', label: 'Automated Thermal Escalation' },
    ],
    techTags: ['Node.js / NestJS', 'Python', 'Webhook Automation', 'REST APIs', 'Redis'],
    complianceBadge: 'GLP COLD-CHAIN CERTIFIED',
    architectureFlow: [
      {
        node: 'STAGE_01 // THERMAL MESH',
        title: 'PT100 Cryo-Probes & Barcode Gates',
        detail: 'Monitors -80°C ULT freezers, -20°C enzyme chests, and 4°C media rooms with Redis time-series buffering.',
        latency: '15ms',
      },
      {
        node: 'STAGE_02 // BURN-RATE ENGINE',
        title: 'Assay-Schedule Depletion Forecaster',
        detail: 'Correlates upcoming LIMS assay calendar against current lot volumes and expiration dates.',
        latency: '32ms',
      },
      {
        node: 'STAGE_03 // PROCUREMENT AGENT',
        title: 'Autonomous Vendor PO Drafting',
        detail: 'Generates pre-approved purchase requisitions via REST API when Taq polymerase or agar stock nears safety buffer.',
        latency: '64ms',
      },
      {
        node: 'STAGE_04 // ESCALATION MATRIX',
        title: 'Multi-Channel Cryo-Excursion Alert',
        detail: 'Triggers instant Pager/SMS/Webhook escalation if compressor current or chamber ΔT crosses +1.5°C/10min.',
        latency: '11ms',
      },
    ],
    telemetrySnapshot: [
      { parameter: 'ULT_CHAMBER_AVG', reading: '-80.4 °C', status: 'LOCKED' },
      { parameter: 'STOCKOUT_INCIDENTS_YTD', reading: '0 events', status: 'NOMINAL' },
      { parameter: 'ANNUAL_REAGENT_SAVINGS', reading: '$42,850 USD', status: 'VERIFIED' },
    ],
  },
];
