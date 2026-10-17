export type ProjectFilterTag =
  | 'All'
  | 'Computer Vision'
  | 'Enterprise Automation'
  | 'Bioprocess AI';

export interface CaseStudyProject {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  filterCategory: Exclude<ProjectFilterTag, 'All'>;
  categoryBadges: [string, string];
  inspiration: string;
  challenge: string;
  solution: string;
  metrics: [
    { value: string; label: string },
    { value: string; label: string },
    { value: string; label: string }
  ];
  techTags: string[];
  architectureNodes: {
    step: string;
    node: string;
    protocol: string;
    detail: string;
  }[];
  telemetryPreview: {
    unit: string;
    latency: string;
    compliance: string;
    status: string;
  };
}

export const CASE_STUDIES: CaseStudyProject[] = [
  {
    id: 'colonysight-cv',
    code: 'PRJ-01 // CV-AST',
    title: 'ColonySight CV — Automated Petri-Dish & AST Zone Analyzer',
    subtitle: 'Sub-millimeter Colony Forming Unit segmentation and Kirby-Bauer inhibition profiling',
    filterCategory: 'Computer Vision',
    categoryBadges: ['Computer Vision', 'Clinical Microbiology'],
    inspiration:
      'High-throughput clinical plate readers & automated Antimicrobial Susceptibility Testing (AST).',
    challenge:
      'Microbiologists spent 4+ hours daily manually counting Colony Forming Units (CFUs) and measuring antibiotic inhibition zones with calipers, leading to inter-operator variance.',
    solution:
      'Engineered an edge-deployed vision pipeline using fine-tuned YOLOv8/SAM segmentation under telecentric lighting to count mixed-culture colonies and measure Kirby-Bauer inhibition zones down to sub-millimeter precision.',
    metrics: [
      { value: '99.2%', label: 'Concordance with Senior Microbiologists' },
      { value: '12x', label: 'Faster Plate Turnaround' },
      { value: '0.00%', label: 'Zero Manual Entry Errors' },
    ],
    techTags: ['PyTorch', 'OpenCV', 'FastAPI', 'Edge TensorRT', 'PostgreSQL'],
    architectureNodes: [
      {
        step: '01. OPTICAL CAPTURE',
        node: 'Telecentric Darkfield Array',
        protocol: 'DICOM / 16-bit TIFF Stream',
        detail: '90mm Petri plate capture under dual-ring coaxial illumination at 42 MP resolution.',
      },
      {
        step: '02. EDGE SEGMENTATION',
        node: 'YOLOv8x + SAM Bio-Kernel',
        protocol: 'TensorRT FP16 // 24ms',
        detail: 'De-clusters overlapping colonies, classifies chromogenic media phenotypes, fits radial AST calipers.',
      },
      {
        step: '03. CLINICAL RULES ENGINE',
        node: 'CLSI / EUCAST Breakpoint Resolver',
        protocol: 'FastAPI Microservice',
        detail: 'Maps inhibition diameters (mm) against organism MIC breakpoints (S / I / R classification).',
      },
      {
        step: '04. LIMS COMMIT',
        node: 'PostgreSQL Audit Ledger',
        protocol: 'HL7 v2.5.1 / FHIR R4',
        detail: 'Writes immutable plate overlay masks and signed AST susceptibility report to clinical LIMS.',
      },
    ],
    telemetryPreview: {
      unit: 'OPTICAL_NODE_A4',
      latency: '24ms / plate',
      compliance: 'ISO-15189 / CLSI-M100',
      status: 'ACTIVE IN PRODUCTION',
    },
  },
  {
    id: 'autolims-nexus',
    code: 'PRJ-02 // LIMS-MAS',
    title: 'AutoLIMS Nexus — Multi-Agent Lab Data Reconciliation & Compliance Engine',
    subtitle: 'Autonomous instrument-to-ERP batch verification and regulatory certificate synthesis',
    filterCategory: 'Enterprise Automation',
    categoryBadges: ['Enterprise Automation', 'Data Engineering'],
    inspiration:
      'Automated LIMS-to-ERP reconciliation and audit-trail generation in pharmaceutical QC labs.',
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
    architectureNodes: [
      {
        step: '01. INSTRUMENT INGESTION',
        node: 'HPLC / RT-PCR Watchdog Daemon',
        protocol: 'ASTM E1394 / CSV / Raw Binary',
        detail: 'Captures chromatogram peaks and Ct amplification curves immediately upon instrument run completion.',
      },
      {
        step: '02. MULTI-AGENT RECONCILIATION',
        node: 'n8n + Deterministic LLM Parser',
        protocol: 'JSON-Schema Strict Validation',
        detail: 'Cross-checks pipette calibration dates, control standard R² curves, and reagent lot validity.',
      },
      {
        step: '03. ANOMALY TRIAGE',
        node: 'Out-of-Specification (OOS) Sentinel',
        protocol: 'Python Rule Engine',
        detail: 'Halts non-conforming batches and routes root-cause diagnostic packets to Lead QA Director.',
      },
      {
        step: '04. ERP & COA DISPATCH',
        node: 'SQL Server + Cryptographic PDF Signer',
        protocol: '21 CFR Part 11 e-Signature',
        detail: 'Generates Certificate of Analysis (CoA) and releases inventory lot in enterprise ERP.',
      },
    ],
    telemetryPreview: {
      unit: 'NEXUS_ORCHESTRATOR',
      latency: '1.2s / batch',
      compliance: 'FDA 21 CFR PART 11',
      status: '15,420 WK_SAMPLES',
    },
  },
  {
    id: 'fermentiq',
    code: 'PRJ-03 // BIO-TWIN',
    title: 'FermentIQ — Predictive Bioreactor Telemetry & Anomaly Detection',
    subtitle: 'Closed-loop metabolic forecasting and contamination sentinel for 500L microbial vessels',
    filterCategory: 'Bioprocess AI',
    categoryBadges: ['Bioprocess AI', 'IoT Telemetry'],
    inspiration:
      'Industrial precision fermentation monitoring and digital twins.',
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
    architectureNodes: [
      {
        step: '01. BIOREACTOR BUS',
        node: 'OPC-UA & MQTT Sensor Array',
        protocol: '100Hz Telemetry Stream',
        detail: 'Streams pH, Dissolved Oxygen (pO2), impeller RPM, foam capacitance, and off-gas CO2/O2 ratio.',
      },
      {
        step: '02. TIME-SERIES STORAGE',
        node: 'TimescaleDB Hypertable Cluster',
        protocol: 'Continuous Aggregates',
        detail: 'Compresses high-frequency sensor vectors with zero-loss historical batch alignment.',
      },
      {
        step: '03. METABOLIC DIGITAL TWIN',
        node: 'Monod-Kinetic + Isolation Forest Engine',
        protocol: 'Scikit-Learn / FastAPI',
        detail: 'Detects subtle respiratory quotient (RQ) divergence 4 hours ahead of DO starvation or phage lysis.',
      },
      {
        step: '04. CLOSED-LOOP ADVISORY',
        node: 'Peristaltic Feed Controller UI',
        protocol: 'WebSocket Live Telemetry',
        detail: 'Computes optimal glucose bolus feed trajectory to maximize specific growth rate (μ).',
      },
    ],
    telemetryPreview: {
      unit: 'VESSEL_500L_B2',
      latency: '38ms stream',
      compliance: 'GMP ANNEX 11',
      status: 'DO_LOCK: 34.8%',
    },
  },
  {
    id: 'pathoseq-pipeline',
    code: 'PRJ-04 // NGS-AUTO',
    title: 'PathoSeq Auto-Pipeline — Automated Metagenomic NGS Triage Workflow',
    subtitle: 'Zero-CLI cloud genomics orchestration from raw sequencer reads to clinical resistome report',
    filterCategory: 'Bioprocess AI',
    categoryBadges: ['Bioinformatics Automation', 'Cloud R&D'],
    inspiration:
      'Automated pathogen identification and resistance gene calling from Nanopore/Illumina sequencing reads.',
    challenge:
      'Wet-lab researchers struggled with complex CLI bioinformatics tools to process raw FASTQ files for hospital pathogen surveillance.',
    solution:
      'Created a zero-CLI, automated cloud orchestration pipeline triggered automatically upon sequencer run completion. Executes quality trimming, taxonomic classification, and antibiotic resistance gene (ARG) mapping, delivering an executive dashboard report.',
    metrics: [
      { value: '18 Mins', label: 'From Raw FASTQ to Clinical Report' },
      { value: '0 CLI', label: 'Zero CLI Intervention Required' },
      { value: '100%', label: 'Automated Resistance Profiling' },
    ],
    techTags: ['Nextflow', 'AWS Batch', 'Python', 'Docker', 'Next.js'],
    architectureNodes: [
      {
        step: '01. SEQUENCER WATCHER',
        node: 'Illumina / ONT Run-Complete Trigger',
        protocol: 'S3 EventBridge / Checksum SHA256',
        detail: 'Detects final basecalled FASTQ.gz demultiplexed output and validates Phred Q30 score thresholds.',
      },
      {
        step: '02. CONTAINERIZED DAG',
        node: 'Nextflow on AWS Batch Spot Fleet',
        protocol: 'Docker Immutable Bio-Containers',
        detail: 'Executes host-read depletion, adapter trimming (fastp), and de novo contig assembly.',
      },
      {
        step: '03. RESISTOME & TAXONOMY',
        node: 'Kraken2 + CARD ARG Aligner',
        protocol: 'Python Bio-Parser',
        detail: 'Identifies species abundance and maps beta-lactamase / carbapenemase resistance determinants.',
      },
      {
        step: '04. EXECUTIVE DASHBOARD',
        node: 'Next.js Clinical Surveillance Portal',
        protocol: 'Encrypted REST + PDF Export',
        detail: 'Renders phylogenetic outbreak trees and actionable antimicrobial stewardship heatmaps.',
      },
    ],
    telemetryPreview: {
      unit: 'NGS_CLUSTER_09',
      latency: '18m 12s / run',
      compliance: 'CLIA / CAP VALIDATED',
      status: 'Q30_PASS: 96.4%',
    },
  },
  {
    id: 'biochain-cold-guard',
    code: 'PRJ-05 // COLD-OPS',
    title: 'BioChain Cold-Guard — Autonomous Reagent Inventory & Cold-Chain Sentinel',
    subtitle: 'Predictive assay burn-rate modeling, -80°C thermal escalation, and automated ERP procurement',
    filterCategory: 'Enterprise Automation',
    categoryBadges: ['Enterprise Automation', 'Lab Operations'],
    inspiration:
      'Automated ultra-low temperature (-80°C) freezer monitoring and predictive reagent procurement.',
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
    architectureNodes: [
      {
        step: '01. CRYO TELEMETRY MESH',
        node: 'PT100 RTD -80°C Freezer Probes',
        protocol: 'LoRaWAN / Redis Time-Buffer',
        detail: 'Monitors compressor duty cycles, door-open duration, and thermal gradient across 48 cryo-racks.',
      },
      {
        step: '02. ASSAY BURN-RATE ENGINE',
        node: 'Schedule-Aware Consumption Predictor',
        protocol: 'Python Forecasting Service',
        detail: 'Correlates upcoming LIMS assay calendar against current barcode-scanned reagent lot volumes.',
      },
      {
        step: '03. EXPIRY & LOT SENTINEL',
        node: 'FEFO (First-Expired, First-Out) Router',
        protocol: 'NestJS Event Bus',
        detail: 'Assigns specific reagent lot barcodes to bench protocols to eliminate shelf-life waste.',
      },
      {
        step: '04. AUTONOMOUS PROCUREMENT',
        node: 'ERP Purchase Requisition Agent',
        protocol: 'Signed Webhook / REST API',
        detail: 'Auto-drafts vendor POs with cold-chain shipping windows when buffer falls below 14-day runway.',
      },
    ],
    telemetryPreview: {
      unit: 'CRYO_VAULT_ULT04',
      latency: '250ms heartbeat',
      compliance: 'ISO-17025 / GDP',
      status: 'TEMP: -80.4°C',
    },
  },
];

export interface DivisionItem {
  id: string;
  code: string;
  roman: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: {
    name: string;
    spec: string;
    metric: string;
  }[];
  telemetry: {
    modelArch: string;
    throughput: string;
    validation: string;
    interface: string;
  };
}

export const DIVISIONS: DivisionItem[] = [
  {
    id: 'cv-microscopy',
    code: 'DIV_01 // OPTICS_AI',
    roman: 'Division I',
    title: 'Computer Vision & Microscopy AI',
    tagline: 'Sub-millimeter visual intelligence for culture plates, pathology slides, and high-content assays.',
    description:
      'We replace subjective human eyepiece inspection with deterministic edge vision models trained on hundreds of thousands of annotated microbiological plates, Gram stains, and microfluidic droplets.',
    capabilities: [
      {
        name: 'Automated CFU Counting & Phenotyping',
        spec: 'YOLOv8-Seg + Telecentric Darkfield Calibration',
        metric: '99.4% Colony Recall',
      },
      {
        name: 'AST Zone Inhibition Measurement',
        spec: 'Radial Sub-Pixel Caliper & EUCAST/CLSI Breakpoint Engine',
        metric: '±0.08mm Precision',
      },
      {
        name: 'High-Content Cell Morphology Tracking',
        spec: 'Live-Cell Phase Contrast Time-Lapse Segmentation',
        metric: '38ms Frame Inference',
      },
    ],
    telemetry: {
      modelArch: 'Vision Transformer + SAM-Bio Edge FP16',
      throughput: '420 Petri Plates / Hour / Optical Node',
      validation: 'CLSI M100 & ISO 15189 Concordant',
      interface: 'DICOM-WSI / 16-bit TIFF / RTSP Microscope Stream',
    },
  },
  {
    id: 'autonomous-lims',
    code: 'DIV_02 // LIMS_AGENTS',
    roman: 'Division II',
    title: 'Autonomous Lab Operations & LIMS Agents',
    tagline: 'Event-driven multi-agent orchestration bridging wet-lab instruments, LIMS, and enterprise ERPs.',
    description:
      'We eliminate clipboard transcription and spreadsheet silos by deploying deterministic software agents that parse raw instrument streams, validate QA/QC calibration curves, and maintain unbroken chain-of-custody.',
    capabilities: [
      {
        name: 'Multi-Agent Sample Tracking & Chain of Custody',
        spec: 'RFID / 2D Cryo-Barcode Event Mesh + State Machine',
        metric: '100% Traceability',
      },
      {
        name: 'Automated QA/QC Reconciliation',
        spec: 'HPLC / PCR / Mass-Spec Raw Output Parser & OOS Sentinel',
        metric: '85% Faster Release',
      },
      {
        name: 'Cold-Chain Reagent Inventory & Procurement',
        spec: 'Assay-Schedule Burn-Rate Predictor + ERP PO Generator',
        metric: 'Zero Stockout Halts',
      },
    ],
    telemetry: {
      modelArch: 'Deterministic Tool-Calling Agents + n8n Core',
      throughput: '15,000+ Diagnostic Specimens / Week',
      validation: 'FDA 21 CFR Part 11 Cryptographic Audit Logs',
      interface: 'HL7 v2.5 / FHIR R4 / ASTM E1394 / SQL / SAP REST',
    },
  },
  {
    id: 'computational-rd',
    code: 'DIV_03 // BIOPROCESS_TWIN',
    roman: 'Division III',
    title: 'Computational R&D & Bioprocess Twin',
    tagline: 'Predictive in-silico fermentation modeling, bioreactor telemetry, and automated genomic synthesis.',
    description:
      'We transform raw bioreactor sensor streams and high-throughput sequencing output into closed-loop control recommendations, preventing costly batch crashes and compressing wet-lab iteration cycles.',
    capabilities: [
      {
        name: 'Predictive Fermentation Modeling',
        spec: 'Hybrid Monod-Kinetic + Neural ODE Digital Twin',
        metric: '+22% Biomass Yield',
      },
      {
        name: 'Bioreactor Telemetry Anomaly Detection',
        spec: 'Multivariate pH / DO / Off-Gas Isolation Forest',
        metric: '4-Hr Early Warning',
      },
      {
        name: 'Automated Literature, Patent & NGS Synthesis',
        spec: 'Zero-CLI Nextflow Genomics & RAG Knowledge Graph',
        metric: '18-Min FASTQ Triage',
      },
    ],
    telemetry: {
      modelArch: 'Temporal Fusion Transformer + Nextflow DAG',
      throughput: '100Hz Telemetry Ingestion // <50ms Latency',
      validation: 'GMP Annex 11 & GAMP-5 Category 4 Compliant',
      interface: 'OPC-UA / MQTT / TimescaleDB / AWS Batch',
    },
  },
];

export interface StackLayer {
  layerNumber: string;
  code: string;
  name: string;
  subtitle: string;
  latencySpec: string;
  protocolSpec: string;
  modules: {
    name: string;
    role: string;
    spec: string;
  }[];
}

export const ARCHITECTURE_LAYERS: StackLayer[] = [
  {
    layerNumber: 'LAYER 04',
    code: 'L4 // INTERFACE_COMPLIANCE',
    name: 'Interface & Compliance Layer',
    subtitle: 'Executive operator consoles, real-time telemetry interfaces, and regulatory sign-off ledgers.',
    latencySpec: '60 FPS UI // <16ms Render',
    protocolSpec: '21 CFR Part 11 / ISO-17025',
    modules: [
      {
        name: 'Next.js & React Telemetry UI',
        role: 'Operator Workstation Console',
        spec: 'High-density WebSocket streams & interactive plate viewers',
      },
      {
        name: 'Tailwind CSS Technical Grid',
        role: 'Design System & Accessibility',
        spec: 'High-contrast clinical precision tokens for lab environments',
      },
      {
        name: 'Real-Time Telemetry Dashboards',
        role: 'Bioreactor & Cryo Command',
        spec: 'Live pH/DO phase portraits and multi-site freezer heatmaps',
      },
      {
        name: 'Automated Audit Logs',
        role: 'Cryptographic Compliance Ledger',
        spec: 'Immutable SHA-256 operator action & model version records',
      },
    ],
  },
  {
    layerNumber: 'LAYER 03',
    code: 'L3 // ORCHESTRATION_BACKEND',
    name: 'Orchestration & Backend Layer',
    subtitle: 'High-concurrency microservices, workflow engines, and time-series relational persistence.',
    latencySpec: '99.98% Uptime SLA',
    protocolSpec: 'REST / gRPC / Webhooks',
    modules: [
      {
        name: 'Python (FastAPI)',
        role: 'Inference & Scientific API Gateway',
        spec: 'Async Pydantic v2 validation for instrument & vision payloads',
      },
      {
        name: 'Node.js (NestJS)',
        role: 'Enterprise Event Microservices',
        spec: 'Modular domain services for ERP, procurement & RBAC',
      },
      {
        name: 'n8n Enterprise Workflows',
        role: 'Deterministic Multi-Agent Bus',
        spec: 'Visual + code-level orchestration across 40+ lab endpoints',
      },
      {
        name: 'Docker & SQL Server / PostgreSQL',
        role: 'Containerized Data Persistence',
        spec: 'Air-gapped on-prem or VPC deployment with TimescaleDB',
      },
    ],
  },
  {
    layerNumber: 'LAYER 02',
    code: 'L2 // AI_COMPUTATIONAL_CORE',
    name: 'AI & Computational Core',
    subtitle: 'Domain-tuned computer vision kernels, multi-agent reasoning nodes, and bioinformatics engines.',
    latencySpec: '24ms–38ms Edge Inference',
    protocolSpec: 'ONNX / TensorRT FP16',
    modules: [
      {
        name: 'PyTorch & OpenCV',
        role: 'Colony & Morphology Vision',
        spec: 'Custom YOLOv8-Seg & SAM models trained on clinical plates',
      },
      {
        name: 'Autonomous LLM Agents',
        role: 'QC & Document Synthesis',
        spec: 'Schema-constrained CoA verification and SOP deviation triage',
      },
      {
        name: 'Time-Series Forecasting',
        role: 'Bioprocess Digital Twin',
        spec: 'Multivariate anomaly detection for fermentation kinetics',
      },
      {
        name: 'Biopython & Nextflow',
        role: 'Genomic & Sequence Analysis',
        spec: 'Automated FASTQ quality control, taxonomy & ARG calling',
      },
    ],
  },
  {
    layerNumber: 'LAYER 01',
    code: 'L1 // WETLAB_EDGE_INGESTION',
    name: 'Wet-Lab & Edge Ingestion Layer',
    subtitle: 'Direct hardware-level acquisition from optical rigs, analytical instruments, and cryo-arrays.',
    latencySpec: '100Hz Hardware Polling',
    protocolSpec: 'HL7 / ASTM / OPC-UA / MQTT',
    modules: [
      {
        name: 'Microscopy Optics & Telecentric Rigs',
        role: 'High-Resolution Plate Capture',
        spec: 'Coaxial darkfield & brightfield CMOS camera streams',
      },
      {
        name: 'IoT Biosensors & Cryo Probes',
        role: 'Environmental & Vessel Telemetry',
        spec: 'PT100 -80°C probes, dissolved oxygen, pH & off-gas sensors',
      },
      {
        name: 'HL7 / ASTM Instrument Parsers',
        role: 'Legacy Lab Hardware Bridge',
        spec: 'Direct RS-232/TCP ingestion from HPLC, Vitek, PCR & Mass-Spec',
      },
      {
        name: 'DICOM / 16-Bit TIFF Streams',
        role: 'Raw Scientific Imaging',
        spec: 'Lossless optical density and fluorescence channel buffers',
      },
    ],
  },
];
